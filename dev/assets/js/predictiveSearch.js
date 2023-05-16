import $ from 'jquery';
import { elementsExist } from './utilities.js';

const PredictiveSearch = (function(){
  const cache = {
    $searchBar: $(".js-predictive-search-bar"),
    $searchForm: $('.js-predictive-search-form')
  }

  const settings = {
    searchURL: "/search/?q=<QUERY>",
    searchResults: ".js-search-results"
  }

  const init = function(){
    if (!elementsExist([cache.$searchBar])) return

    initializeEventListeners()
  }

  const initializeEventListeners = function(){
    cache.$searchBar.on('key').on('keyup', handleSearchTerms);
  }

  const getSearchURL = function(value){
    let types = []
    let formData = cache.$searchForm.data()

    if (formData.showProducts) {
      types.push('product')
    }

    if (formData.showArticles) {
      types.push('article')
    }

    if (formData.showPages) {
      types.push('page')
    }

    return `${settings.searchURL.replace("<QUERY>", value)}&type=${types.join(',')}&limit=12&sections=predictive-search`
  }

  const handleSearchTerms = function(e){
    var code = e.code;
    if (code === "Enter") {
      // Don't submit while someone's typing
      e.preventDefault();
    }

    var $this = $(this);
    var value = $this.val();

    if (value) {
      getSearchResults(value);
    } else {
      resetSearchResults();
    }
  }

  const resetSearchResults = function(){
    $(settings.searchResults).hide()
  }

  const getSearchResults = function(value){
    var url = getSearchURL(value)

    var params = {
      url: url,
      dataType: "json",
      success: function(response){
        renderPredictiveSearch(response, value);
      },
      error: console.warn
    }

    $.ajax(params);
  }

  var renderPredictiveSearch = function(response, query){
    if (response['predictive-search']) {
      let $newResults = $(response['predictive-search']).find(settings.searchResults);
      $(settings.searchResults).replaceWith($newResults)
    }
  }

  return {
    init
  }
})()

export default PredictiveSearch;
