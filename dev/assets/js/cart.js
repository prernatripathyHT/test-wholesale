import $ from 'jquery';
import { elementsExist, enableScroll, disableScroll } from './utilities.js';

const Cart = (function(){
  const urls = {
    cartUpdate: '/cart/update.js',
    cartChange: '/cart/change.js',
    cartAdd: '/cart/add.js',
    cartGet: '/cart.json'
  }

  const settings = {
    slideCartContainer: ".js-cart--container",
    slideCartInner: ".js-cart--inner",
    closeCart: ".js-cart--close",
    openCart: "a[href='/cart']",
    removeItem: ".js-cart--remove-item",
    itemQuantity: ".js-item-quantity",
    quantityButton: ".js-change-quantity",
    itemSellingPlanOptions: ".js-hidden-item-select",
    itemDeliveryFrequency: ".js-cart-item-delivery",
    productForm: "form[action='/cart/add']",
    cartCount: ".cart_count",
    cartNoteTextarea: ".js-cart-note-textarea",
    cartNoteContainer: ".js-cart-note-container",
    cartNoteToggle: ".js-cart-note-toggle",
    checkoutButton: ".js-process-checkout",
    cartOverlay: ".js-cart--overlay",
    coffeeFill: ".js-cart-coffee-fill",
    shippingIndicator: ".js-shipping-indicator",
    shippingIndicatorBar: ".js-shipping-indicator-bar",
    zohoChatButton: ".zsiq_floatmain"
  }

  let $elementToFocusOnClose = $(settings.openCart);

  const init = function(){
    if (!$(settings.slideCartContainer).length) return;

    initializeEventListeners();
    buildCart();
  }

  const initializeEventListeners = function(){
    $(settings.slideCartContainer).on('click', settings.removeItem, handleItemRemove)
    $(settings.slideCartContainer).on('click', settings.checkoutButton, processCheckout)
    $(settings.slideCartContainer).on('change', settings.itemQuantity, adjustItemQuantity)
    $(settings.slideCartContainer).on('change', settings.itemSellingPlanOptions, updateItemSellingPlan)
    $(settings.slideCartContainer).on('change', settings.itemDeliveryFrequency, updateItemDeliveryFrequency)

    // $(settings.slideCartContainer).on('click', settings.quantityButton, updateItemQuantity)
    $(settings.slideCartContainer).on('change', settings.cartNoteToggle, toggleCartNote)
    $(settings.slideCartContainer).on('change', settings.cartNoteTextarea, updateCartNote)

    $(document).on('submit', settings.productForm, handleProductSubmit)
    $(document).on('quizKitAddToCartSuccess', handleQuizKitSubmit)

    if (location.pathname !== "/cart") {
      $(document).on('click', settings.openCart, openCart)
      $(document).on('click', `${settings.closeCart}, ${settings.cartOverlay}`, closeCart)
    }
  }

  const handleQuizKitSubmit = function(e){
    buildCart()
    openCart()
  }

  // var listenForEscape = function(e){
  //   if (e.keyCode === 27) {
  //     closeCart(e);
  //   }
  // }

  const processCheckout = function(e){
    location.href = "/checkout"
  }

  const processCartRequest = function(data, endpoint, callback){
    var params = {
      url: endpoint,
      data: data,
      method: 'POST',
      dataType: 'json',
      success: function(cart){
        if (callback) {
          callback(cart);
        } else {
          buildCart();
        }
      },
      error: function(err){
        console.warn(err)
      }
    }

    $.ajax(params);
  }

  const toggleCartNote = function(e){
    let $this = $(this);

    if ($this.is(":checked")){
      $(settings.cartNoteContainer).slideDown(300)
    } else {
      $(settings.cartNoteContainer).slideUp(300)
      $(settings.cartNoteTextarea).val('').change()
    }
  }

  const updateCartNote = function(e){
    let $this = $(this)
    let value = $this.val();

    let data = {
      note: value
    }

    processCartRequest(data, urls.cartUpdate, function(){})
  }

  const adjustItemQuantity = function(e){
    let $this = $(this);
    let key = $this.data('key');

    let data = {
      updates: {
        [key]: $this.val()
      }
    }

    processCartRequest(data, urls.cartUpdate, function(){
      buildCart()
    });
  }

  const updateItemSellingPlan = function(e){
    let $this = $(this)

    let data = {
      id: $this.data('key'),
      selling_plan: $this.val(),
      quantity: $this.data('quantity')
    }

    processCartRequest(data, urls.cartChange);
  }

  const updateItemDeliveryFrequency = function(e){
    let $this = $(this)
    let data = {};
    let value = $this.val()

    if (value === "one-time") {
      data = {
        id: $this.data('key'),
        selling_plan: null,
        quantity: $this.data('quantity')
      }
    } else {
      data = {
        id: $this.data('key'),
        selling_plan: $this.data('default-plan'),
        quantity: $this.data('quantity')
      }
    }

    processCartRequest(data, urls.cartChange);
  }

  const handleProductSubmit = function(e){
    e.preventDefault()

    let $this = $(this);
    let data = $this.serialize();
    $elementToFocusOnClose = $this;

    processCartRequest(data, urls.cartAdd, () => {
      buildCart()
      openCart();
    })
  }

  const handleItemRemove = function(e){
    let $this = $(this);
    let key = $this.data('key');

    let data = {
      updates: {
        [key]: 0
      }
    }

    processCartRequest(data, urls.cartUpdate, function(){
      buildCart(['header', 'items', 'footer'])
    });
  }

  const getCart = function(callback){
    $.ajax(urls.cartGet).then(callback);
  }

  const buildCart = function(sectionsToRender=['header', 'items', 'notes', 'upsell', 'footer']){
    getCart(function(cart){
      const isCartPage = location.pathname.includes('/cart');
      const sectionID = isCartPage
        ? $(settings.slideCartContainer).filter('.cart--page').data('section-id')
        : 'ajax-cart';


      if (cart.item_count > 0) {
        $(settings.coffeeFill).addClass('active')
      } else {
        $(settings.coffeeFill).removeClass('active')
      }

      $.ajax(`/?sections=${ sectionID }`)

        .then(function(response){

          if ( response[sectionID] ) {
            let $response = $(response[sectionID]);
            let $newInnerHTML = $response.find(settings.slideCartInner);

            let newShippingIndicator = $newInnerHTML.find(settings.shippingIndicatorBar)
            let newShippingIndicatorWidth = newShippingIndicator.data('width')
            newShippingIndicator.replaceWith($(settings.shippingIndicatorBar))

            if (cart.item_count > 0 && $('.js-slide-cart--items').length){

              sectionsToRender.forEach(function(section){
                let $sectionEl = $(settings.slideCartContainer).find(`.js-slide-cart--${section}`)
                let $newEl = $newInnerHTML.find(`.js-slide-cart--${section}`);
                $sectionEl.replaceWith($newEl)
              })

            } else {
              $(settings.slideCartContainer).html($newInnerHTML)
            }

            //update nav cart count
            if (cart.item_count > 0) {
              $(settings.cartCount).text(cart.item_count).removeClass('hidden')
            } else {
              $(settings.cartCount).text(cart.item_count).addClass('hidden')
            }

            $(settings.slideCartContainer).find(settings.shippingIndicatorBar).css({
              width: newShippingIndicatorWidth
            })
          }
        })
        .catch(function(){})
    })
  }

  const openCart = function(e){
    if (e) {
      e.preventDefault()

      $elementToFocusOnClose = $(this);
    }

    let $cartContainer = $(settings.slideCartContainer);
    $cartContainer.show()

    setTimeout(function(){
      $(settings.cartOverlay).removeClass('hidden');
      $cartContainer.addClass("active");

      $(settings.zohoChatButton).css({
        transition: 'all .4s linear',
        transform: 'translateX(-28rem)'
      })

    }, 10)

    $(settings.closeCart).focus();

    disableScroll()
  }

  const closeCart = function(e){
    if (e) {
      e.preventDefault()
    }

    let $cartContainer = $(settings.slideCartContainer);
    $cartContainer.removeClass("active");
    $(settings.cartOverlay).addClass('hidden');

    $(settings.zohoChatButton).css({
      transition: 'all .4s linear',
      transform: 'translateX(0)'
    })

    setTimeout(function(){
      $cartContainer.hide()

      if ($elementToFocusOnClose && $elementToFocusOnClose.length) {
        $elementToFocusOnClose.focus()
      }
    }, 600)

    enableScroll()
  }

  return {
    init,
    getCart,
    buildCart,
    openCart,
    closeCart,
    processCartRequest
  }
})();

const {
  init,
  getCart,
  buildCart,
  openCart,
  closeCart,
  processCartRequest
} = Cart

export {
  init,
  getCart,
  buildCart,
  openCart,
  closeCart,
  processCartRequest,
  Cart as default
};
