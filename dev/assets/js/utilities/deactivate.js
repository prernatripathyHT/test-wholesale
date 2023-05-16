// utilities/Deactivate.js

import $ from 'jquery';
import { elementsExist } from '../utilities';

/**
 * * Removes the 'activated' class on other non-active elements
 *
 * @options
    * [data-deactivate] {required} - Pass selector for target element
 */

export default class Deactivate {
    constructor(trigger) {
        this.trigger = $(trigger)
        this.data = $(trigger).data('deactivate');
        this.elements = $(`[data-deactivate='${this.data}']`).not(this.trigger);
    }

    init() {
        if ( !elementsExist([this.trigger]) ) return;
        
        this.initEventListeners();
    }

    initEventListeners() {
        this.trigger.on('click', () => (this.toggleProperties()));
    }

    toggleProperties() {        
        this.elements.filter(".activated").each(function(index, element){
            let $element = $(element)
            let $target = $($element.data('toggle'));
            $element.removeClass('activated');
            $target.removeClass('activated');
        })
    }
}