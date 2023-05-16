import $ from 'jquery';
import { elementsExist } from './utilities.js';
import ProductForm from './productForm'

const ProductFormsInit = (function(){
  const selectors = {
    form: ".js-product-form"
  }

  const init = function(){
    if (!elementsExist([selectors.form])) return;
    initializeProductForms();
  }

  const initializeProductForms = function(){
    $(selectors.form).each(function(index, form){
      ProductForm($(form))
    })
  }

  return {
    init
  }

})()

export default ProductFormsInit;
