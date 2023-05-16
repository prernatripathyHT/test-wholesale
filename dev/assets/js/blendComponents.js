import $ from 'jquery';
import { elementsExist } from './utilities.js';

const BlendComponents = (function(){
  const settings = {
    searchButton: ".js-search-blends",
    roastDateSelect: "#blend-components",
    blendContainer: ".js-blend-container"
  }

  const init = function(){
    if (elementsExist([$(settings.searchButton)])) {
      $(settings.searchButton).on('click', renderBlendComponents);
    }
  }

  const renderBlendComponents = function(){
    let activeDate = $(settings.roastDateSelect).val()
    let $blendContainers = $(settings.blendContainer)
    let $activeBlendContainer = $blendContainers.closest(`[data-date="${activeDate}"]`)

    $blendContainers.not($activeBlendContainer).addClass('hidden')
    $activeBlendContainer.removeClass('hidden')
  }

  return { init }
})()

export default BlendComponents
