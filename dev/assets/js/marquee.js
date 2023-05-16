import $ from 'jquery';
import { elementsExist } from './utilities.js';


export default class Marquee {
  constructor({ wrapperSelector, marqueeSelector, initializedClass }) {
    this.$marquee = $(marqueeSelector);
    this.$wrapper = $(wrapperSelector);

    if ( !elementsExist([this.$wrapper, this.$marquee]) ) return;

    this.$content = this.$marquee.children();

    this.allowedLength = this.$content.length - 1;
    this.animationFrame = null;
    this.initializedClass = initializedClass;
    this.width = this.$marquee[0].scrollWidth;
  }

  init() {
    if ( !elementsExist([this.$wrapper, this.$marquee]) ) return;

    this.initEventListeners();
  }

  initEventListeners() {
    $(window).on('resize', () => this.onResize());
    this.onResize();
  }

  onResize() {
    this.destroy();
    this.width = this.$marquee[0].scrollWidth;

    const isOverflowing = this.width >= $(window).width();

    if ( isOverflowing ) {
      this.create();
    }
  }

  create() {
    const alreadyExists = this.$wrapper.hasClass(this.initializedClass);
    if ( alreadyExists ) return;

    let speed = 1;
    let progress = 1;

    const loop = () => {
      progress = progress - speed;

      if ( progress <= this.width * -1 ) {
        progress = 0;
      }

      this.$marquee.css({ transform: `translateX(${ progress }px)` });

      this.animationFrame = window.requestAnimationFrame(loop);
    }
    loop();

    this.$wrapper.addClass(this.initializedClass);
  }

  destroy() {
    const alreadyExists = this.$wrapper.hasClass(this.initializedClass);
    if ( !alreadyExists ) return;

    window.cancelAnimationFrame(this.animationFrame);

    this.reset();
  }

  reset() {
    const { allowedLength, $marquee } = this;
    const $content = $marquee.children();

    // remove cloned nodes
    $content.each(function(i) {
      if ( i > allowedLength ) {
        const contentItem = $content[i];
        $(contentItem).remove();
      }
    });

    // reset affected elements
    this.$wrapper.removeClass(this.initializedClass);
    this.$marquee.css({ 'transform': 'none' });
  }
}


// +++++++++++++++++++++
// Marquee
// +++++++++++++++++++++
const marquee = {
  settings: {
    marquee: '.js-marquee',
    inner: '.js-marquee-inner',
    responsiveClass: 'js-marquee-responsive',
    initializedClass: 'marquee-initialized'
  },

  init: function() {
    if (elementsExist([settings.marquee])) {
      this.initializeObjects();
      this.initializeAll();
    }
  },

  initializeObjects: function() { // create an object for each marquee
    this.all = {};
    const marquee = this;

    $(this.settings.marquee).each(function(i) {
      $(this).attr('data-marquee', i);
      const ID = 'marquee' + i;

      const contentQuantity = $(this).find(marquee.settings.inner + ' > *').length;
      const marqueeWidth = $(this).find(marquee.settings.inner)[0].scrollWidth;

      const obj = {
        animationFrame: null,
        allowedLength: contentQuantity - 1,
        width: marqueeWidth
      };

      marquee.all[ID] = obj;
    });
  },

  getObject: function($marquee) {
    const ID = $marquee.data('marquee');
    return this.all['marquee' + ID];
  },

  initializeAll: function() { // check for responsiveness setting
    const marquee = this;

    $(this.settings.marquee).each(function() {
      const $marquee = $(this);

      if ( $marquee.hasClass(marquee.settings.responsiveClass) ) {
        marquee.alert($marquee);
      } else {
        marquee.trigger($marquee);
      }
    })
  },

  alert: function($marquee) { // trigger/kill, dependant on screen size/resize
    $(window).on('resize', () => this.handleResize($marquee));
    this.handleResize($marquee);
  },

  handleResize: function($marquee) {
    const selfObj = this.getObject($marquee);

    if ( selfObj.width >= $(window).width() ) {
      this.trigger($marquee);
    } else {
      this.kill($marquee);
    }
  },

  trigger: function($marquee) {
    if ( $marquee.hasClass(this.settings.initializedClass) ) { return; }

    // Settings
    let speed = 0.5;

    const selfObj = this.getObject($marquee);
    const $inner = $marquee.find(this.settings.inner);
    const $content = $marquee.find(this.settings.inner + ' > *');

    // Duplicate content
    const $clone = $content.clone();
    $clone.appendTo($inner);

    let progress = 1;

    function loop() {
      progress = progress - speed;
      if ( progress <= selfObj.width * -1 ) {
        progress = 0;
      }

      $inner.css({ transform: `translateX(${ progress }px)` });

      selfObj.animationFrame = window.requestAnimationFrame(loop);
    }
    loop();

    $marquee.addClass(this.settings.initializedClass);
  },

  kill: function($marquee) { // Turn off marquee animation
    if ( !$marquee.hasClass(this.settings.initializedClass) ) { return; }

    const selfObj = this.getObject($marquee);
    window.cancelAnimationFrame(selfObj.animationFrame);

    this.cleanUp($marquee);
  },

  cleanUp: function($marquee) {
    const selfObj = this.getObject($marquee);
    const $inner = $marquee.find(this.settings.inner);

    // remove cloned nodes
    $inner.children().each(function(i) {
      if ( i > selfObj.allowedLength ) {
        $(this).remove();
      }
    });

    // reset affected elements
    $marquee.removeClass(this.settings.initializedClass);
    $inner.css({ 'transform': 'none' });
  }
}
