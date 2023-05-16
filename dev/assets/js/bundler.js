import { getCart, openCart } from './cart';

export default (function(){
  var settings = {
    activeClass: "active",
    bundlerContainer: ".js-bundler-container",
    bundlerInput: ".js-bundler-pack",
    bundlerBtn: ".js-bundler-btn",
    closeSubscribeButton: ".js-close-subscribe-button",
    addToCartBtn: ".js-add-to-cart",
    emptySlot: ".js-empty-slot",
    bundlerImageSlot: ".js-img-slot",
    bundlerCard: ".js-bundler-card",
    bundlerQty: ".js-bundler-qty",
    bundlerQtyBtn: ".js-bundler-qty-btn",
    heroBundlerQtyBtn: ".js-hero-bundler-qty-btn",
    bundlerQtyText: ".js-bundler-quantity-text",
    removeItem: ".js-remove-from-pack",
    bundlerPrice: ".js-bundler-price",
    bundlerSavings: ".js-bundler-savings",
    bundlerLimit: ".js-bundler-limit",
    hiddenClass: "hidden",
    overlay: ".js-overlay",
    productSwatches: ".bundler-product--swatch",
    pintImageContainers: ".js-pint-image-container",
    purchaseTypeSelectors: ".js-purchase-type-selector",
    miniImageContainers: ".js-mini-image-container",
    miniHeroImage: ".js-mini-hero-image",
    pintHeroImage: ".js-pint-hero-image",
    subscribeModal: ".js-subscribe-modal",
    subscribeCheck: ".js-subscribe-radio",
    subscribeContainer: ".js-subscribe-button-container",
    shippingFrequencySelectors: ".js-shipping-frequency-selector",
    selectedSizeText: ".js-selected-size-text"
  }

  var $defaultVariantID = $('.bundler--swatch.bundler-swatch-active').not('.hidden')

  var packSize = 4;
  var currentVariant = $defaultVariantID.data('variant-id');
  var currentRechargeVariant = $defaultVariantID.data('subscription-variant-id');
  var product = "Pint"

  // image, title, id, quantity, url
  var itemsInBundle = []

  var init = function(){
    if ($(settings.bundlerContainer).length === 0) return

    initEventListeners()

    // RENDER INITIAL BUNDLER STATE
    // Grab items from session storage
    // Update items in bundle variable
    // Run relevant functions to update the various product images
  }

  var initEventListeners = function(){
    $(settings.bundlerInput).on('change', changeActiveVariant);
    $(settings.bundlerQtyBtn).on('click', handleItemChange);
    $(settings.bundlerBtn).on('click', openSubscribeModal);
    $(settings.addToCartBtn).on('click', handleBundleSubmit)
    $(settings.removeItem).on('click', removeItemFromPack);
    $(settings.productSwatches).on('click', changeActiveProduct);
    $(settings.purchaseTypeSelectors).on('click', changePurchaseType)
    $(settings.shippingFrequencySelectors).on('click', changeShippingFrequency)
    $(document).on('click', settings.overlay + ", " + settings.closeSubscribeButton,  closeSubscribeModal);
    $(window).on('load', renderOnPageLoad)

    if (window.screen.availWidth < 500) {
      $(window).on('scroll', handleStickyBtn);
    }
  }

  var openSubscribeModal = function() {
    var $subscribeModal = $(settings.subscribeModal);
    $subscribeModal.removeClass(settings.hiddenClass);
    var overlay = $(settings.overlay);
    overlay.addClass([settings.activeClass, "cart-overlay"]);
    addNoScroll();
  }

  var closeSubscribeModal = function() {
    var $subscribeModal = $(settings.subscribeModal);
    $subscribeModal.addClass(settings.hiddenClass);
    var overlay = $(settings.overlay);
    overlay.removeClass([settings.activeClass, "cart-overlay"]);
    removeNoScroll();
  }

  var changePurchaseType = function(e) {
    var $selectors = $(settings.purchaseTypeSelectors)
    var $thisLabel = $(this);
    var $notThisLabel = $selectors.not($thisLabel)
    var purchaseType = $thisLabel.prop('for')
    var $subscribeContainer = $(settings.subscribeContainer)

    $thisLabel.addClass('bg-black text-white')
    $thisLabel.removeClass('bg-white text-black')
    $thisLabel.find(settings.subscribeCheck).removeClass('hidden')

    $notThisLabel.addClass('bg-white text-black')
    $notThisLabel.removeClass('bg-black text-white')
    $notThisLabel.find(settings.subscribeCheck).addClass('hidden')

    if (purchaseType === 'subscribe') {
      $subscribeContainer.slideDown(600)
      $('input[name="properties[shipping_interval_frequency]"]').prop('disabled', false)
      $('input[name="properties[shipping_interval_unit_type]"]').prop('disabled', false)
    } else if (purchaseType === 'buy_once') {
      $subscribeContainer.slideUp(600)
      $('input[name="properties[shipping_interval_frequency]"]').prop('disabled', true)
      $('input[name="properties[shipping_interval_unit_type]"]').prop('disabled', true)
    }
  }

  var changeShippingFrequency = function() {
    var $thisSelector = $(this)
    var $frequencySelectors = $(settings.shippingFrequencySelectors)
    var $notThisSelector = $frequencySelectors.not($thisSelector)
    
    $thisSelector.addClass('bg-black text-white')
    $thisSelector.removeClass('bg-white text-black')

    $notThisSelector.addClass('bg-white text-black')
    $notThisSelector.removeClass('bg-black text-white')
  }

  var changeActiveProduct = function(e){
    var productId = $(this).data('product-id')
    var $imgSlot = $(settings.bundlerImageSlot)
    
    // Set active product
    var $productSwatches = $('.bundler-product--swatch')
    $(this).addClass('bundler-swatch-active')
    $productSwatches.not($(this)).removeClass('bundler-swatch-active')
    product = $(this).prop('for')
    // var $input = $(`input[data-product-id="${productId}"]`)
    // $input.attr('checked', 'checked')
    
    // Set active variant
    var $variantSwatches = $('.bundler--swatch')
    var $thisProductVariantSwatches = $(`.bundler--swatch[data-product-id="${productId}"]`)
    var $notThisProductVariantSwatches = $variantSwatches.not($thisProductVariantSwatches)
    var $pintImageContainers = $(settings.pintImageContainers)
    var $miniImageContainers = $(settings.miniImageContainers)
    $thisProductVariantSwatches.removeClass('hidden')
    $notThisProductVariantSwatches.addClass('hidden')

    if (product === "Pint") {
      $pintImageContainers.removeClass('hidden')
      $miniImageContainers.addClass('hidden')
      $(settings.miniHeroImage).addClass('hidden')
      $(settings.pintHeroImage).removeClass('hidden')
      $imgSlot.css("background-image", 'url(https://cdn.shopify.com/s/files/1/0226/0362/8608/files/icon-pint.svg?v=1636400150)')
      $(settings.selectedSizeText).text('1 Pint')
    } else if (product === "Mini") {
      $pintImageContainers.addClass('hidden')
      $miniImageContainers.removeClass('hidden')
      $(settings.miniHeroImage).removeClass('hidden')
      $(settings.pintHeroImage).addClass('hidden')
      $imgSlot.css("background-image", 'url(https://cdn.shopify.com/s/files/1/0226/0362/8608/files/icon-mini.svg?v=1636400257)')
      $(settings.selectedSizeText).text('6 Minis')
    }

    itemsInBundle = [];
    
    renderBundlerItems()
    getCurrentVariant()
    setCurrentVariant()
  }

  var removeItemFromPack = function(e){
    var $slot = $(this).parents(settings.emptySlot);
    itemsInBundle.splice($slot.index(), 1)
    
    $(settings.bundlerQtyText).text(itemsInBundle.length)

    renderBundlerItems();
    updateBundlerCards();
  }

  var changeActiveVariant = function(e){
    var size = $(this).data('pack');
    var variant = $(this).val();
    var product = $(this).data('product-id')
    var $swatches = $(`.bundler--swatch[data-product-id="${product}"]`)
    var $thisVariantSwatch = $(`.bundler--swatch[data-variant-id="${variant}"]`)
    var $notThisVariantSwatches = $swatches.not($thisVariantSwatch)
    var $products = $(settings.emptySlot)
    $thisVariantSwatch.addClass('bundler-swatch-active')
    $notThisVariantSwatches.removeClass('bundler-swatch-active')

    if (size && parseInt(variant) === 40858859700420) {
      packSize = (parseInt(size) / 6);
    } else if (size) {
      packSize = parseInt(size);
    }

    if (packSize === 4) {
      $products.removeClass('w-1/3')
      $products.addClass('w-1/4')
    } else {
      $products.removeClass('w-1/4')
      $products.addClass('w-1/3')
    }

    getCurrentVariant();
    updatePackItems();
    addEmptySlots();
    updateBundlerCards();
    updateDiscountMessage();
    updateBundlerBtn(variant);
  }

  var updateBundlerCards = function(){
    if (itemsInBundle.length === packSize) {
      $(settings.bundlerCard).not(".active").addClass('disabled')
      $(settings.bundlerCard).not(".active").find(settings.bundlerQtyBtn).attr('disabled', true);
    } else {
      $(settings.bundlerCard).removeClass("disabled");
      $(settings.bundlerCard).find(settings.bundlerQtyBtn).attr('disabled', false);
    }
  }

  var updateDiscountMessage = function(){
    var $savings = $(settings.bundlerSavings);
    var $limit = $(settings.bundlerLimit);

    $limit.text(packSize);
  }

  var handleItemChange = function(e){
    var $card = $(this).parents(settings.bundlerCard);
    var id = $card.data('id');
    var pintImage = $card.data('pint-image');
    var miniImage = $card.data('mini-image');
    var title = $card.data('title');
    var url = $card.data('product-url')

    var totalInPack = itemsInBundle.length
    var totalRemaining = packSize - totalInPack;

    if (1 <= totalRemaining) {
      itemsInBundle.push({
        id: id,
        quantity: 1,
        pintImage,
        miniImage,
        title,
        url
      })  
    }

    $(settings.bundlerQtyText).text(itemsInBundle.length)

    itemsInBundle = itemsInBundle.filter(function(item){
      return item.quantity > 0
    })
    
    renderBundlerItems();
    updateBundlerCards();
  }

  var addNoScroll = function(){
    $(document.body).addClass('no-scroll');
  }
  
  var removeNoScroll = function(){
    $(document.body).removeClass('no-scroll');
  }

  var updatePackItems = function(){
    // same logic as diaspora...
    if (itemsInBundle.length > packSize) {
      var numberToRemove = itemsInBundle.length - packSize;

      $(settings.bundlerCard + ".active").each(function(index, card){
        var $card = $(card);
        var $input = $card.find(settings.bundlerQty);
        var quantity = parseInt($input.val());

        if (numberToRemove > 0) {
          if (quantity > numberToRemove) {
            // check if the quantity is greater than numberToRemove
            // => remove numberToRemove from quantity
            var newQty = quantity - numberToRemove;
            numberToRemove = 0;
            $input.val(newQty).change();
          } else if (numberToRemove >= quantity){
            // check if quantity is less than numberToRemove
            // => remove the entire quantity (set quantity to zero)
            var newQty = 0;
            $input.val(newQty).change();
            numberToRemove = numberToRemove - quantity;
          }
        }
      })
    }
    itemsInBundle = itemsInBundle.slice(0, packSize)
    renderBundlerItems()
  }

  var renderBundlerItems = function(){
    window.sessionStorage.setItem('itemsInBundle', JSON.stringify(itemsInBundle))
    // @arren needs to render images, change button text + state
    // render images
    var index = 0;
    $(settings.emptySlot).removeClass('active').attr('data-id', '').find('.js-bundler-product-image').remove();
    $(settings.emptySlot).find('.js-remove-from-pack').addClass('hidden')

    itemsInBundle.forEach(function(item, index){
      var $img;
      if (product === "Pint") {
        $img = $('<img src="' + item.pintImage + '" alt="' + item.title + '" class="js-bundler-product-image h-16 bg-white">');
      } else if (product === "Mini") {
        $img = $('<div class="relative js-bundler-product-image"><div class="absolute -bottom-1 right-0 bg-white border border-black rounded px-1"><p>x6</p></div><img src="' + item.miniImage + '" alt="' + item.title + '" class="h-16 bg-white"></div>');
      }
      $(settings.emptySlot).eq(index).addClass('active').attr('data-id', item.id).find('.js-img-slot').append($img);
      if (screen.width <= 1280) {
        $(settings.emptySlot).eq(index).find('.js-remove-from-pack').removeClass('hidden')
      }
      index++
    })

    // update button state
    updateBundlerBtn();
  }

  var getTotalPrice = function(){
    var totalPrice = 0;

    itemsInBundle.forEach(function(item){
      totalPrice += (item.price * item.quantity);
    })

    if (totalPrice > 0) {
      var amountToSubtract = 500;
      if (packSize === 4) {
        amountToSubtract = 700;
      } else if (packSize === 5) {
        amountToSubtract = 900;
      }

      return (totalPrice - amountToSubtract) / 100;
    } else {
      return totalPrice
    }

  }


  var addEmptySlots = function(){
    $(settings.emptySlot).addClass('hidden');
    $(settings.emptySlot).slice(0, packSize).removeClass('hidden');
  }

  var getCurrentVariant = function() {
    var $selectedVariant = $('label.bundler--swatch.bundler-swatch-active').not('.hidden')
    var $variantPrice = ($selectedVariant.data('variant-price') / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})
    var $variantId = $selectedVariant.data('variant-id')
    var $subscriptionVariantId = $selectedVariant.data('subscription-variant-id')
    currentVariant = $variantId
    currentRechargeVariant = $subscriptionVariantId
    $(settings.bundlerPrice).text($variantPrice)
  }

  var setCurrentVariant = function() {
    var $selectedVariant = $('label.bundler--swatch.bundler-swatch-active').not('.hidden')
    $selectedVariant.click()
  }

  var updateBundlerBtn = function(variantId){
    var $btn = $(settings.bundlerBtn).not(settings.heroBundlerQtyBtn);
    var totalRemaining = packSize - itemsInBundle.length;

    if (variantId) {
      $btn.attr('data-id', variantId);
    }

    if (totalRemaining === 0) {
      $btn.text("Add To Cart");
      $btn.addClass('btn-black')
      $btn.removeClass('btn-lb')
      $btn.attr('disabled', false);

      $(settings.bundlerQtyBtn).removeClass('btn-black')
      $(settings.bundlerQtyBtn).addClass('btn-disabled')
      $(settings.bundlerQtyBtn).attr('disabled', true)
    } else if (totalRemaining === 1) {
      $btn.text("Choose " + totalRemaining + " Flavor");
      $btn.attr('disabled', true);
      $btn.removeClass('btn-black')
      $btn.addClass('btn-lb')

      $(settings.bundlerQtyBtn).addClass('btn-black')
      $(settings.bundlerQtyBtn).removeClass('btn-disabled')
      $(settings.bundlerQtyBtn).attr('disabled', false)
    } else {
      $btn.text("Choose " + totalRemaining + " Flavors");
      $btn.attr('disabled', true);

      $(settings.bundlerQtyBtn).addClass('btn-black')
      $(settings.bundlerQtyBtn).removeClass('btn-disabled')
      $(settings.bundlerQtyBtn).attr('disabled', false)
    }
  }

  // var updateBundlerPrice = function(){
  //   var totalPrice = getTotalPrice();
  //   var formattedPrice = "$" + totalPrice.toFixed(2);

  //   if (totalPrice === 0) {
  //     $(settings.bundlerPrice).text($(settings.bundlerPrice).data('text'));
  //   } else {
  //     $(settings.bundlerPrice).text(formattedPrice);
  //   }
  // }

  var renderOnPageLoad = function() {
    if (window.sessionStorage.getItem('itemsInBundle')) {
      itemsInBundle = JSON.parse(window.sessionStorage.getItem('itemsInBundle'))
      renderBundlerItems();
    }
  }

  var handleBundleSubmit = function(e){
    var $this = $(this);
    var id = $this.attr('data-id');
    var properties = {}
    var shippingIntervalFrequency;
    var $shippingIntervalUnitType = $('input[name="properties[shipping_interval_unit_type]"]')
    var productId;
    
    itemsInBundle.forEach((item, index) => {
      properties[`Flavor ${index + 1}`] = item.title
    })

    properties['_itemsToRender'] = itemsInBundle

    // If not disabled, this is a recharge item
    if($shippingIntervalUnitType.prop('disabled') === false) {
      shippingIntervalFrequency = $('input[name="properties[shipping_interval_frequency]"]:checked').val()
      properties['shipping_interval_frequency'] = shippingIntervalFrequency
      properties['shipping_interval_unit_type'] = $shippingIntervalUnitType.val()
      productId = currentRechargeVariant
    } else {
      productId = currentVariant
    }

    var data = {
      items: [{
        id: productId,
        quantity: 1,
        properties
      }]
    }

    var params = {
      url: '/cart/add.js',
      data: data,
      dataType: 'json',
      method: "POST",
      success: function(item){
        getCart();
        openCart();
      }
    }

    try {
      $.ajax(params);
      closeSubscribeModal()
    } catch (error) {
      console.log(error)
    }
  }

  var handleStickyBtn = function(){
    if (window.scrollY > 400) {
      $('.js-sticky-btn').show();
    } else {
      $('.js-sticky-btn').hide();
    }
  }

  return {
    init: init
  }
})()

$('.js-empty-slot').hover(function() {
  if ($(this).hasClass('active')) {
    var $removeButton = $(this).find('.js-remove-from-pack');
    $removeButton.removeClass('xl:hidden hidden')
  }
}, function() {
  var $this = $(this);
  $this.find('.js-remove-from-pack').addClass('xl:hidden hidden')
})

$('.js-collapse-bundler-bar-button').click(function() {
  var $container = $('.js-bundler-bar')
  if ($container.hasClass('active')) {
    $container.removeClass('active')
    $container.css('transform', 'translateY(100%)')
    $container.css('margin-top', '-258px')
  } else {
    $container.addClass('active')
    $container.css('transform', 'translateY(0)')
    $container.css('margin-top', '0px')
  }
})
