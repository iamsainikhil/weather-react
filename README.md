# Table of Contents

- **[Getting Started](https://github.com/iamsainikhil/weather-react#-getting-started)**
- **[Motivation](https://github.com/iamsainikhil/weather-react#-motivation)**
- **[Technologies](https://github.com/iamsainikhil/weather-react#-technologies)**
- **[Challenges](https://github.com/iamsainikhil/weather-react#-challenges)**
- **[Architecture](https://github.com/iamsainikhil/weather-react#-architecture)**
- **[Roadmap](https://github.com/iamsainikhil/weather-react#-roadmap)**
- **[Contribution](https://github.com/iamsainikhil/weather-react#-contribution)**
- **[License](https://github.com/iamsainikhil/weather-react#-license)**
- **[Contact](https://github.com/iamsainikhil/weather-react#-contact)**
- **[Acknowledgements](https://github.com/iamsainikhil/weather-react#-acknowledgements)**
- **[Featured On](https://github.com/iamsainikhil/weather-react#-featured-on)**

# 🚀 Getting Started

**\*Follow the instructions described in-detail **[here](https://www.notion.so/reactweather/Weather-React-Repo-Setup-Instructions-1a789c2e47f545ceb87062d171a66b6b)** or below to set up the project locally on your machine.\***

## Basic Setup

- Clone the repository

  git clone https://github.com/iamsainikhil/weather-react.git

- Install the packages using the command `npm install`

## **Environment File**

- Create a `.env` file in the root directory of the project. Add the following properties in it:

  REACT_APP_DARKSKY_API_KEY=<your Dark Sky API Key>
  REACT_APP_SENTRY_DSN=<your Sentry APP DSN>
  REACT_APP_LOGROCKET_PROJECT_ID=<your LogRocket Project ID>
  REACT_APP_GA_ID=<your Google Analytics Project ID>

- Obtain the API tokens/keys mentioned in the `.env` by following below steps:

  - Get API tokens:
    - You can obtain a Dark Sky API key [\*\*here](https://darksky.net/dev)\*\* (Required)
    - You can obtain a Sentry DSN [\*\*here](https://sentry.io/signup/)\*\* (Optional)
    - You can create a project on LogRocket and obtain it's ID [**here**](https://docs.logrocket.com/docs/quickstart) (Optional)
    - You can create a project on Google Analytics and obtain it's ID [\*\*here](https://support.google.com/analytics/answer/1042508?hl=en)\*\* (Optional)

  ### **Optional API Tokens**

  **Note**: _It's completely optional to have these API's in your project. If you don't want to use it, just follow the below steps for each individual API_

  - **_Sentry_**

    - Remove `@sentry/broser` package by executing the following command:

            npm uninstall --save @sentry/browser

    - Remove following lines from `index.js`

            import * as Sentry from '@sentry/browser'
            const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN

            Sentry.init({dsn: `${SENTRY_DSN}`})

            // LogRocket and Sentry Integration
            LogRocket.getSessionURL(sessionURL => {
              Sentry.configureScope(scope => {
                scope.setExtra('sessionURL', sessionURL)
              })
            })

    - Remove instances of `Sentry.captureException` and `import * as Sentry from '@sentry/browser'` in the following files:
      - AutoCompleteContainer.js
      - ErrorBoundaryContainer.js
      - FavoritesContainer.js
      - WeatherContainer.js
      - AddressContext.js
      - FetchWeatherData.js
      - LatLongUrbanArea.js

  - **_LogRocket_**

    - Remove `logrocket` & `logrocket-react` package by executing the following command:

            npm uninstall --save logrocket logrocket-react

    - Remove following lines from `index.js`

            import LogRocket from 'logrocket'
            import setupLogRocketReact from 'logrocket-react'

            if (process.env.NODE_ENV !== 'development') {
              const LOGROCKET_PROJECT_ID = process.env.REACT_APP_LOGROCKET_PROJECT_ID
              LogRocket.init(`${LOGROCKET_PROJECT_ID}`)
              setupLogRocketReact(LogRocket)

              // LogRocket and Sentry
              LogRocket.getSessionURL(sessionURL => {
                Sentry.configureScope(scope => {
                  scope.setExtra('sessionURL', sessionURL)
                })
              })
            }

  - **_Google Analytics_**

    - Remove `react-ga` package by executing the following command:

            npm uninstall --save react-ga

    - Remove following lines from `App.js`

            import ReactGA from 'react-ga'
            import {Timing} from './utils/ReactAnalytics'

            const GA_ID = process.env.REACT_APP_GA_ID

            // reactGA initialization
            ReactGA.initialize(`${GA_ID}`)

    Remove `ReactAnalytics.js` utility file from `src/utils`

    - Remove instances of `Event` function imports in the following files:
      - FooterComponent.js
      - InfoComponent.js
      - InfoDetailComponent.js
      - AutoCompleteContainer.js
      - ThemeContext.js
      - MiscTrackEvents.js
    - Remove Google Analytics tracking code in `public/index.html`

        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-85329633-7"
        ></script>
        <script>
          window.dataLayer = window.dataLayer || []
          function gtag() {
            dataLayer.push(arguments)
          }
          gtag('js', new Date())
        
          gtag('config', 'UA-85329633-7')
        </script>

    Note: _The above id is the real GA Id and filters were set up on the project to collect analytics from the main application website only. That's the reason, it is not masked or removed from index.html_

## Available Scripts

In the project directory, you can run:

`npm run start`

Runs the app in the development mode.Open `[http://localhost:3000](http://localhost:3000/)` to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

`npm test`

Launches the test runner in the interactive watch mode.See the section about

[**running tests**](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

`npm run build`

Builds the app for production to the `build` folder.It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.Your app is ready to be deployed!

See the section about [**deployment**](https://facebook.github.io/create-react-app/docs/deployment) for more information.

`npm run eject`

**Note**: _this is a one-way operation. Once you eject, you can’t go back!_

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However, we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## **Learn More**

You can learn more in the [**Create React App documentation**](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [**React documentation**](https://reactjs.org/).

### **_Code Splitting_**

For more info, check here: [**https://facebook.github.io/create-react-app/docs/code-splitting**](https://facebook.github.io/create-react-app/docs/code-splitting)

### **_Analyzing the Bundle Size_**

For more info, check here: **[https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)**

### **_Making a Progressive Web App_**

For more info, check here: [**https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app**](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### **_Advanced Configuration_**

For more info, check here: [**https://facebook.github.io/create-react-app/docs/advanced-configuration**](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### **_Deployment_**

For more info, check here: **[https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)**

### **`npm run build` *fails to minify***

For more info, check here: [**https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify**](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

> _These instructions are very important to avoid the **Blank Page** issue when running the application on `http://localhost:3000`._

## 💡 Motivation

I started learning React in February 2020 and thought of putting knowledge into reality by developing an application. I am interested in building an application that API resource-intensive to challenge writing efficient code keeping performance, UX, maintainability, scalability, and optimization.

There are so many weather-related applications out in the wild. So, the goal is to create a UI that is beautiful yet simple and effective for any user to use.

## 💻 Technologies

- This application is created with **[Create React App](https://create-react-app.dev/)**
- **[React](https://reactjs.org/)** _(v16.12)_
- Styling syntax was written in SCSS and using **[TailwindCSS](https://tailwindcss.com/)**
- There are bunch of scripts that run when you start application to compile `scss` to `css`

## 😢 Challenges

- First, I used the OpenWeatherMap API to fetch the weather forecast data. However, 5-day forecast data was not reliable i.e. _when a user on 14th March 2020 at 7:00 PM EST tries to fetch 5-day forecast data will get day forecast data starting 15th March 2020 at 12:00 AM UTC._ This posed a big problem of categorizing 5-day data into individual days since the data is not always consistent and is based on UTC and not the user timezone. Finally, I switched to Dark Sky API which is more reliable and provides a robust data model. However, there is a limit of `1000` calls/day.
- Dark Sky API needs a proxy server to send and receive a response which was easy in the development stage using a browser extension like **[this](https://chrome.google.com/webstore/detail/moesif-orign-cors-changer/digfbfaphojjndkpccljibejjbppifbc)** to enable CORS in the browser. However, I can't every user to install this extension in their browser to check the weather forecast. So, I overcome this issue temporarily for now using the `cors-anywhere` library which you can get more info by checking **[here](https://github.com/Rob--W/cors-anywhere)**.

## 📖 Architecture

### ❕ **Application Architecture Documentation will be added soon...**

## 🏎 Roadmap

- [ ] Build a proxy server using Express for Dark Sky API requests
- [ ] Unit Testing
- [ ] Refactoring Code
- [ ] Update Favorites UI
- [ ] Add documentation for components using **Storybook**
- [ ] Develop desktop application using **Electron**
- [ ] Develop Android and iOS app using **React Native**

## 🙌 Contribution

- Open pull request with improvements.
- If you have any new idea, check the **[feature request](https://github.com/iamsainikhil/weather-react/blob/master/.github/ISSUE_TEMPLATE/feature_request.md)** template to create a request.
- If you found any issue or a bug, check the **[bug report](https://github.com/iamsainikhil/weather-react/blob/master/.github/ISSUE_TEMPLATE/bug_report.md)** template to create a report.

## 📃 License

Have a look at the **[license file](https://github.com/iamsainikhil/weather-react/blob/master/LICENSE)** for details

## 📧 Contact

Whether you’d like to discuss a project, ask me about my website or simply say “hello”, I’d love to hear from you.

Email: **[contact@iamsainikhil.com](mailto:contact@iamsainikhil.com)**

## 😍 Featured On

- **[React.js Examples](https://reactjsexample.com/a-nice-weather-app-built-using-react/)**
- **[Morioh](https://morioh.com/p/fc5f51d76847)**

## 🙏 Acknowledgements

See the **[Acknowledgements](https://github.com/iamsainikhil/weather-react/wiki/Acknowledgements)** page on the wiki for a list of Acknowledgements for Weather React codebase.
