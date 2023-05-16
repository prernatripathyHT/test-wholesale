
const initCheckoutScripts = (function($){
  const settings = {
    shippingMethodSection: ".section--shipping-method",
    sectionHeader: "#main-header",
    shippingLabelSmallText: ".radio__label .small-text",
    extraShippingMessage: ".js-extra-shipping-message"
  }

  const generateShippingMessageHTML = function(){
    return `
      <p class="js-extra-shipping-message">
        All PO Box and Military addresses will ship via UPS SurePost.
        <a href="https://www.ups.com/assets/resources/webcontent/en_US/SurePost_Terms.pdf" target="_blank" rel="noreferrer">Learn more.</a>
      </p>
    `
  }

  const addShippingMessage = function(){
    if (!$(settings.extraShippingMessage).length) {
      let $shippingHeader = $(settings.shippingMethodSection).find(settings.sectionHeader);
      let messageHTML = generateShippingMessageHTML()
      $(messageHTML).insertAfter($shippingHeader)
    }
  }

  const updateShippingRateDeliveryTimes = function(){
    let $shippingLabelDeliveryTimes = $(settings.shippingMethodSection).find(settings.shippingLabelSmallText)

    $shippingLabelDeliveryTimes.each(function(index, el){
      let $el = $(el);
      let text = $el.text()

      if (text.match(\/d\)) {
        $el.text(text + " once shipped")
      }
    })
  }


  const handlePageChangeEvents = function(){
    let { step } = Shopify.Checkout

    switch (step) {
      case 'shipping_method':

        addShippingMessage()
        updateShippingRateDeliveryTimes()
        break;
    }
  }

  $(document).on('page:load page:change', handlePageChangeEvents);

})(Checkout.$)
