/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _consts = __webpack_require__(21);

var _consts2 = _interopRequireDefault(_consts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || '3000';

exports.default = Object.freeze(_extends({
  HOST,
  PORT,
  LB_ADDR: process.env.LB_ADDR || `http://${HOST}:${PORT}/hpi`
}, _consts2.default));

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _koa = __webpack_require__(1);

var _koa2 = _interopRequireDefault(_koa);

var _nuxt = __webpack_require__(5);

var _axios = __webpack_require__(2);

var _axios2 = _interopRequireDefault(_axios);

var _bunyan = __webpack_require__(6);

var _bunyan2 = _interopRequireDefault(_bunyan);

var _mkdirp = __webpack_require__(7);

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _koaBunyan = __webpack_require__(8);

var _koaBunyan2 = _interopRequireDefault(_koaBunyan);

var _koaBunyanLogger = __webpack_require__(9);

var _koaBunyanLogger2 = _interopRequireDefault(_koaBunyanLogger);

var _koaConnect = __webpack_require__(10);

var _koaConnect2 = _interopRequireDefault(_koaConnect);

var _koaBody = __webpack_require__(11);

var _koaBody2 = _interopRequireDefault(_koaBody);

var _koaCompose = __webpack_require__(12);

var _koaCompose2 = _interopRequireDefault(_koaCompose);

var _koaCompress = __webpack_require__(13);

var _koaCompress2 = _interopRequireDefault(_koaCompress);

var _koaSession = __webpack_require__(14);

var _koaSession2 = _interopRequireDefault(_koaSession);

var _api = __webpack_require__(15);

var _api2 = _interopRequireDefault(_api);

var _consts = __webpack_require__(0);

var _consts2 = _interopRequireDefault(_consts);

var _nuxtConfig = __webpack_require__(24);

var _nuxtConfig2 = _interopRequireDefault(_nuxtConfig);

var _chalk = __webpack_require__(26);

var _chalk2 = _interopRequireDefault(_chalk);

var _debug = __webpack_require__(27);

var _debug2 = _interopRequireDefault(_debug);

var _koaProxies = __webpack_require__(28);

var _koaProxies2 = _interopRequireDefault(_koaProxies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Start nuxt.js
// session for flash messages
// middleware composer
async function start() {
  const isWin = /^win/.test(process.platform);
  const host = _consts2.default.HOST;
  const port = _consts2.default.PORT;
  const debug = (0, _debug2.default)('app');
  const app = new _koa2.default();

  app.keys = ['hare-server'];
  _nuxtConfig2.default.dev = !(app.env === 'production');
  _axios2.default.defaults.baseURL = `http://127.0.0.1:${port}`;

  // logging
  let logDir = process.env.LOG_DIR || (isWin ? 'C:\\\\log' : '/var/tmp/log');
  _mkdirp2.default.sync(logDir);
  logDir = logDir.replace(/(\\|\/)+$/, '') + (isWin ? '\\\\' : '/');

  const access = {
    type: 'rotating-file',
    path: `${logDir}hare-access.log`,
    level: _nuxtConfig2.default.dev ? 'debug' : 'info',
    period: '1d',
    count: 4
  };
  const error = {
    type: 'rotating-file',
    path: `${logDir}hare-error.log`,
    level: 'error',
    period: '1d',
    count: 4
  };
  const logger = _bunyan2.default.createLogger({
    name: 'hare',
    streams: [access, error]
  });
  app.use((0, _koaBunyan2.default)(logger, { level: 'info' }));
  app.use((0, _koaBunyanLogger2.default)(logger));

  // select sub-app (admin/api) according to host subdomain (could also be by analysing request.url);
  // separate sub-apps can be used for modularisation of a large system, for different login/access
  // rights for public/protected elements, and also for different functionality between api & web
  // pages (content negotiation, error handling, handlebars templating, etc).

  app.use(async function subApp(ctx, next) {
    // use subdomain to determine which app to serve: www. as default, or admin. or api
    ctx.state.subapp = ctx.url.split('/')[1]; // subdomain = part after first '/' of hostname
    // note: could use root part of path instead of sub-domains e.g. ctx.request.url.split('/')[1]
    await next();
  });

  const SESSION_CONFIG = {
    key: _consts2.default.SESS_KEY
    // session for flash messages (uses signed session cookies, with no server storage)
  };app.use((0, _koaSession2.default)(SESSION_CONFIG, app)); // note koa-session@3.4.0 is v1 middleware which generates deprecation notice

  const nuxt = new _nuxt.Nuxt(_nuxtConfig2.default);
  nuxt.showOpen = () => {
    const _host = host === '0.0.0.0' ? 'localhost' : host;
    // eslint-disable-next-line no-console
    console.log('\n' + _chalk2.default.bgGreen.black(' OPEN ') + _chalk2.default.green(` http://${_host}:${port}\n`));
  };
  // Build only in dev mode
  if (_nuxtConfig2.default.dev) {
    const devConfigs = _nuxtConfig2.default.development;
    if (devConfigs && devConfigs.proxies) {
      for (let proxyItem of devConfigs.proxies) {
        console.log(`Active Proxy: path[${proxyItem.path}] target[${proxyItem.target}]`);
        app.use((0, _koaProxies2.default)(proxyItem.path, proxyItem));
      }
    }
    await new _nuxt.Builder(nuxt).build();
  }
  const nuxtRender = (0, _koaConnect2.default)(nuxt.render);

  app.use(async (ctx, next) => {
    await next();
    if (ctx.state.subapp !== _consts2.default.API) {
      ctx.status = 200; // koa defaults to 404 when it sees that status is unset
      ctx.req.session = ctx.session;
      await nuxtRender(ctx);
    }
  });
  // return response time in X-Response-Time header
  app.use(async function responseTime(ctx, next) {
    const t1 = Date.now();
    await next();
    const t2 = Date.now();
    ctx.set('X-Response-Time', Math.ceil(t2 - t1) + 'ms');
  });

  // HTTP compression
  app.use((0, _koaCompress2.default)({}));

  // only search-index www subdomain
  app.use(async function robots(ctx, next) {
    await next();
    if (ctx.hostname.slice(0, 3) !== 'www') {
      ctx.response.set('X-Robots-Tag', 'noindex, nofollow');
    }
  });

  // parse request body into ctx.request.body
  app.use((0, _koaBody2.default)());

  // sometimes useful to be able to track each request...
  app.use(async function (ctx, next) {
    debug(ctx.method + ' ' + ctx.url);
    await next();
  });

  // note no 'next' after composed subapp, this must be the last middleware
  app.use(async function composeSubapp(ctx, next) {
    switch (ctx.state.subapp) {
      case _consts2.default.API:
        await (0, _koaCompose2.default)(_api2.default.middleware)(ctx);
        break;
    }
  });

  app.listen(port, host);
} // small debugging utility
// HTTP compression
// body parser


start();

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("bunyan");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("mkdirp");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("koa-bunyan");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("koa-bunyan-logger");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("koa-connect");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("koa-body");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("koa-compose");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("koa-compress");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("koa-session");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Koa framework
// JS object to XML
// JS object to YAML


var _koa = __webpack_require__(1);

var _koa2 = _interopRequireDefault(_koa);

var _xmlify = __webpack_require__(16);

var _xmlify2 = _interopRequireDefault(_xmlify);

var _jsYaml = __webpack_require__(17);

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _routesAuth = __webpack_require__(18);

var _routesAuth2 = _interopRequireDefault(_routesAuth);

var _routesDemo = __webpack_require__(23);

var _routesDemo2 = _interopRequireDefault(_routesDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default(); // API app

// content negotiation: api will respond with json, xml, or yaml
app.use(async function contentNegotiation(ctx, next) {
  await next();

  if (!ctx.body) return; // no content to return

  // check Accept header for preferred response type
  const type = ctx.accepts('json', 'xml', 'yaml', 'text');

  switch (type) {
    case 'json':
    default:
      delete ctx.body.root; // xml root element
      break; // ... koa takes care of type
    case 'xml':
      ctx.type = type;
      const root = ctx.body.root; // xml root element
      delete ctx.body.root;
      ctx.body = (0, _xmlify2.default)(ctx.body, root);
      break;
    case 'yaml':
    case 'text':
      delete ctx.body.root; // xml root element
      ctx.type = 'yaml';
      ctx.body = _jsYaml2.default.dump(ctx.body);
      break;
    case false:
      ctx.throw(406); // "Not acceptable" - can't furnish whatever was requested
      break;
  }
});

// handle thrown or uncaught exceptions anywhere down the line
app.use(async function handleErrors(ctx, next) {
  try {
    await next();
  } catch (e) {
    ctx.status = e.status || 500;
    switch (ctx.status) {
      case 204:
        // No Content
        break;
      case 401: // Unauthorized
      case 403: // Forbidden
      case 404: // Not Found
      case 406: // Not Acceptable
      case 409:
        // Conflict
        ctx.body = _extends({
          root: 'error'
        }, e);
        break;
      default:
      case 500:
        // Internal Server Error (for uncaught or programming errors)
        console.error(ctx.status, e.message);
        ctx.body = _extends({
          root: 'error'
        }, e);
        if (app.env !== 'production') ctx.body.stack = e.stack;
        ctx.app.emit('error', e, ctx); // github.com/koajs/koa/wiki/Error-Handling
        break;
    }
  }
});

// ------------ routing

// public (unsecured) modules first

app.use(_routesAuth2.default);
app.use(_routesDemo2.default);

// verify token here

// custom modules here

exports.default = app;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("xmlify");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("js-yaml");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _axios = __webpack_require__(2);

var _axios2 = _interopRequireDefault(_axios);

var _querystring = __webpack_require__(19);

var _querystring2 = _interopRequireDefault(_querystring);

var _koaRouter = __webpack_require__(3);

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _svgCaptcha = __webpack_require__(20);

var _svgCaptcha2 = _interopRequireDefault(_svgCaptcha);

var _consts = __webpack_require__(0);

var _consts2 = _interopRequireDefault(_consts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _koaRouter2.default)({
  prefix: _consts2.default.BASE_API
}); // router middleware for koa

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Route to handle authentication /auth element                                                  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
var request = _axios2.default.create({
  baseURL: _consts2.default.LB_ADDR,
  timeout: 5000,
  headers: {
    Authorization: 'Basic YmFzLWNsaWVudDpYMmNYeW1nWkRrRkE3RWR0',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
});

router.post('/login', async function getAuth(ctx) {
  const user = ctx.request.body;
  if (!user || !user.userName || !user.password) {
    ctx.throw(401, '用户名/密码未填写');
  }
  if (ctx.session.captcha.toLowerCase() !== user.captcha.toLowerCase()) {
    ctx.throw(401, '验证码输入错误');
  }
  try {
    const response = await request.post('/platform/uaano/oauth/token', _querystring2.default.stringify({
      username: user.userName,
      password: Buffer.from(user.password).toString('base64'),
      grant_type: 'password'
    }));
    ctx.body = Object.assign({}, response.data);
    ctx.session.jwt = response.data.access_token;
  } catch (error) {
    ctx.log.error({ error }, 'Call oath service failed!');
    let errMsg = '登录失败, 具体信息请联系维护人员';
    let data = null;
    if (data = error && error.response && error.response.data) {
      errMsg = data.message || data.errors;
    }
    ctx.throw(401, errMsg);
  }
});

router.post('/logout', async function logout(ctx) {
  ctx.session.jwt = null;
  ctx.status = 200;
});

router.get('/captcha', async function getAuth(ctx, next) {
  await next();
  const width = ctx.request.query.width || 150;
  const height = ctx.request.query.height || 36;
  let captcha = _svgCaptcha2.default.create({
    width,
    height,
    size: 4,
    noise: 1,
    fontSize: width > 760 ? 40 : 30,
    // background: '#e8f5ff',
    ignoreChars: '0oO1iIl'
  });
  ctx.session.captcha = captcha.text;
  ctx.type = 'image/svg+xml';
  ctx.body = captcha.data;
});

router.get('/menus', async function getMenus(ctx) {
  ctx.status = 200;
  ctx.type = 'application/json';
  ctx.body = [{
    id: '1',
    name: 'nav.home',
    url: '/',
    icon: 'el-icon-menu'
  }, {
    id: '2',
    name: 'nav.activity',
    icon: 'el-icon-edit',
    children: [{
      id: '2-1',
      name: 'nav.demo',
      url: '/examples',
      icon: 'el-icon-share'
    }, {
      id: '2-2',
      name: 'nav.list',
      url: '/examples/activity',
      icon: 'el-icon-view'
    }, {
      id: '2-3',
      name: 'nav.create',
      url: '/examples/activity/create',
      icon: 'el-icon-message'
    }, {
      id: '2-3',
      name: 'nav.charts',
      url: '/examples/charts',
      icon: 'el-icon-picture'
    }]
  }, {
    id: '3',
    name: 'nav.about',
    url: '/about',
    icon: 'el-icon-setting'
  }];
});

router.post('/platform/uaano/oauth/token', async function getToken(ctx, next) {
  ctx.body = {
    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + 'eyJhdWQiOlsiYmFzIl0sInVzZXJfbmFtZSI6ImFkbWluIiwic' + '2NvcGUiOlsicmVhZCJdLCJleHAiOjk5OTk5OTk5OTk5OTksIn' + 'VzZXJJZCI6IjQwMjg4YjdlNWJjZDc3MzMwMTViY2Q3ZmQ3MjI' + 'wMDAxIiwiYXV0aG9yaXRpZXMiOlsiYWRtaW4iXSwianRpIjoi' + 'NzJlYzNjNDMtMDMwYS00MWVkLWFiYjItYjdhMjY5NTA2OTIzI' + 'iwiY2xpZW50X2lkIjoiYmFzLWNsaWVudCJ9.' + 'uwywziNetHyfSdiqcJt6XUGy4V_WYHR4K6l7OP2VB9I'
  };
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = router.routes();

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("svg-captcha");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _freeze = __webpack_require__(22);var _freeze2 = _interopRequireDefault(_freeze);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default = (0, _freeze2.default)({
  APP: 'hare',
  API: 'hpi',
  BASE_API: '/hpi',
  SESS_KEY: 'hare:sess',
  COOKIE_JWT: 'hare_jwt' });

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/freeze");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _koaRouter = __webpack_require__(3);

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _consts = __webpack_require__(0);

var _consts2 = _interopRequireDefault(_consts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Route to handle authentication /auth element                                                  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
const router = (0, _koaRouter2.default)({
  prefix: _consts2.default.BASE_API
}); // router middleware for koa

router.get('/activities', async function getActivities(ctx) {
  ctx.status = 200;
  ctx.body = [{
    'account': '活动1',
    'date': '2017-1-1',
    'type': '价格优惠',
    'region': '北京',
    'priority': '高',
    'organizer': '市场部',
    'desc': 'Description example of activity 1'
  }, {
    'account': '活动2',
    'date': '2017-1-2',
    'type': '价格权益',
    'region': '北京',
    'priority': '高',
    'organizer': '市场部',
    'desc': 'Description example of activity 2'
  }, {
    'account': '活动3',
    'date': '2017-1-3',
    'type': '价格优惠',
    'region': '上海',
    'priority': '高',
    'organizer': '市场部',
    'desc': 'Description example of activity 3'
  }, {
    'account': '活动4',
    'date': '2017-2-4',
    'type': '价格优惠',
    'region': '上海',
    'priority': '中',
    'organizer': '运营部',
    'desc': 'Description example of activity 4'
  }, {
    'account': '活动5',
    'date': '2017-3-5',
    'type': '价格权益',
    'region': '大连',
    'priority': '高',
    'organizer': '销售部',
    'desc': 'Description example of activity in 大连 on March 5th'
  }, {
    'account': '活动6',
    'date': '2017-4-6',
    'type': '价格优惠',
    'region': '西安',
    'priority': '高',
    'organizer': '市场部推广部',
    'desc': 'Description example of activity in 西安'
  }, {
    'account': '活动7',
    'date': '2017-5-7',
    'type': '价格优惠',
    'region': '大连',
    'priority': '高',
    'organizer': '销售部华北销售',
    'desc': 'Description example of activity in 大连'
  }, {
    'account': '活动8',
    'date': '2017-6-8',
    'type': '价格优惠',
    'region': '重庆',
    'priority': '高',
    'organizer': '销售部华南销售',
    'desc': 'Description example of activity in 重庆'
  }, {
    'account': '活动9',
    'date': '2017-6-9',
    'type': '价格优惠',
    'region': '南京',
    'priority': '高',
    'organizer': '销售部华东销售',
    'desc': 'Description example of activity in 南京'
  }, {
    'account': '活动10',
    'date': '2017-9-10',
    'type': '价格权益',
    'region': 'New York',
    'priority': '高',
    'organizer': '销售部海外部',
    'desc': 'Description example of activity in New York'
  }];
});

module.exports = router.routes();

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var webpack = __webpack_require__(25);
module.exports = {
  srcDir: 'client/',
  buildDir: 'dist/client/',
  dev: "production" !== 'production',
  /*
                                              ** Router config
                                              */
  router: {
    middleware: [
    'check-auth'] },


  /*
                     ** Headers of the page
                     */
  head: {
    title: 'Hare 2.0',
    meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: 'Nuxt.js project' }],

    link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }] },


  /*
                                                                    ** Build config
                                                                    */
  build: {
    publicPath: '/hare/',
    babel: {
      plugins: ['transform-decorators-legacy', 'transform-class-properties'] },

    extend: function extend(config, _ref) {var dev = _ref.dev,isClient = _ref.isClient;
      config.resolve.alias['class-component'] = '@/plugins/class-component';
    },
    vendor: [
    'axios',
    'element-ui',
    'negotiator',
    'vue-class-component',
    'vuex-class',
    'vue-i18n',
    'vue-chartjs',
    'vue-clipboards',
    'moment',
    'chart.js',
    'deepmerge' // vue-chartjs dep
    ],
    extractCSS: true,
    filenames: {
      vendor: 'vendor.[hash:12].js',
      app: 'hare.[chunkhash:12].js',
      css: 'hare.[contenthash:12].css' },

    plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh|en/)] },


  /*
                                                                            ** Customize the Progress Bar
                                                                            */
  loading: {
    color: '#60bbff' },

  /*
                        ** Generate config
                        */
  generate: {
    dir: '.generated' },

  /*
                         ** Global CSS
                         */
  css: [
  'normalize.css/normalize.css',
  'element-ui/lib/theme-default/index.css',
  { src: '@/assets/styles/main.scss', lang: 'scss' }],

  /*
                                                       ** Add element-ui in our app, see plugins/element-ui.js file
                                                       */
  plugins: [
  '@/plugins/i18n',
  '@/plugins/element-ui',
  '@/plugins/axios-defaults',
  { src: '@/plugins/clipboard', ssr: false },
  { src: '@/plugins/error-handler', ssr: false }],


  // koa-proxies for dev, options reference https://github.com/nodejitsu/node-http-proxy#options
  development: {
    proxies: [
      /* {
                path: '/hpi/',
                target: 'http://localhost:3000/',
                logs: true,
                prependPath: false,
                changeOrigin: true,
                rewrite: path => path.replace(/^\/pages(\/|\/\w+)?$/, '/service')
              } */] } };

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("koa-proxies");

/***/ })
/******/ ]);