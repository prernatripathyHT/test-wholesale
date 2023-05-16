import $ from 'jquery';
import { useState, formatMoney } from './utilities'

const ProductForm = function($form){

  const cache = {
    $quantityInput: $form.find('[name="quantity"]'),
    $idInput: $form.find('[name="id"]'),
    $productScript: $form.find('.js-product-script'),
    $swatches: $form.find('.js-option-swatch'),
    $swatchLabel: $form.find('.js-option-label'),
    $hiddenOptionSelects: $form.find('.js-hidden-option-select'),
    $addToCart: $form.find('.js-product-form-atc'),
    $deliveryOption: $form.find('[name="delivery_option"]'),
    $frequencyContainer: $form.find('.js-selling-plan-group'),
    $sellingPlan: $form.find('[name="selling_plan"]'),
    $price: $form.find(".js-price"),
    $comparePrice: $form.find(".js-compare-price"),
    $subscriptionSavings: $form.find("[data-subscription-savings]"),
  }

  let translations = {
    addToCart: "Add to Cart",
    outOfStock: "Out of Stock",
  }

  let product;
  let variants;
  let currentVariant;

  // Size: "4 Pack"
  // Flavor: "Elderberry Shots"
  let options = {};

  const initEventListeners = function(){
    cache.$swatches.on('change', handleSwatchChange); // TODO: change from button click to input change
    cache.$hiddenOptionSelects.on('change', setCurrentVariant);
    cache.$idInput.on('change', handleVariantChange);
    cache.$deliveryOption.on('change', handleDeliveryChange);
  }

  const parseVariants = function(){
    product = JSON.parse(cache.$productScript.text());

    variants = product.variants;
  }

  const parseOptions = function(){
    cache.$hiddenOptionSelects.each(function(index, select){
      let name = $(select).data("name")
      let value = $(select).val()
      setActiveOption(name, value)
    })
  }

  const setActiveOption = function(name, value) {
    options[name] = value;
  }

  const updateAddToCart = function(){
    if (currentVariant && currentVariant.available) {
      cache.$addToCart.text(translations.addToCart)
      cache.$addToCart.attr('disabled', false)
    } else {
      cache.$addToCart.text(translations.outOfStock)
      cache.$addToCart.attr('disabled', true)
    }
  }

  const updateOneTimePrice = function(){
    let formattedPrice = formatMoney(currentVariant.price, "amount")

    if (currentVariant.price === 0) {
      cache.$price.text("Free!")
    } else {
      cache.$price.text(`$${formattedPrice}`)
    }

    // Updates pricing in Buy Panel - COMPARE AT
    let formattedComparePrice = formatMoney(currentVariant.compare_at_price, "amount")
    cache.$comparePrice.text(`$${formattedComparePrice}`)

    if (currentVariant.compare_at_price && currentVariant.compare_at_price > currentVariant.price) {
      cache.$comparePrice.removeClass('hidden').show()
    } else {
      cache.$comparePrice.addClass('hidden').hide()
    }
  }

  const updateSubscriptionPrice = function(){
    // Add original price to compare at widget
    let formattedComparePrice = formatMoney(currentVariant.price, "amount")
    cache.$comparePrice.text(`$${formattedComparePrice}`)

    // Updates pricing for selling_plan
    let subscribePriceCents = (currentVariant.selling_plan_allocations.length ? currentVariant.selling_plan_allocations[0].price : 0);
    let formattedPrice = formatMoney(subscribePriceCents, "amount")

    cache.$price.text(`$${formattedPrice}`)

    if (subscribePriceCents && subscribePriceCents < currentVariant.price) {
      cache.$comparePrice.removeClass('hidden').show()
    } else {
      cache.$comparePrice.addClass('hidden').hide()
    }
  }

  const updateSubscriptionSavings = function(){
    if ( currentVariant.selling_plan_allocations ) {
      let sellingPlan = currentVariant.selling_plan_allocations[0]

      if (sellingPlan) {
        let subscriptionSavings = sellingPlan.compare_at_price - sellingPlan.price;
        let formattedSavings = "$" + formatMoney(subscriptionSavings, "amount");

        cache.$subscriptionSavings.text(formattedSavings)
      }
    }    
  }

  const updateProductPrice = function(){
    let subscriptionOptionSelected = cache.$deliveryOption.closest(":checked").val() === "subscribe"

    if (subscriptionOptionSelected) {
      updateSubscriptionPrice()
    } else {
      updateOneTimePrice()
    }
  }

  // -------
  // Events
  // -------

  const setCurrentVariant = function(e) {
    // findVariant by matching activeOptions[0] / activeOptions[1] etc
    if (!variants) return;

    let name = $(this).data("name")
    let value = $(this).val()

    setActiveOption(name, value)

    currentVariant = variants.find(variant => {
      let filteredOptions = product.options.filter((option, index) => {
        let optionName = `option${index + 1}`
        return variant[optionName] === options[option]
      })

      return filteredOptions.length === product.options.length
    })

    if (currentVariant) {
      cache.$idInput
        .val(currentVariant.id)
        .change()
    }

    return currentVariant;
  }

  const handleVariantChange = function(e){
    // updateVariant(currentVariant)
    // updates anything on the form UI
    // Dispatches "variant:change" event that can capture any other changes in other files.
    // add to cart / availability
    updateAddToCart()
    updateProductPrice()
    updateSubscriptionSavings()
    // price
    // images?

    let event = new CustomEvent('variant:change', {
      detail: { variant: currentVariant }
    });
    document.dispatchEvent(event);
  }

  const handleSwatchChange = function(e){
    e.preventDefault()
    e.stopPropagation()

    let $this = $(this)
    let name = $this.data('option')
    let value = $this.data('value')

    cache.$hiddenOptionSelects
      .closest(`[data-name=${name}]`)
      .val(value)
      .change()
  }

  const handleDeliveryChange = function(e){
    let $this = $(this)
    if ($this.val() === "subscribe") {
      // Expand the Frequency group
      cache.$frequencyContainer.slideDown(300)
      cache.$sellingPlan.attr('disabled', false)
    } else {
      cache.$frequencyContainer.slideUp(300)
      cache.$sellingPlan.attr('disabled', true)
    }

    updateProductPrice()
  }

  const init = function(){
    initEventListeners()
    parseVariants()
    parseOptions()

    cache.$hiddenOptionSelects.change()
  }

  init()
}

export default ProductForm;
