import $ from 'jquery';

const CustomSelect = function($customSelectContainer){
  const cache = {
    $selectTrigger: $customSelectContainer.find(".js-custom-select-trigger"),
    $selectTriggerText: $customSelectContainer.find(".js-select-trigger-text"),
    $customSelectOptions: $customSelectContainer.find(".js-custom-select-options"),
    $selectOption: $customSelectContainer.find(".js-option-select")
  }

  let settings = {
    activeClass: "active"
  }

  const initEventListeners = function(){
    cache.$selectTrigger.on('click', toggleCustomSelect)
    cache.$selectOption.on('click', setActiveOption)
  }

  const toggleCustomSelect = function(e){
    e.preventDefault()
    e.stopPropagation()

    let $this = $(this);
    cache.$selectTrigger.toggleClass('active')
    cache.$customSelectOptions.toggleClass('hidden')
  }

  const closeCustomSelect = function(){
    cache.$customSelectOptions.addClass('hidden')
    cache.$selectTrigger.removeClass('active')
  }

  const setOptionText = function(value){
    cache.$selectTriggerText.text(value)
  }

  const setActiveOption = function(e){
    e.preventDefault()
    e.stopPropagation()

    let $this = $(this)
    let value = $this.data('value')
    let text = $this.text().trim()
    let target = $this.data('target')
    
    let targetNode = document.getElementById(target)

    let $targetSelect = $(targetNode)

    $targetSelect.val(value).change()

    cache.$selectOption.removeClass(settings.activeClass)

    $this.addClass(settings.activeClass)

    setOptionText(text)

    closeCustomSelect()
  }

  initEventListeners()
}

export default CustomSelect;
