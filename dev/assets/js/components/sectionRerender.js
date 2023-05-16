import $ from 'jquery';
import { elementsExist } from '../utilities.js';


export class SectionRerender {
    constructor(link) {
        this.$link = $(link);
        this.sectionID = this.$link.data('section-rerender');
        this.searchParams = Array(this.$link.data('section-rerender--params'))[0];   
    }

    init() {
        if ( !elementsExist([this.$link]) ) return;

        this.initEventListeners();
    }

    initEventListeners() {
        this.$link.on('click', (e) => {
            this.rerenderSection(e);
        })
    }

    rerenderSection(e) {
        e.preventDefault();
    

        console.log(this.$link)
        if ( this.searchParams ) this.updateURL();

        const urlParams = location.search;
        
        console.log(urlParams);
        
        let requestURL = `${ location.pathname }${ urlParams }`;

        if (requestURL.includes("?")) {
            requestURL += `&section_id=${ this.sectionID }`;
        } else {
            requestURL += `?section_id=${ this.sectionID }`;
        }
        
        console.log(requestURL);

        $.ajax(requestURL).then(json => {
            // debugger
            $(`#shopify-section-${ this.sectionID }`).replaceWith(json);
        });
    }

    updateURL() {
        const href = new URL(window.location.href);
    
        href.searchParams.set(this.searchParams[0], this.searchParams[1]);
        window.history.replaceState(null, '', href.search);
    }
}
