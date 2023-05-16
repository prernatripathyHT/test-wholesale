import MegaMenu from './megaMenu.js';
import MobileMegaMenu from './mobileMegaMenu.js';
import AnnouncementBar from './announcementBar.js';

import { useState } from '../utilities'

const Menu = (function(){
  let [activeMenu, setActiveMenu] = useState(undefined);

  const selectors = {
    megaMenuTrigger: ".js-mega-link",
    megaMenuContainer: ".js-mega-menu",
    mobileMegaMenuTrigger: ".js-mobile-mega-link",
    mobileMegaMenuClose: ".js-mobile-mega-close",
    mobileMegaMenuContainer: ".js-mobile-mega-menu",
    overlay: ".js-overlay",
    activeClass: "active",
    mainNav: ".js-main-nav",
    announcementBar: ".js-announcement",
    announcementClose: ".js-close-announcement",
    mainLogo: ".js-main-logo svg"
  }

  const init = function(){
    MegaMenu(selectors, activeMenu, setActiveMenu)
    MobileMegaMenu(selectors, activeMenu, setActiveMenu)
    AnnouncementBar(selectors)

    $(window).on('scroll', handlePageScroll);
  }

  const handlePageScroll = function(e){
    let docHeight = $(document).height();
    let { scrollY } = window;

    let rotationAmount = 720 * scrollY / docHeight;

    $(selectors.mainLogo).css({
      transform: `rotate(${rotationAmount}deg)`
    })
  }

  return {
    init
  }
})()

export default Menu
