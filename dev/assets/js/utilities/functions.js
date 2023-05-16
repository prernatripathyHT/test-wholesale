/**
 * * Checks if the given elements exist on the DOM
 *
 * @param  {Object[]} elements - A list of jQuery objects
 * @returns {boolean} Whether the elements were found on the DOM
 */
export function elementsExist(elements = []) {
    return elements.filter(el => el.length).length == elements.length;
}


/**
 * * Determines if the current screen is mobile-sized
 *
 * @returns {boolean} Whether the current screen width is within the mobile threshhold
 */
export function isMobile() {
    return window.screen.availWidth < parseInt(window.config.screens.md);
}


/**
 *
 * @param {*} cents
 * @param {*} format
 * @returns
 */
export function formatMoney(cents, format) {
    if ( typeof cents == 'string' ) cents = cents.replace('.', '');

    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || '${{ amount_no_decimals }}');

    function defaultOption(opt, def) {
       return (typeof opt == 'undefined' ? def : opt);
    }

    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = defaultOption(precision, 2);
      thousands = defaultOption(thousands, ',');
      decimal   = defaultOption(decimal, '.');

      if (isNaN(number) || number == null) { return 0; }

      number = (number / 100.0).toFixed(precision);

      var parts   = number.split('.'),
          dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
          cents   = parts[1] ? (decimal + parts[1]) : '';

      return dollars + cents;
    }

    switch(formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;

      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;

      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;

      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;

      }

    return formatString.replace(placeholderRegex, value);
};


/**
 * Updates a list of elements to all match the height of the tallest element provided
 *
 * @param {jQuery node list} $elements
 */
 export function syncElementsHeight($elements) {
    if ( !$elements.length ) return;

    // Reset heights to get accurate measurement
    $elements.height('auto');

    // Sort elements by intrinsic height
    const sortedByHeight = $elements.sort((a, b) => {
        return b.offsetHeight - a.offsetHeight;;
    });
    const maxHeight = sortedByHeight[0].offsetHeight;

    // Set all elements to match the tallest element found
    $elements.height(maxHeight);
}

export function replaceHistory(href){
  history.replaceState({}, "", href)
}