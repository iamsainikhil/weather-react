import ReactGA from 'react-ga'

export const Timing = ({variable, value, label}) => {
  ReactGA.timing({
    category: 'Load Performance',
    variable,
    value,
    label
  })
}

export const Event = ({category, action, label}) => {
  ReactGA.event({
    category,
    action,
    label
  })
}

export const pageView = ({path}) => {
  ReactGA.pageView(path)
}
