import { elementsExist } from './utilities'

const FilterOptionList = (function(){
  let baseUrl = location.pathname
  let baseFilterURL = "filter.p.m.filters."
  // .roast-level=
  let sortUrl = "sort_by="
  let sectionRenderingURL = "sections=collection-grid"
  let sortOption = ""
  let activeFilters = []

  const settings = {
    sectionWrapper: '.js-filter-section',
    filterWrapper: '[data-filter-wrapper]',
    filterContainer: '.js-filter-container',
    filterTrigger: '.js-trigger-filter-container',
    filterOption: '.js-collection-filter-option',
    removeFilter: '.js-remove-filter',
    activeFilterContainer: '.js-active-filter-container',
    filterCount: ".js-active-filter-count",
    filterTitle: ".js-active-filter-title",
    collectionList: ".js-collection-list",
    sortOptionButton: ".js-collection-sort-option",
    clearFiltersBtn: ".js-clear-filters"
  }

  const init = function(){
    if (!elementsExist([ settings.filterTrigger, settings.filterContainer ])) return;

    initializeEventListeners()

    let sectionData = $(settings.sectionWrapper).data();

    if (sectionData && sectionData.filterUrl) {
      baseFilterURL = sectionData.filterUrl
      sectionRenderingURL = sectionData.section
    }
  }

  const initializeEventListeners = function(){
    $(settings.filterTrigger).on('click', toggleFilterContainer)
    $(settings.filterOption).on('click', handleCollectionFilter)
    $(document).on('click', handleOffClick)
    $('.js-trigger-filter-close').on('click', handleFilterClose)

    $(document).on('click', settings.removeFilter, handleCollectionFilter)
    $(settings.sortOptionButton).on('click', handleCollectionSort)
    $(settings.clearFiltersBtn).on('click', clearFilters)
  }

  const toggleFilterContainer = function(e){
    e.stopPropagation()

    let $this = $(this);
    let target = $this.data('target')

    let $parentContainer = $this.parents(settings.filterContainer).eq(0)

    let $targetContainer = $parentContainer.find(`${settings.filterContainer}[data-target="${target}"]`)
    let $otherContainers = $parentContainer.find(settings.filterContainer).not($targetContainer)
    let $otherTriggers = $parentContainer.find(settings.filterTrigger).not($this)

    if ($targetContainer.length) {
      $otherContainers.hide()
      $otherTriggers.removeClass('active')

      $this.toggleClass('active')
      $targetContainer.slideToggle(200, function(){
        if ($targetContainer.is(":visible")) {
          $('.js-trigger-filter-close-mobile').removeClass('hidden');
        } else {
          $('.js-trigger-filter-close-mobile').addClass('hidden');
        }
      })
    }
  }

  const handleOffClick = function(e){
    let $target = $(e.target);
    let targetHasFilterParents = $target.parents('.js-filter-container').length
    let targetHasActiveFilterParents = $target.parents('.js-remove-filter').length

    if (!(targetHasFilterParents ||
          $target.hasClass('js-filter-container') ||
          targetHasActiveFilterParents ||
          $target.hasClass('js-remove-filter'))
        ) {
      $(settings.filterContainer + '[data-target]').slideUp(200)
      $(settings.filterTrigger).removeClass('active')

      $('.js-trigger-filter-close-mobile').addClass('hidden');
    }
  }

  const handleFilterClose = function(){
    $(settings.filterContainer + '[data-target]').slideUp(200)
    $(settings.filterTrigger).removeClass('active')
    $('.js-trigger-filter-close-mobile').addClass('hidden');
  }

  const handleCollectionSort = function(e){
    let $this = $(this);

    if (!$this.hasClass('active')) {
      sortOption = $this.data('value')

      $this.addClass('active')
      $(settings.sortOptionButton).not($this).removeClass('active')

      getFilteredSection()
    }
  }

  /**
  * Adds or Removes filterValue from activeFilters array
  * @param filterValue [String]
  */
  const addOrRemoveFilterValue = function(filter){
    let filterInArray = activeFilters.find(currentFilter => currentFilter.value === filter.value);

    if (filterInArray) {
      // Removes active filter from filter array
      activeFilters = activeFilters.filter(currentFilter => currentFilter.value !== filter.value);
    } else {
      // Adds active filter to filter array
      activeFilters.push(filter)
    }
  }

  /**
  * Renders a list of <li> items to the activeFilterContainer
  */
  const renderActiveFilterList = function(){
    let filterListHTML = ""

    $(settings.filterOption).removeClass('active')

    activeFilters.forEach(filter => {
      $(settings.filterOption).closest(`[data-value="${filter.value}"]`).addClass('active')

      let filterValueHTML = `
        <li class="my-1 flex items-center">
          <button class="js-remove-filter btn-transparent filter--trigger-btn active text-sm uppercase flex items-center py-1 px-3" data-key="${filter.name}" data-value="${filter.value}">
            <span class="mr-2">${filter.value}</span>

            <svg class="w-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.8314 5.85215L13.4785 0.205025C13.7519 -0.0683413 14.1951 -0.0683425 14.4685 0.205024L15.5999 1.3364C15.8732 1.60976 15.8732 2.05298 15.5999 2.32635L9.95272 7.97347L15.4785 13.4993C15.7519 13.7727 15.7519 14.2159 15.4785 14.4892L14.3472 15.6206C14.0738 15.894 13.6306 15.894 13.3572 15.6206L7.8314 10.0948L2.44767 15.4785C2.1743 15.7519 1.73108 15.7519 1.45772 15.4785L0.326345 14.3472C0.0529781 14.0738 0.0529788 13.6306 0.326346 13.3572L5.71008 7.97347L0.205026 2.46842C-0.0683414 2.19505 -0.0683419 1.75184 0.205025 1.47847L1.3364 0.347099C1.60976 0.0737322 2.05298 0.0737327 2.32635 0.3471L7.8314 5.85215Z" fill="#05043D"/>
            </svg>
          </button>
        </li>
      `

      filterListHTML += filterValueHTML;
    })

    $(settings.activeFilterContainer).html(filterListHTML)
  }

  const updateFilterCount = function(){
    $(settings.filterCount).text(activeFilters.length);

    activeFilters.length > 0
      ? $(settings.filterTitle).removeClass('hidden')
      : $(settings.filterTitle).addClass('hidden');
  }

  const getBlogFilterURL = function(){
    let filterParams = ""
    let url = ""

    activeFilters.forEach(filter => {
      filterParams += (filterParams === "" ? filter.value : ("+" + filter.value))
    })

    if (filterParams) {
      url = baseUrl + baseFilterURL + filterParams + "/?" + sectionRenderingURL;
    } else {
      url = baseUrl + "/?" + sectionRenderingURL;
    }

    return url;
  }

  const getCollectionFilterURL = function(){
    let filterParams = ""
    let url = ""

    activeFilters.forEach(filter => {
      if (!filterParams) {
        filterParams += ("?" + baseFilterURL + filter.name.toLowerCase() + "=" + filter.value.toLowerCase());
      } else {
        filterParams += ("&" + baseFilterURL + filter.name.toLowerCase() + "=" + filter.value.toLowerCase());
      }
    })

    if (filterParams) {
      url = baseUrl + filterParams + "&sort_by=" + sortOption + "&" + sectionRenderingURL;
    } else {
      url = baseUrl + "?sort_by=" + sortOption + "&" + sectionRenderingURL;
    }

    return url;
  }

  const getFilteredSection = function(){
    let url = "";
    let section = sectionRenderingURL.replace("sections=", "")

    if (baseUrl.includes('/blogs')) {
      url = getBlogFilterURL()
    } else {
      url = getCollectionFilterURL()
    }

    $.ajax(url)
      .then(response => {

        let $htmlResponse = $(response[section])

        let $newCollectionList = $htmlResponse.find(settings.collectionList).eq(0)
        $(settings.collectionList).eq(0).replaceWith($newCollectionList)
      })
  }

  const clearFilters = function(e) {
    activeFilters = []

    renderActiveFilterList()
    updateFilterCount()
    getFilteredSection()
  }

  const handleCollectionFilter = function(e){
    e.preventDefault();

    let filterValue = $(this).data('value');
    let filterGroup = $(this).data('key')

    let filter = {
      name: filterGroup,
      value: filterValue
    }

    addOrRemoveFilterValue(filter)
    renderActiveFilterList()
    updateFilterCount()
    getFilteredSection()
  }

  return { init }
})()


export default FilterOptionList
