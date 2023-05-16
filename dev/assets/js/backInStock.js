import $ from 'jquery';
import { elementsExist } from './utilities.js';

const BackInStock = (function() {
  const selectors = {
    bisSubmit: ".js-bis-submit",
    bisInput: ".js-bis-input",
    bisLabel: ".js-bis-label",
    bisText: ".js-bis-text",
    bisForm: ".js-bis-form",
    bisError: ".js-bis-error"
  }

  const init = function(){
    if (elementsExist([selectors.bisSubmit])) {
      initEventListeners()
    }
  }

  const initEventListeners = function(){
    $(selectors.bisSubmit).on('click', subscribeToBIS)
  }

  const subscribeToBIS = function(e){
    let productId = $(this).data('productId');
    let variantId = $(this).data('variantId');
    let productTitle = $(this).data('productTitle');
    let email = $(selectors.bisInput).val();

    if (variantId && email) {
      $.ajax({
        type: "POST",
        url: "https://a.klaviyo.com/onsite/components/back-in-stock/subscribe",
        data: {
          a: "MYFtmx",
          email: email,
          variant: variantId,
          product: productId,
          platform: "shopify",
          subscribe_for_newsletter: false,
        },
        success: function(response){
          $(selectors.bisText).text("You're on the list! You'll receive an email when " + productTitle + " becomes available.");
          $(selectors.bisForm).hide();
          $(selectors.bisError).addClass('hidden')
        },
        error: function(error){
          $(selectors.bisError).removeClass('hidden')
        }
      })
    }
  }

  return { init }
})()


export default BackInStock;
