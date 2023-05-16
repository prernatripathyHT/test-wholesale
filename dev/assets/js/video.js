import { elementsExist } from './utilities.js'

const Video = (function(){
  const selectors = {
    toggleVideoBtn: '.js-toggle-video',
    videoWrapper: '.js-video-wrapper',
    videoIFrame: ".js-video"
  }

  const init = function(){
    if (!elementsExist([ selectors.videoWrapper, selectors.toggleVideoBtn ])) return;

    initializeEventListeners()
  }

  const initializeEventListeners = function(){
    $(selectors.toggleVideoBtn).on('click', toggleAndAutoplayVideo)
  }

  const toggleAndAutoplayVideo = function(e){
    let $this = $(this);
    let { videoId } = $this.data()

    if (videoId) {
      let $videoWrapper = $(selectors.videoWrapper).closest(`[data-video-id="${videoId}"]`);
      let $iFrameVideo = $videoWrapper.find(selectors.videoIFrame);

      $this.fadeOut(200)
      $videoWrapper.removeClass('hidden');
      if (Vimeo && Vimeo.Player) {
        let player = new Vimeo.Player($iFrameVideo[0])

        player.play()
      }
    }
  }

  return {
    init
  }
})()

export default Video
