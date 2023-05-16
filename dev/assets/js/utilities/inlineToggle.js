// utilities/inlineToggle.js

import $ from 'jquery';
import { elementsExist } from '../utilities';

/**
 * * Toggles the 'activated' class on a given element on click
 *
 * @options
    * [data-toggle] {required} - Pass selector for target element
 */
export default class InlineToggle {
    constructor(trigger) {
        this.targetSelector = $(trigger).data('toggle');
        this.$target = $(this.targetSelector);

        this.$trigger  = $(trigger);
        this.$triggers = $(`[data-toggle="${ this.targetSelector }"]`);
    }

    init() {
        if ( !elementsExist([this.$target, this.$triggers]) ) return;
        
        this.initEventListeners();
    }

    initEventListeners() {
        this.$trigger.on('click', () => (this.toggleProperties()));
    }

    toggleProperties() {
        this.$target.toggleClass('activated');
        this.$triggers.toggleClass('activated');
    }
}