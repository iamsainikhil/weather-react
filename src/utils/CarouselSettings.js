const buttonStyle = {
  color: '#000',
  background: 'transparent',
  fontSize: '16px'
}
// modify carousel settings for timeframe and day components
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
    prevButtonText: '<',
    nextButtonText: '>',
    prevButtonStyle: {
      ...buttonStyle,
      display: type === 'favorite' ? 'none' : 'block'
    },
    nextButtonStyle: {
      ...buttonStyle,
      display: type === 'favorite' ? 'none' : 'block'
    },
    pagingDotsStyle: {
      fill: type === 'favorite' ? '#A1A6B4' : 'none',
      display: type === 'favorite' ? 'flex' : 'none',
      position: 'relative',
      top: '40px',
      margin: '10px 5px'
    }
  }
})

export default CarouselSettings
