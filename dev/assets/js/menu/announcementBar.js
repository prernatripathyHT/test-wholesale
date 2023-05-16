import $ from 'jquery';
import { elementsExist } from '../utilities.js';

const AnnouncementBar = function(selectors){
  const cache = {
    $announcementBar: $(selectors.announcementBar),
    $announcementCloseBtn: $(selectors.announcementClose)
  }

  const init = function(){
    if (!elementsExist([ cache.$announcementBar, cache.$announcementCloseBtn])) return;

    checkClosedSession()
    cache.$announcementCloseBtn.on('click', closeAnnouncementBar);
  }

  const checkClosedSession = function(){
    let closedBar = sessionStorage.getItem('announcementClosed')

    if (closedBar) {
      closeAnnouncementBar()
    } else {
      showAnnouncementBar()
    }
  }

  const showAnnouncementBar = function(){
    cache.$announcementBar.slideDown(200)
  }

  const closeAnnouncementBar = function(){
    sessionStorage.setItem('announcementClosed', true)
    cache.$announcementBar.slideUp(200)
  }

  init()
}

export default AnnouncementBar
