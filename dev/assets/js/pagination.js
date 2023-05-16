import $ from 'jquery';

import { replaceHistory } from './utilities.js';

// ++++++++++++++++
//  Custom Pagination
//  w/ Section Rendering
// ++++++++++++++++

const Pagination = (function($el){
  const settings = {
    container: '.js-pagination',
    link: '.js-pagination a',
    target: '.js-pagination-target'
  }

  const cache = {
    $container: $(settings.container),
    section: ""
  }

  const init = function($container) {
    if ( !$container.length ) return;

    cache.$container = $container;
    cache.section = $container.data('section');

    let $links = $container.find('a')

    $links.on('click', (e) => handleClick(e));
  }

  const handleClick = function(e) {
    e.preventDefault();

    const $link = $(e.currentTarget)
    const href = $link.attr('href')

    replaceHistory(href)
    updateSection(href)
  }

  const updateSection = function(href) {
    let operator = href.includes("?") ? "&" : "?";
    const url = `${href}${operator}sections=${cache.section}`

    $.ajax(url).then(response => {
      if (response && response[cache.section]) {
        let $responseHTML = $(response[cache.section]).find(settings.target)

        let $target = $(settings.target)
        $target.replaceWith($responseHTML)
      }
    });

  }

  return { init }
})()

export default Pagination;
