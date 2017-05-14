<p align="center"><img height="300" src="http://clarkdo.github.io/public/img/hare-logo-blue.svg"></p>
<p align="center">
  <a href="https://travis-ci.org/clarkdo/hare" target="_blank"><img src="https://travis-ci.org/clarkdo/hare.svg?branch=master" alt="Build Status"></a>
  <a href="https://ci.appveyor.com/project/clarkdo/hare" target="_blank"><img src="https://ci.appveyor.com/api/projects/status/16eua6xnlnwxqomp?svg=true" alt="Build Status"></a>
  <a href="https://snyk.io/test/github/clarkdo/hare/fb062ca638eb7aba61d857b21580fd8ad1a0346d"><img src="https://snyk.io/test/github/clarkdo/hare/fb062ca638eb7aba61d857b21580fd8ad1a0346d/badge.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/clarkdo/hare/fb062ca638eb7aba61d857b21580fd8ad1a0346d" style="max-width:100%;"></a>
  <a href="https://github.com/clarkdo/hare/issues"><img src="https://img.shields.io/github/issues/clarkdo/hare.svg" alt="Issues"></a>
  <a href="https://github.com/clarkdo/hare/stargazers"><img src="https://img.shields.io/github/stars/clarkdo/hare.svg" alt="Stars"></a>
  <a href="https://raw.githubusercontent.com/clarkdo/hare/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
</p>

# Application boilerplate based on Vue.js 2.x, Koa 2.x, Element-UI and Nuxt.js

## Installation

``` bash
$ git clone git@github.com:clarkdo/hare.git
$ cd hare
# install dependencies
$ yarn install
```

## Usage

### Development

``` bash
# serve with hot reloading at localhost:3000
$ yarn run dev
```

Go to [http://localhost:3000](http://localhost:3000)

### Testing

``` bash
# configure ESLint as a tool to keep codes clean
$ yarn run lint
# use ava as testing framework, mixed with jsdom
$ yarn run test
```

### Production

``` bash
# build for production and launch the server
$ yarn run build
$ yarn run start
```

### Generate

``` bash
# generate a static project
$ yarn run generate
```

### Analyze

``` bash
# build and launch the bundle analyze
$ yarn run analyze
```

Go to [http://localhost:8888](http://localhost:8888)

## Documentation

Vue.js documentation: [https://vuejs.org/](https://vuejs.org/)

Nuxt.js documentation: [https://nuxtjs.org](https://nuxtjs.org)

Element-UI docuementation: [http://element.eleme.io](http://element.eleme.io/#/en-US)

Koa documentation: [https://github.com/koajs/koa](https://github.com/koajs/koa)
