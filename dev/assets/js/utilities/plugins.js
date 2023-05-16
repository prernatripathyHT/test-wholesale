import $ from 'jquery';


/**
 * Uses MutationObserver to watch for added elements
 * 
 * @param {String | Element} child 
 * @param {Function} callback 
 * @param {String} parent 
 * 
 * @usage
 *  $('.element-to-watch').watch('.element-to-watch', function($el) {
        this.onElementRender($el);
    });
 */
$.fn.watchFor = function(child, callback) {
    const parent = this[0];

    const observer = new MutationObserver(function(mutations_list) {
        mutations_list.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(added_node) {
            const $found_nodes = $(added_node).find(child);

            if ( $found_nodes.length && callback ) callback($found_nodes);
        });
        });
    });
    observer.observe(parent, { subtree: true, childList: true });

    if ( callback ) callback($(child));

    return this;
};
