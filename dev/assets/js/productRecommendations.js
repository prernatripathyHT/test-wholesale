import $ from 'jquery';
import { elementsExist, isTablet } from './utilities.js';

const ProductRecommendations = (function(){
  const selectors = {
    recommendedProductContainer: ".js-recommended-products"
  }

  const baseURL = "/recommendations/products?product_id=<product-id>&section_id=related-products&limit=<limit>"

  const init = function(){
    if (!elementsExist([selectors.recommendedProductContainer])) return;
    getProductRecommendations()
  }

  const getProductRecommendations = function(){
    let $recommendedProductContainer = $(selectors.recommendedProductContainer)

    let { productId, limit, mobileLimit } = $recommendedProductContainer.data()

    if (isTablet()) {
      limit = mobileLimit
    }

    let url = baseURL.replace("<product-id>", productId).replace("<limit>", limit);

    $.ajax(url)
      .then(html => {
        let $html = $(html);
        $recommendedProductContainer.replaceWith($html);

        $html.find('.animate')
          .addClass('animate-animated')
          .removeClass('animate');
      })
  }

  return {
    init
  }
})()

export default ProductRecommendations
