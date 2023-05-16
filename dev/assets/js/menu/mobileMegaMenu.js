import $ from 'jquery';
import { elementsExist, disableScroll, enableScroll } from '../utilities.js';

const MobileMegaMenu = function(selectors, activeMenu, setActiveMenu){

  if (!elementsExist([selectors.mobileMegaMenuTrigger])) return;

  const initEventListeners = function(){
    $(selectors.mobileMegaMenuTrigger).on('click', toggleMegaMenu);
    $(selectors.mobileMegaMenuClose).on('click', closeMegaMenu);
  }

  const getActiveElements = function($this){
    let activeLink = $this.data('link');
    let $activeMegaMenu = $(`${selectors.mobileMegaMenuContainer}[data-link="${activeLink}"]`);
    let $activeTrigger = $(`${selectors.mobileMegaMenuTrigger}[data-link="${activeLink}"]`);

    return { activeLink, $activeMegaMenu, $activeTrigger }
  }

  const toggleMegaMenu = function(e){
    e.preventDefault();

    let $this = $(this);
    let { activeLink, $activeMegaMenu, $activeTrigger } = getActiveElements($this)

    if (activeMenu()) {
      // menu is open. Close the active menu and open the new active one.
      if (activeMenu() === activeLink) {
        // Currently open menu got clicked. Close the active menu.
        slideCloseMegaMenu($activeMegaMenu, $activeTrigger);
      } else {
        slideOpenMegaMenu($activeMegaMenu, $this);
      }
    } else {
      // no menus open. Open the menu with slide out transition
      slideOpenMegaMenu($activeMegaMenu, $this);
    }
  }

  const closeMegaMenu = function(e){
    e.preventDefault()
    let $this = $(this);

    let { activeLink, $activeMegaMenu, $activeTrigger } = getActiveElements($this);

    slideCloseMegaMenu($activeMegaMenu, $activeTrigger);
  }

  const slideOpenMegaMenu = function($activeMegaMenu, $activeLink){
    // Opens the menu with a slide right transition

    $(selectors.overlay).fadeIn(300)

    $activeMegaMenu.addClass(selectors.activeClass)

    $activeMegaMenu.removeClass('invisible')

    $activeLink.addClass(selectors.activeClass)

    setActiveMenu($activeLink.data('link'))

    disableScroll()
  }

  const slideCloseMegaMenu = function($activeMegaMenu, $this){
    // Closes the menu with a slide left transition

    $(selectors.overlay).fadeOut(300)

    $this.removeClass(selectors.activeClass)

    $activeMegaMenu.removeClass(selectors.activeClass)

    setActiveMenu(undefined)

    enableScroll()

    setTimeout(function(){
      $activeMegaMenu.addClass('invisible')
    }, 300)
  }

  initEventListeners()
}

export default MobileMegaMenu;
