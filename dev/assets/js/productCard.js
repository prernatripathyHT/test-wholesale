import $ from 'jquery';
import { elementsExist, isMobile } from './utilities.js';

const ProductCard = (function(){
  const selectors = {
    productCard: ".js-product-card",
    productCardContent: ".js-product-card-content",
    productCardForm: ".js-product-card-form",
    mobileButtonTrigger: ".js-product-card-form-trigger",
  }

  const init = function(){
    if (!elementsExist([selectors.productCard])) return;

    initEvents()

    $(window).on('resize', function(){
      removeEvents()
      initEvents()
    })
  }

  const initEvents = function(){
    if (isMobile()) {
      initMobileEvents()
    } else {
      initDesktopEvents()
    }
  }

  const removeEvents = function(){
    $(document).off('click', selectors.mobileButtonTrigger, handleProductCardEnter);
    $(document).off('mouseenter', selectors.productCard, handleProductCardEnter);
    $(document).off('focusin', selectors.productCard, handleProductCardEnter);
    $(document).off('mouseleave', selectors.productCard, handleProductCardLeave);
    $(document).off('focusout', selectors.productCard, handleProductCardLeaveFocus);
    $(document).off('submit', selectors.productCardForm, handleCardFormSubmit);
  }

  const initMobileEvents = function(){
    $(document).on('click', selectors.mobileButtonTrigger, handleMobileCardEnter);
    $(document).on('submit', selectors.productCardForm, handleCardFormSubmit);
  }

  const initDesktopEvents = function(){
    $(document).on('mouseenter', selectors.productCard, handleProductCardEnter);
    $(document).on('focusin', selectors.productCard, handleProductCardEnter);
    $(document).on('mouseleave', selectors.productCard, handleProductCardLeave);
    $(document).on('focusout', selectors.productCard, handleProductCardLeaveFocus);
    $(document).on('submit', selectors.productCardForm, handleCardFormSubmit);
  }

  const slideDownForm = function($card){
    let $form = $card.find(selectors.productCardForm)
    let $otherForms = $(selectors.productCardForm).not($form);

    $form.slideDown(300)
    $otherForms.slideUp(300)
  }

  const slideUpForm = function($card){
    let $form = $card.find(selectors.productCardForm)

    $form.slideUp(300)
  }

  const handleMobileCardEnter = function(e){
    e.preventDefault()
    let $this = $(this)
    let $card = $this.parents(selectors.productCard)

    slideDownForm($card)

    $this.hide();
  }

  const handleProductCardEnter = function(e){
    let $this = $(this)
    slideDownForm($this);
  }

  const handleProductCardLeave = function(e){
    let $this = $(this)
    slideUpForm($this)
  }

  const handleProductCardLeaveFocus = function(e){
    let $this = $(this)
    let $target = $(e.target)

    if (!$target.parents($this).length) {
      slideUpForm($this)
    }
  }

  const handleCardFormSubmit = function(e){
    let $this = $(this)
    let $card = $this.parents(selectors.productCard)

    slideUpForm($card)

    if (isMobile()) {
      $card.find(selectors.mobileButtonTrigger).show()
    }
  }

  return {
    init
  }

})()

export default ProductCard;
