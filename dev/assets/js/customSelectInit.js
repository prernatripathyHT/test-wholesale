import $ from 'jquery';
import { elementsExist } from './utilities.js';
import CustomSelect from './customSelect';

const CustomSelectInit = (function(){
  const selectors = {
    customSelectContainer: ".js-custom-select-container"
  }

  const init = function(){
    if (!elementsExist([selectors.customSelectContainer])) return;

    $(selectors.customSelectContainer).each(function(index, customSelectContainer){
      CustomSelect($(customSelectContainer))
    })
  }

  // Events for escape key or document click off to close.

  return {
    init
  }

})()

export default CustomSelectInit;
