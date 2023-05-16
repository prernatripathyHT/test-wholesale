import $ from 'jquery';
import { elementsExist } from './utilities.js';

const FloatingLabel = (function(){
  const selectors = {
    floatingInput: ".js-floating-input"
  }

  const init = function(){
    if (!elementsExist( [selectors.floatingInput] )) return;

    initEventListeners()
  }

  const initEventListeners = function(){
    $(selectors.floatingInput).on('change', handleInputChange)
  }

  const handleInputChange = function(e){
    let value = $(this).val()

    if (value.length) {
      $(this).addClass('has-text')
    } else {
      $(this).removeClass('has-text')
    }
  }

  return {
    init
  }
})()


export default FloatingLabel
