# kilogreer-front

A Vue.js project

## Build Setup

Add `config/prod.env.js` like below.

```javascript
module.exports = {
  NODE_ENV: '"production"',
  VUE_APP_API_HOST: '"foo"'
}
```

Add `config/dev.env.js` like below.

```javascript
module.exports = {
  NODE_ENV: '"development"',
  VUE_APP_API_HOST: '"foo"'
}
```

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

``` bash
# install firebase-tools
npm install -g firebase-tools

# login to firebase
firebase login --interactive

# deploy
firebase deploy --only hosting
```
