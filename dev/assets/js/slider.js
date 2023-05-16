import $ from 'jquery';
import '@accessible360/accessible-slick'

window.jQuery = window.$ = $;

import { elementsExist, syncElementsHeight } from './utilities.js';


export default class Slider {
  constructor(slider) {
    this.$slider = $(slider);
  }

  init() {
    if ( !elementsExist([this.$slider]) ) return;

    this.$slider.slick();

    $(window).on('resize', () => {
      this.$slider.slick('setPosition');

      if (!this.$slider.hasClass('slick-initialized')) {
        this.$slider.slick();
      }
    });

    if (this.$slider.data('syncHeights')) {

      this.$slider.on('setPosition', this.syncSlideHeights.bind(this))

      this.$slider.slick('setPosition');

      this.$slider.find('img').on('lazyloaded', this.syncSlideHeights.bind(this))
    }
  }

  syncSlideHeights(){
    let $elements = this.$slider.find('.js-slide-inner')
    let maxHeight = syncElementsHeight($elements);

    this.$slider.height(maxHeight);
  }

}
