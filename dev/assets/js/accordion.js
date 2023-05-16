import $ from 'jquery';
import { elementsExist } from './utilities.js';

const Accordion = (function(){
  const cache = {
    $toggle: $(".js-expandable-toggle"),
    $content: $(".js-expandable-content"),
    $group: $(".js-expandable-group")
  }

  const settings = {
    activeClass: "active"
  }

  const init = function(){
    if (!elementsExist([cache.$toggle])) return;

    cache.$toggle.on('click', toggleContent);
  }

  const hideContent = function($content, $toggle){
    $content.removeClass(settings.activeClass)
    $toggle.removeClass(settings.activeClass)

    $content.slideUp(300)
    $content.attr( 'aria-expanded', false )

    $toggle.find('.icon-plus').removeClass('hidden')
    $toggle.find('.icon-minus').addClass('hidden')
  }

  const showContent = function($content, $toggle){
    $content.addClass(settings.activeClass)
    $toggle.addClass(settings.activeClass)

    $content.slideDown(300)
    $content.attr( 'aria-expanded', true )

    $toggle.find('.icon-plus').addClass('hidden')
    $toggle.find('.icon-minus').removeClass('hidden')

    $content.find('.js-slick').slick()
  }

  const toggleContent = function(e){
    let $this = $(this)
    let toggleReference = $this.data('toggle')
    let $content = cache.$content.closest(`#${toggleReference}`)


    if ($content.hasClass(settings.activeClass)) {
      hideContent($content, $this)
    } else {
      showContent($content, $this)

      let $group = $this.parents(".js-expandable-group")
      let $groupContent = $group.find(".js-expandable-content").not($content)
      let $groupToggle = $group.find(".js-expandable-toggle").not($this)

      hideContent(
        $groupContent,
        $groupToggle
      )
    }

    return false;
  }

  return {
    init
  }
})()

export default Accordion
