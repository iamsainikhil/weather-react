// modify carousel settings for timeframe, day, and favorites components
/**
 * @param {String} type
 * time or day or favorite
 */
const CarouselSettings = type => ({
  width: '100%',
  slidesToShow: type === 'time' ? 3 : 1,
  slidesToScroll: type === 'time' ? 3 : 1,
  initialSlideHeight: type === 'time' ? 100 : 200,
  slideWidth: type === 'time' ? 0.95 : 1.0,
  speed: 1000,
  easing: 'easeCircleOut',
  edgeEasing: 'easeCircleOut',
  defaultControlsConfig: {
    prevButtonStyle: {
      display: 'none'
    },
    nextButtonStyle: {
      display: 'none'
    },
    pagingDotsStyle: {
      fill: '#A1A6B4',
      display: 'flex',
      position: 'relative',
      top: type === 'day' ? '25px' : '35px',
      margin: '10px 5px'
    }
  }
})

export default CarouselSettings
