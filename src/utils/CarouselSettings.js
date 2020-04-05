// modify carousel settings for timeframe and favorites component
/**
 * time or favorite
 * @param {String} type
 * resolution can be mobile or tablet
 * @param {*} resolution
 */
const CarouselSettings = (type, resolution = 'mobile') => ({
  width: '100%',
  slidesToShow: type === 'time' ? (resolution === 'tablet' ? 8 : 3) : 1,
  slidesToScroll: type === 'time' ? (resolution === 'tablet' ? 8 : 3) : 1,
  initialSlideHeight: type === 'time' ? 100 : 200,
  slideWidth: type === 'time' ? (resolution === 'tablet' ? 1.0 : 0.95) : 1.0,
  speed: 1000,
  easing: 'easeSinInOut',
  defaultControlsConfig: {
    prevButtonStyle: {
      display: 'none',
    },
    nextButtonStyle: {
      display: 'none',
    },
    pagingDotsStyle: {
      fill: '#cfd9df',
      display: 'flex',
      position: 'relative',
      top: type === 'day' ? '25px' : '35px',
      margin: '10px 5px',
    },
  },
})

export default CarouselSettings
