import $ from 'jquery';

// ++++++++++++++++
//  Collection Nav
// ++++++++++++++++

const collectionNav = {
  settings: {
    nav: '.js-collection-nav',
    link: '.js-collection-nav--link',
    item: '.js-collection-nav--item',
    indicator: '.js-collection-nav--indicator'
  },

  init: function() {
    const $nav = $(collectionNav.settings.nav);
    if ( !$nav.length ) return;

    // $(collectionNav.settings.link).on('click', (e) => collectionNav.handleClick(e));

    // Get collection sections
    const sections = collectionNav.gatherSections($nav);

    $(document).on('scroll', function() {
      const sectionVisibility = collectionNav.checkSectionVisibility(sections);

      // Find the section w/ largest viewport presence
      const sortableSections = Object.entries(sectionVisibility);
      sortableSections.sort((a, b) => {
        return b[1] - a[1];
      });

      // Find the associated link
      collectionNav.updateLinks($nav, sortableSections);
    });

    // $(document).trigger('scroll');
  },

  handleClick: function(e) {
    e.preventDefault();

    const $link = $(e.currentTarget);
    const $targetSection = $($link.attr('href'));

    const scrollTarget = $targetSection.offset().top;
    const navHeight = $('.js-nav .content').innerHeight();

    window.scrollTo(0, scrollTarget - navHeight);
  },

  gatherSections: function($nav) {
    let sections = [];

    const $navLinks = $nav.find(collectionNav.settings.link);
    $navLinks.each(function() {
      const $link = $(this);
      const href = $link.attr('href').substring(1);

      sections.push(document.getElementById(href));
    });

    return sections;
  },

  checkSectionVisibility: function(sections) {
    const viewportHeight = window.innerHeight;
    const viewportTop = $(document).scrollTop();
    const viewportBottom = viewportTop + viewportHeight;

    const sectionVisibility = {};

    sections.forEach((section) => {
      const $section = $(section);

      const sectionHeight = $section.height();
      const sectionTop = $section.offset().top;
      const sectionBottom = sectionTop + sectionHeight;

      // Check if section is (at least) partially on screen
      const issectionVisible = (viewportTop < sectionBottom) && (viewportBottom > sectionTop);
      if ( issectionVisible ) {
        let pxOffScreen = 0;

        if ( viewportTop > sectionTop ) { // px above screen
          const pxAboveScreen = viewportTop - sectionTop;
          pxOffScreen = pxOffScreen + pxAboveScreen;
        }

        if ( viewportBottom < sectionBottom ) { // px below screen
          const pxBelowScreen = sectionBottom - viewportBottom;
          pxOffScreen = pxOffScreen + pxBelowScreen;
        }

        const pxOnScreen = sectionHeight - pxOffScreen;

        if ( pxOnScreen >= 150 ) {
          sectionVisibility[$section.attr('id')] = pxOnScreen;
        }
      }
    });

    return sectionVisibility;
  },

  updateLinks: function($nav, sortableSections) {

    const $navIndicator = $nav.find(collectionNav.settings.indicator);
    const $links = $(collectionNav.settings.link);

    if ( sortableSections && sortableSections[0] && sortableSections[0][0] ) {
      const activeLink = sortableSections[0][0];
      const $activeLink = $links.filter(`[href="#${ activeLink }"]`);

      $links.removeClass('active');
      $activeLink.addClass('active');

      $navIndicator.css({
        left: $activeLink.position().left + 'px',
        width: $activeLink.width() + 'px'
      });
    } else {
      $navIndicator.css({ width: 0 });
      $links.removeClass('active');
    }
  }
};

export default collectionNav;
