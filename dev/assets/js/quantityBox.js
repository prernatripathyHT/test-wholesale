import $ from 'jquery';
import { elementsExist } from './utilities.js';

const QuantityBox = (function(){

  const settings = {
    quantityButton: ".js-change-quantity",
    quantityInput: ".js-quantity-input"
  }

  const init = function(){
    if (!elementsExist([settings.quantityInput])) return;

    initializeEventListeners()
  }

  const initializeEventListeners = function(){
    $(document).on('click', settings.quantityButton, handleQuantityChange);
  }

  const handleQuantityChange = function(e){
    let action = $(this).data('action')
    let $input = $(this).siblings(settings.quantityInput)
    let quantity = parseInt($input.val())

    let min = parseInt($input.attr('min'));
    let newQty = quantity;

    if (action === "plus") {
      newQty = quantity + 1;
    } else {
      newQty = (quantity === min ? min : quantity - 1);
    }

    $input.val(newQty).change();
  }

  return {
    init
  }
})()

export default QuantityBox;
