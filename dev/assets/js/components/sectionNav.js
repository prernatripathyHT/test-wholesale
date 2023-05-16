import $ from 'jquery';
import { elementsExist, replaceHistory } from '../utilities.js';


export class SectionNav {
    constructor(navLink) {
        this.$navLink = $(navLink);
        this.$section = $(this.$navLink.data('section-nav--wrapper'));
    }

    init() {
        if ( !elementsExist([this.$section, this.$navLink]) ) return;

        this.initEventListeners();
    }

    initEventListeners() {
        this.$navLink.on('click', (e) => this.renderSection(e));
    }

    renderSection(e) {
        e.preventDefault();

        const $trigger = $(e.currentTarget);
        const sectionToRender = $trigger.data('section-nav')
        const newHref = $trigger.data('section-nav--href');
        const shouldReplaceHistory = $trigger.data('replace-history');

        $trigger.addClass("active")

        $('[data-section-nav]')
          .not($trigger)
          .removeClass('active')

        $.ajax(`${newHref}/?sections=${ sectionToRender }`)
            .then(json => {
                this.$section.html(json[sectionToRender]);
            });

        if ( newHref && shouldReplaceHistory ) replaceHistory(newHref);
    }
}
