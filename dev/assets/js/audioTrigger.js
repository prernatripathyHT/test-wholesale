// audioTrigger.js

import $ from 'jquery';
import { elementsExist } from './utilities.js';

const AudioTrigger = (function(){
  const selectors = {
    playButton: ".js-play-pronunciation",
    pronunciationFile: ".js-product-pronunciation"
  }

  const init = function(){
    if (elementsExist([$(selectors.playButton), $(selectors.pronunciationFile)])) {
      initEventListeners()
    }
  }

  const initEventListeners = function(){
    $(selectors.playButton).on('click', playAudio);
  }

  const playAudio = function(e){
    let $this = $(this);
    let pronunciationAudio = $this.find(selectors.pronunciationFile)[0]

    if (pronunciationAudio) {
      pronunciationAudio.play()
    }
  }

  return { init }
})()

export default AudioTrigger;
