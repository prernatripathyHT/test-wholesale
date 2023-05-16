import $ from 'jquery';
import { elementsExist, disableScroll, enableScroll } from '../utilities.js';

const MegaMenu = function(selectors, activeMenu, setActiveMenu){

  if (!elementsExist([selectors.megaMenuTrigger])) return;

  const initEventListeners = function(){
    $(selectors.megaMenuTrigger).on('click', toggleMegaMenu);
    $(selectors.overlay).on('click', slideCloseMegaMenu);
  }

  const toggleMegaMenu = function(e){
    e.preventDefault();

    let $this = $(this);
    let activeLink = $this.data('link');
    let $activeMegaMenu = $(`${selectors.megaMenuContainer}[data-link="${activeLink}"]`);

    if (activeMenu()) {
      // menu is open. Close the active menu and open the new active one.

      if (activeMenu() === activeLink) {
        // Currently open menu got clicked. Close the active menu.
        slideCloseMegaMenu();
      } else {
        closeMegaMenu(e);
        openMegaMenu($activeMegaMenu, $this);
      }
    } else {
      // no menus open. Open the menu with slide out transition
      slideOpenMegaMenu($activeMegaMenu, $this);
    }
  }

  const openMegaMenu = function($activeMegaMenu, $activeLink){
    // Opens the menu without a slide down transition
    $activeMegaMenu.addClass(selectors.activeClass).show();
    $activeLink.addClass(selectors.activeClass);

    $(selectors.overlay).show();

    setActiveMenu($activeLink.data('link'))
    disableScroll()
  }

  const slideOpenMegaMenu = function($activeMegaMenu, $activeLink){
    // Opens the menu with a slide down transition

    $(selectors.overlay).fadeIn(300);

    $activeMegaMenu.slideDown(300, function(){
      $activeMegaMenu.addClass(selectors.activeClass);
      $activeLink.addClass(selectors.activeClass);

      setActiveMenu($activeLink.data('link'))
      disableScroll()
    })
  }

  const closeMegaMenu = function(e){
    // Closes the menu without a transition
    let $currentlyOpenMenu = $(selectors.megaMenuContainer + "." + selectors.activeClass);

    $currentlyOpenMenu.removeClass(selectors.activeClass);
    $(selectors.megaMenuTrigger).removeClass(selectors.activeClass);

    $currentlyOpenMenu.hide();

    $(selectors.overlay).hide();

    setActiveMenu(undefined)
    enableScroll()
  }

  const slideCloseMegaMenu = function(){
    // Closes the menu with a slide up transition
    let $currentlyOpenMenu = $(selectors.megaMenuContainer + "." + selectors.activeClass);

    $(selectors.overlay).fadeOut(300);

    $(selectors.megaMenuTrigger).removeClass(selectors.activeClass);

    $currentlyOpenMenu.slideUp(300, function(){
      $currentlyOpenMenu.removeClass(selectors.activeClass);

      setActiveMenu(undefined)
      enableScroll()
    });
  }

  initEventListeners()
}

export default MegaMenu;
