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

- **[Featured On](https://github.com/iamsainikhil/weather-react#-featured-on)**

- **[Acknowledgements](https://github.com/iamsainikhil/weather-react#-acknowledgements)**

# 🚀 Getting Started

> **Note**: Dark Sky had been bought by Apple and is no longer accepting new signups. For more information, read this news **[here](https://blog.darksky.net/)**.

**When you have a Dark Sky Account, follow the instructions described in-detail **[here](https://www.notion.so/reactweather/Weather-React-Local-Setup-Branch-561fe5fa6cc546f588b93390de63ce21)** or below to set up the project locally on your machine.**

## Basic Setup

- Clone the `local-setup` branch in the repository

```bash

git clone -b local-setup https://github.com/iamsainikhil/weather-react.git

```

- Install the packages using the command `npm install`

## **Environment File**

- Create a `.env` file in the root directory of the project. Add the following properties in it:

```bash

REACT_APP_DARKSKY_API_KEY=<your Dark Sky API Key>

```

_That's it! You can run the below available scripts to get up and running on the localhost. If you want to dive deeper into the codebase, I recommend you to check the architecture documentation to customize this application as your wish._

> _These instructions are very important to avoid the **Blank Page** issue when running the application on `http://localhost:3000`._

## Available Scripts

In the project directory, you can run:

`npm run start`

Runs the app in the development mode.Open `[http://localhost:3000](http://localhost:3000/)` to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

`npm test`

Launches the test runner in the interactive watch mode. See the section about

[**running tests**](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

`npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

See the section about [**deployment**](https://facebook.github.io/create-react-app/docs/deployment) for more information.

`npm run eject`

**Note**: _this is a one-way operation. Once you eject, you can’t go back!_

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However, we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## **Learn More**

You can learn more in the [**Create React App documentation**](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [**React documentation**](https://reactjs.org/).

### **_Code Splitting_**

For more info, check here: [**https://facebook.github.io/create-react-app/docs/code-splitting**](https://facebook.github.io/create-react-app/docs/code-splitting)

### **_Analyzing the Bundle Size_**

For more info, check here: **[https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)**

### **_Making a Progressive Web App_**

For more info, check here: [**https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app**](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### **_Advanced Configuration_**

For more info, check here: [**https://facebook.github.io/create-react-app/docs/advanced-configuration**](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### **_Deployment_**

For more info, check here: **[https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)**

### **`npm run build` _fails to minify_**

For more info, check here: [**https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify**](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## 💡 Motivation

I started learning React in February 2020 and thought of putting knowledge into reality by developing an application. I am interested in building an application that is API resource-intensive to challenge me writing efficient code keeping performance, UX, maintainability, scalability, and optimization in mind.

There are so many weather-related applications out in the wild. So, the goal is to create a UI that is beautiful yet simple and effective for any user to use.

## 💻 Technologies

- This application is created with **[Create React App](https://create-react-app.dev/)**

- **[React](https://reactjs.org/)** _(v16.12)_

- Styling syntax was written in SCSS and using **[TailwindCSS](https://tailwindcss.com/)**

- There are bunch of scripts that run when you start application to compile `scss` to `css`

## 😢 Challenges

- First, I used the OpenWeatherMap API to fetch the weather forecast data. However, 5-day forecast data was not reliable i.e. _when a user on 14th March 2020 at 7:00 PM EST tries to fetch 5-day forecast data, will get forecast data starting 15th March 2020 at 12:00 AM UTC._ This posed a big problem of categorizing 5-day data into individual days since the data is not always consistent and is based on UTC and not based on the user timezone. Finally, I switched to Dark Sky API which is more reliable and provides a robust data model. However, there is a limit of `1000` calls/day.

- Dark Sky API needs a proxy server to send and receive a response which was easy in the development stage using a browser extension like **[this](https://chrome.google.com/webstore/detail/moesif-orign-cors-changer/digfbfaphojjndkpccljibejjbppifbc)** to enable CORS in the browser. However, I can't ask every user to install this extension in their browser to check the weather forecast. So, I overcome this issue temporarily for now using the `cors-anywhere` library which you can get more info by checking **[here](https://github.com/Rob--W/cors-anywhere)**.

## 📖 Architecture

![Weather React Application Architecture](./Weather_React_Architecture.svg)

### ❕ **Detailed Architecture Documentation will be added soon...**

## 🏎 Roadmap

- [ ] Build a proxy server using Express for Dark Sky API requests

- [ ] Unit Testing

- [ ] Publish this project as an NPM package that can be consumed elsewhere.

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
