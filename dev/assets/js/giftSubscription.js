import $ from 'jquery';
import { elementsExist } from './utilities.js';


const GiftSubscription = (function(){
  const settings = {
    buyPanel: ".js-gift-buy-panel",
    giftSelectorContainer: ".js-gift-selector",
    productSelectInputs: '[name="gift_duration"]',
    variantSkuInputs: '[name="variant_sku"]'
  }

  let product = {};
  let variant = {};
  let handle = "";
  let variantSKU = "";

  const init = function(){
    if (!elementsExist([ $(settings.buyPanel) ])) return;

    initializeEventListeners()
    getInitialValues()
  }

  const getInitialValues = function(){
    $(settings.variantSkuInputs).closest(':checked').trigger('change')
    $(settings.productSelectInputs).closest(':checked').trigger('change')
  }

  const getProductJSON = function(callback){
    $.ajax(`/products/${handle}.json`)
      .then(json => {
        if (json.product) {
          product = json.product
        }

        callback()
      })
  }

  const initializeEventListeners = function(){
    $(settings.productSelectInputs).on('change', handleProductSelectChange)
    $(settings.variantSkuInputs).on('change', handleVariantSelectChange)
  }

  const handleProductSelectChange = function(e){
    handle = $(this).val()

    getProductJSON(getActiveVariant)
  }

  const handleVariantSelectChange = function(e){
    variantSKU = $(this).val()
    getActiveVariant()
  }

  const getActiveVariant = function(){
    if (product && product.variants && variantSKU) {
      variant = product.variants.find(prodVariant => prodVariant.sku === variantSKU);
      updateProductBuyPanel()
    }
  }

  const updateProductBuyPanel = function(){
    let section = "gift-subscription"

    if (product && product.handle && variant && variant.id) {
      let url = `/products/${product.handle}?variant=${variant.id}&sections=${section}`

      $.ajax(url).then(response => {
        let responseHTML = response[section];

        let $newBuyPanel = $(responseHTML).find(settings.buyPanel)
        $(settings.buyPanel).replaceWith($newBuyPanel)
        $(settings.buyPanel).removeClass('hidden')
      })
    }
  }

  return {
    init
  }

})()

export default GiftSubscription;
