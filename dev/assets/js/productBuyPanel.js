import $ from 'jquery';
import { elementsExist } from './utilities.js';

// Handles anything in the PDP buy panel:
// - Variant changes
// - Image filtering

const ProductBuyPanel = (function(){
  const selectors = {
    productImages: ".js-product-images",
    productImageSlider: ".js-product-image-slider",
    imageSlides: ".js-image-slide",
    classRegisterBtn: ".js-class-register-btn",
    classInstructorContent: ".js-instructor-content",
    classInstructorPanel: ".js-instructor-panel",
    notifyMeFormContainer: ".js-notify-form"
  }

  const cache = {
    $productImageSlider: $(selectors.productImageSlider),
  }

  const init = function(){
    if (!elementsExist( [selectors.productImages] )) return;

    initEventListeners()
  }

  const initEventListeners = function(){
    $(document).on('variant:change', handleVariantChange)
  }

  const handleVariantChange = function(e){
    let { variant } = e.detail;

    filterSlickSlides(variant)
    updateClassButton(variant)
    updateClassInstructor(variant)
    toggleNotifyForm(variant);
  }

  const toggleNotifyForm = function(variant){
    if (variant.available){
      $(selectors.notifyMeFormContainer).addClass('hidden')
    } else {
      $(selectors.notifyMeFormContainer).removeClass('hidden')
    }
  }

  const updateClassInstructor = function(variant){
    let $allInstructorContent = $(`${selectors.classInstructorContent}`)
    let $variantInstructorContent = $allInstructorContent.closest(`[data-variant="${variant.id}"]`)

    if ($variantInstructorContent.length) {
      $(selectors.classInstructorPanel).removeClass('hidden')
      $allInstructorContent.not($variantInstructorContent).addClass('hidden')
      $variantInstructorContent.removeClass('hidden')
    } else {
      $(selectors.classInstructorPanel).addClass('hidden')
      $allInstructorContent.addClass('hidden')
    }
  }

  const updateClassButton = function(variant){
    let $allRegisterBtns = $(`${selectors.classRegisterBtn}`)
    let $defaultRegisterBtn = $allRegisterBtns.closest(`[data-variant=""]`)
    let $variantRegisterBtn = $allRegisterBtns.closest(`[data-variant="${variant.id}"]`)

    if ($variantRegisterBtn.length) {
      $variantRegisterBtn.removeClass('hidden')
      $allRegisterBtns.not($variantRegisterBtn).addClass('hidden')
    } else {
      $defaultRegisterBtn.removeClass('hidden')
      $allRegisterBtns.not($defaultRegisterBtn).addClass('hidden')
    }
  }

  const filterSlickSlides = function(variant){
    if (cache.$productImageSlider.hasClass('slick-initialized')) {

      let { id } = variant;

      cache.$productImageSlider.slick('slickUnfilter')

      cache.$productImageSlider.slick('slickFilter', function(index, slide){
        let $slideItem = $(slide).find(selectors.imageSlides)
        let attachedVariantId = $slideItem.data('variant');

        if (attachedVariantId) {
          return id === parseInt(attachedVariantId);
        } else {
          return true
        }
      })

      cache.$productImageSlider.slick("slickGoTo", 0, false);
    }

  }

  return {
    init
  }
})()


export default ProductBuyPanel
