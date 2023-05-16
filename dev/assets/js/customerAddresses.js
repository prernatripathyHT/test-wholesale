import $ from 'jquery';

const selectors = {
  customerAddresses: '[data-customer-addresses]',
  addressCountrySelect: '[data-address-country-select]',
  addressContainer: '[data-address]',
  toggleAddressButton: 'button.js-add-edit-btn',
  cancelAddressButton: 'button[type="reset"]',
  deleteAddressButton: '.js-delete-address',
  hideElementsOnToggle: ".js-hide-on-toggle"
};

const attributes = {
  expanded: 'aria-expanded',
  confirmMessage: 'data-confirm-message'
};

const CustomerAddresses = (function(){
  let elements = {}

  const getElements = function(){
    const container = $(selectors.customerAddresses);
    return container.length ? {
      container,
      addressContainer: $(selectors.addressContainer),
      toggleButtons: $(selectors.toggleAddressButton),
      cancelButtons: $(selectors.cancelAddressButton),
      deleteButtons: $(selectors.deleteAddressButton),
      countrySelects: $(selectors.addressCountrySelect),
      hideElementsOnToggle: $(selectors.hideElementsOnToggle)
    } : {};
  }

  const setupCountries = function() {
    if (Shopify && Shopify.CountryProvinceSelector) {
      new Shopify.CountryProvinceSelector('AddressCountry_new', 'AddressProvince_new', {
        hideElement: 'AddressProvinceContainer_new'
      });
      // eslint-disable-next-line no-new

      elements.countrySelects.each((index, select) => {
        const formId = select.dataset.formId;
        // eslint-disable-next-line no-new
        new Shopify.CountryProvinceSelector(`AddressCountry_${formId}`, `AddressProvince_${formId}`, {
          hideElement: `AddressProvinceContainer_${formId}`
        });
      });
    }
  }

  const initEventListeners = function() {
    elements.toggleButtons.on('click', handleAddEditButtonClick)
    elements.cancelButtons.on('click', handleCancelButtonClick)
    elements.deleteButtons.on('click', handleDeleteButtonClick)
  }

  const toggleExpanded = function($target) {
    $target.toggleClass('hidden')
    elements.hideElementsOnToggle.toggle()
  }

  const handleAddEditButtonClick = function(e){
    let $this = $(this)
    let target = $($this.data('target'))

    toggleExpanded(target)
  }

  const handleCancelButtonClick = function(e){
    let $this = $(this)
    let target = $($this.data('target'))

    toggleExpanded(target)
  }

  const handleDeleteButtonClick = function(e){
    Shopify.postLink($(this).data('target'), {
      parameters: { _method: 'delete' },
    });
  }

  const init = function(){
    elements = getElements();

    if (Object.keys(elements).length === 0) return;

    setupCountries();
    initEventListeners();
  }

  return {
    init
  }
})()

export default CustomerAddresses
