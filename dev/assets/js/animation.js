import $ from 'jquery';
import { elementsExist } from './utilities.js';


/**
 * Watches for & triggers reveal animations when elements enter view
 */
export default class RevealAnimation {
  constructor(target) {
    this.$target = $(target);
    this.triggerClass = 'animate-animated';
  }

  init() {
    if ( !elementsExist([this.$target]) ) return;

    this.initAnimationsObserver();
  }

  initAnimationsObserver(){
    if ( typeof IntersectionObserver === 'function' ) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: .05
      };

      const observer = new IntersectionObserver((e) => this.observeAnimations(e), options);
      observer.observe(this.$target[0]);
    } 
    
    if ( typeof IntersectionObserver !== 'function' ) {
      this.$target.addClass(this.triggerClass);
      // this.$target.removeClass(this.targetClass);
    }
  }

  observeAnimations(entries) {
    entries.forEach((entry) => {
      let $target = $(entry.target);

      if (!$target.hasClass(this.triggerClass) && entry.isIntersecting) {
        const delay = screen.availWidth < 567 && $target.data('mobileDelay')
          ? $target.data('mobileDelay')
          : $target.data('delay');

        this.triggerAnimation($target, delay);
      }
    });
  }

  triggerAnimation($target, delay = 0) {
    setTimeout(function() {
      $target.addClass('animate-animated');
      $target.removeClass('animate');
    }, parseInt(delay));
  }
}
