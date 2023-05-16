import $ from 'jquery';


export const useState = (defaultValue) => {
  // 👆 We create a function useState with a default value
  let value = defaultValue;
  // 👆 We create a local variable value = defaultValue
  const getValue = () => value
  // 👇 We create a function to set the value with parameter newValue
  const setValue = newValue => value = newValue // 👈 We change the value for newValue
  return [getValue, setValue]; // 👈 We return an array with the value and the function
}

/**
 * Checks if the given elements exist on the DOM
 * @param elements An array of jQuery objects
 * @returns boolean
 */
export function elementsExist(elements = []) {
  return elements.filter(el => $(el).length).length == elements.length;
}


/**
 * Determines if the current screen is mobile-sized
 * @returns boolean
 */
export function isMobile() {
  return window.screen.availWidth < 769;
}

export function isTablet() {
  return window.screen.availWidth < 1025;
}


/**
 * Disables scrolling on the page
 */
export function disableScroll() {
  $(document.body).addClass('overflow-hidden');
}


/**
 * Enables scrolling on the page
 */
export function enableScroll() {
  $(document.body).removeClass('overflow-hidden');
}


export function syncElementsHeight($elements) {
  if (!$elements.length) return;

  // Reset heights to get accurate measurement
  $elements.height('auto');

  // Sort elements by intrinsic height
  const sortedByHeight = $elements.sort((a, b) => {
    return b.offsetHeight - a.offsetHeight;
  });
  const maxHeight = sortedByHeight[0].offsetHeight;

  // Set all elements to match the tallest element found
  $elements.height(maxHeight);

  return maxHeight;
}


/**
 *
 * @param {*} cents
 * @param {*} format [Enum: "amount", "amount_no_decimals", "amount_with_comma_separator", "amount_no_decimals_with_comma_separator"]
 * @returns
 */
export function formatMoney(cents, format) {
  if ( typeof cents == 'string' ) {
    cents = cents.replace('.','');
  }

  var value = '';
  var defaultFormat = "amount"
  var formatString = (format || defaultFormat);

  function defaultOption(opt, def) {
     return (typeof opt == 'undefined' ? def : opt);
  }

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ',');
    decimal   = defaultOption(decimal, '.');

    if (isNaN(number) || number == null) { return 0; }

    number = (number/100.0).toFixed(precision);

    var parts   = number.split('.'),
        dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
        cents   = parts[1] ? (decimal + parts[1]) : '';

    return dollars + cents;
  }

  switch(formatString) {
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

  return value
};

export function replaceHistory(href) {
  if ( href ) history.replaceState({}, '', href);
}
