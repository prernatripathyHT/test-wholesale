import $ from 'jquery'
import './utilities/plugins.js'
import { SectionNav, SectionRerender } from './components'

import InlineToggle from './utilities/inlineToggle.js'
import Deactivate from './utilities/deactivate.js'
import Accordion from './accordion.js'
import AudioTrigger from './audioTrigger.js'
import BackInStock from './backInStock.js'
import BlendComponents from './blendComponents.js'
import Cart from './cart.js'
import CollectionNav from './collectionNav.js'
import CustomerAddresses from './customerAddresses.js'
import CustomSelect from './customSelect.js'
import CustomSelectInit from './customSelectInit.js'
import FilterOptionList from './filterOptions.js'
import GiftSubscription from './giftSubscription.js'
import Marquee from './marquee.js'
import Menu from './menu/menu.js'
import Pagination from './pagination'
import PredictiveSearch from './predictiveSearch'
import ProductBuyPanel from './productBuyPanel'
import ProductCard from './productCard'
import ProductFormsInit from './productFormsInit'
import ProductRecommendations from './productRecommendations'
import QuantityBox from './quantityBox'
import RevealAnimation from './animation.js'
import Slider from './slider.js'
import Video from './video.js'


$(() => {
  initComponents()
  // pageRouter()

  Menu.init()

  triggerMarquee();
  triggerSlick();

  QuantityBox.init();
  Cart.init();
  CollectionNav.init();
  ProductBuyPanel.init();
  ProductFormsInit.init();
  ProductCard.init();
  Accordion.init();
  ProductRecommendations.init();
  FilterOptionList.init();
  Video.init();
  AudioTrigger.init();
  PredictiveSearch.init();
  BackInStock.init();
  BlendComponents.init();
  GiftSubscription.init();
});


/**
 * Instantiates global components
 */
const initComponents = () => {
  $(document).watchFor('.animate', function($el) {
    $el.each(function() { new RevealAnimation(this).init(); });
  });

  $(document).watchFor('[data-section-nav]', function($el) {
    $el.each(function() { new SectionNav(this).init(); });
  });

  $(document).watchFor('[data-section-rerender]', function($el) {
    $el.each(function() { new SectionRerender(this).init(); });
  });

  $(document).watchFor('.js-custom-select-container', function($el) {
    $el.each(function(index, node) {
      CustomSelect($(node))
    });
  });

  $(document).watchFor('.js-pagination', function($el) {
    $el.each(function(index, node) {
      Pagination.init($(node));
    })
  });

  $(document).watchFor('[data-customer-addresses]', function($el){
    CustomerAddresses.init();
  });

  // * InlineToggle
  $('[data-toggle]').each(function() {
    new InlineToggle(this).init();
  });
  
  // * Deactivate
  $('[data-deactivate]').each(function() {
    new Deactivate(this).init();
  });

  // $(document).watchFor('.js-slick', function($el){
  //    const slickSlider = new Slider($el);
  //    slickSlider.init();
  // });
}

/**
 * Instantiates the proper JS Class based on template file name
 */
 const pageRouter = () => {
    const template = $('body').data('template');

    switch ( template ) {

      case 'login':

        break;
    }
};


const triggerMarquee = () => {
  const config = {
    wrapperSelector: '.js-marquee-wrapper',
    marqueeSelector: '.js-marquee',
    initializedClass: 'js-marquee--initialized'
  };

  const marquee = new Marquee(config);
  marquee.init();
};


const triggerSlick = () => {
  const config = {
    slickSelector: '.js-slick:visible'
  };

  let $sliders = $(config.slickSelector)

   $sliders.each(function(index, slider){
     const slickSlider = new Slider(slider);
     slickSlider.init();
   })
};
