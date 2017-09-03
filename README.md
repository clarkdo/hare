# ![Logo](http://clarkdo.github.io/public/img/hare-logo-blue.svg) Application boilerplate based on Vue.js 2.x, Koa 2.x, Element-UI and Nuxt.js

[![Max OSX and Linux](https://travis-ci.org/clarkdo/hare.svg?branch=master)](https://travis-ci.org/clarkdo/hare)
[![Windows](https://ci.appveyor.com/api/projects/status/16eua6xnlnwxqomp?svg=true)](https://ci.appveyor.com/project/clarkdo/hare)
[![Vulnerabilities](https://snyk.io/test/github/clarkdo/hare/badge.svg)](https://snyk.io/test/github/clarkdo/hare)
[![Issues](https://img.shields.io/github/issues/clarkdo/hare.svg)](https://github.com/clarkdo/hare/issues)
[![Stars](https://img.shields.io/github/stars/clarkdo/hare.svg)](https://github.com/clarkdo/hare/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/clarkdo/hare/master/LICENSE)

## Installation

``` bash
$ git clone git@github.com:clarkdo/hare.git
$ cd hare
# install dependencies
$ yarn
```

## Usage

### Development

``` bash
# serve with hot reloading at localhost:3000
$ yarn dev
```

Go to [http://localhost:3000](http://localhost:3000)

### Testing

``` bash
# configure ESLint as a tool to keep codes clean
$ yarn lint
# use ava as testing framework, mixed with jsdom
$ yarn test
```

### Production

``` bash
# build for production and launch the server
$ yarn build
$ yarn start
```

### Generate

``` bash
# generate a static project
$ yarn generate
```

### Analyze

``` bash
# build and launch the bundle analyze
$ yarn analyze
```

### Use PM

#### Further more features refer: [PM2](https://github.com/Unitech/pm2)

``` bash
# install pm2 globally
$ yarn global add pm2
# launch development server
$ yarn dev:pm2
# launch production server
$ yarn start:pm2
# Display all processes status
$ pm2 ls
# Show all information about app
$ pm2 show hare
# Display memory and cpu usage of each app
$ pm2 monit
# Display logs
$ pm2 logs
# Stop
$ pm2 stop hare
# Kill and delete
$ pm2 delete hare
```

### Docker Dev

``` bash
# build image
$ docker build -t hare-dev -f Dockerfile.dev ./
$ docker run -d -p 8888:3000 -e HOST=0.0.0.0 hare-dev
```

### Docker Production

``` bash
# build bundle
$ export NODE_ENV=''
$ yarn
$ yarn build
# install production dependencies (remove devDependencies)
$ yarn --prod
# build image
$ docker build -t hare-prod -f Dockerfile ./
$ docker run -d -p 8889:3000 -e HOST=0.0.0.0 hare-prod
```

Go to [http://localhost:8888](http://localhost:8888)

## Documentation

Vue.js documentation: [https://vuejs.org/](https://vuejs.org/)

Nuxt.js documentation: [https://nuxtjs.org](https://nuxtjs.org)

Element-UI documentation: [http://element.eleme.io](http://element.eleme.io/#/en-US)

Koa documentation: [https://github.com/koajs/koa](https://github.com/koajs/koa)
