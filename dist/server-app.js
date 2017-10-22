!function(e) {
    function t(n) {
        if (o[n]) return o[n].exports;
        var r = o[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(r.exports, r, r.exports, t), r.l = !0, r.exports;
    }
    var o = {};
    t.m = e, t.c = o, t.d = function(e, o, n) {
        t.o(e, o) || Object.defineProperty(e, o, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, t.n = function(e) {
        var o = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(o, "a", o), o;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 4);
}([ function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var o = arguments[t];
            for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
        }
        return e;
    }, r = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(o(21));
    const a = process.env.HOST || "0.0.0.0", s = process.env.PORT || "3000";
    t.default = Object.freeze(n({
        HOST: a,
        PORT: s,
        LB_ADDR: process.env.LB_ADDR || `http://${a}:${s}/hpi`
    }, r.default));
}, function(e, t) {
    e.exports = require("koa");
}, function(e, t) {
    e.exports = require("axios");
}, function(e, t) {
    e.exports = require("koa-router");
}, function(e, t, o) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    var r = n(o(1)), a = o(5), s = n(o(2)), i = n(o(6)), c = n(o(7)), u = n(o(8)), l = n(o(9)), p = n(o(10)), d = n(o(11)), f = n(o(12)), y = n(o(13)), m = n(o(14)), h = n(o(15)), g = n(o(0)), v = n(o(24)), x = n(o(26)), b = n(o(27)), w = n(o(28));
    !async function() {
        const e = /^win/.test(process.platform), t = g.default.HOST, o = g.default.PORT, n = (0, 
        b.default)("app"), k = new r.default();
        k.keys = [ "hare-server" ], v.default.dev = !("production" === k.env), s.default.defaults.baseURL = `http://127.0.0.1:${o}`;
        let j = process.env.LOG_DIR || (e ? "C:\\\\log" : "/var/tmp/log");
        c.default.sync(j);
        const O = {
            type: "rotating-file",
            path: `${j = j.replace(/(\\|\/)+$/, "") + (e ? "\\\\" : "/")}hare-access.log`,
            level: v.default.dev ? "debug" : "info",
            period: "1d",
            count: 4
        }, _ = {
            type: "rotating-file",
            path: `${j}hare-error.log`,
            level: "error",
            period: "1d",
            count: 4
        }, I = i.default.createLogger({
            name: "hare",
            streams: [ O, _ ]
        });
        k.use((0, u.default)(I, {
            level: "info"
        })), k.use((0, l.default)(I)), k.use(async function(e, t) {
            e.state.subapp = e.url.split("/")[1], await t();
        });
        const q = {
            key: g.default.SESS_KEY
        };
        k.use((0, m.default)(q, k));
        const z = new a.Nuxt(v.default);
        if (z.showOpen = (() => {
            const e = "0.0.0.0" === t ? "localhost" : t;
            console.log("\n" + x.default.bgGreen.black(" OPEN ") + x.default.green(` http://${e}:${o}\n`));
        }), v.default.dev) {
            const e = v.default.development;
            if (e && e.proxies) for (let t of e.proxies) console.log(`Active Proxy: path[${t.path}] target[${t.target}]`), 
            k.use((0, w.default)(t.path, t));
            await new a.Builder(z).build();
        }
        const D = (0, p.default)(z.render);
        k.use(async (e, t) => {
            await t(), e.state.subapp !== g.default.API && (e.status = 200, e.req.session = e.session, 
            await D(e));
        }), k.use(async function(e, t) {
            const o = Date.now();
            await t();
            const n = Date.now();
            e.set("X-Response-Time", Math.ceil(n - o) + "ms");
        }), k.use((0, y.default)({})), k.use(async function(e, t) {
            await t(), "www" !== e.hostname.slice(0, 3) && e.response.set("X-Robots-Tag", "noindex, nofollow");
        }), k.use((0, d.default)()), k.use(async function(e, t) {
            n(e.method + " " + e.url), await t();
        }), k.use(async function(e, t) {
            switch (e.state.subapp) {
              case g.default.API:
                await (0, f.default)(h.default.middleware)(e);
            }
        }), k.listen(o, t);
    }();
}, function(e, t) {
    e.exports = require("nuxt");
}, function(e, t) {
    e.exports = require("bunyan");
}, function(e, t) {
    e.exports = require("mkdirp");
}, function(e, t) {
    e.exports = require("koa-bunyan");
}, function(e, t) {
    e.exports = require("koa-bunyan-logger");
}, function(e, t) {
    e.exports = require("koa-connect");
}, function(e, t) {
    e.exports = require("koa-body");
}, function(e, t) {
    e.exports = require("koa-compose");
}, function(e, t) {
    e.exports = require("koa-compress");
}, function(e, t) {
    e.exports = require("koa-session");
}, function(e, t, o) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var o = arguments[t];
            for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
        }
        return e;
    }, a = n(o(1)), s = n(o(16)), i = n(o(17)), c = n(o(18)), u = n(o(23));
    const l = new a.default();
    l.use(async function(e, t) {
        if (await t(), !e.body) return;
        const o = e.accepts("json", "xml", "yaml", "text");
        switch (o) {
          case "json":
          default:
            delete e.body.root;
            break;

          case "xml":
            e.type = o;
            const t = e.body.root;
            delete e.body.root, e.body = (0, s.default)(e.body, t);
            break;

          case "yaml":
          case "text":
            delete e.body.root, e.type = "yaml", e.body = i.default.dump(e.body);
            break;

          case !1:
            e.throw(406);
        }
    }), l.use(async function(e, t) {
        try {
            await t();
        } catch (t) {
            switch (e.status = t.status || 500, e.status) {
              case 204:
                break;

              case 401:
              case 403:
              case 404:
              case 406:
              case 409:
                e.body = r({
                    root: "error"
                }, t);
                break;

              default:
              case 500:
                console.error(e.status, t.message), e.body = r({
                    root: "error"
                }, t), "production" !== l.env && (e.body.stack = t.stack), e.app.emit("error", t, e);
            }
        }
    }), l.use(c.default), l.use(u.default), t.default = l;
}, function(e, t) {
    e.exports = require("xmlify");
}, function(e, t) {
    e.exports = require("js-yaml");
}, function(e, t, o) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    var r = n(o(2)), a = n(o(19)), s = n(o(3)), i = n(o(20)), c = n(o(0));
    const u = (0, s.default)({
        prefix: c.default.BASE_API
    });
    var l = r.default.create({
        baseURL: c.default.LB_ADDR,
        timeout: 5e3,
        headers: {
            Authorization: "Basic YmFzLWNsaWVudDpYMmNYeW1nWkRrRkE3RWR0",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    });
    u.post("/login", async function(e) {
        const t = e.request.body;
        t && t.userName && t.password || e.throw(401, "用户名/密码未填写"), e.session.captcha.toLowerCase() !== t.captcha.toLowerCase() && e.throw(401, "验证码输入错误");
        try {
            const o = await l.post("/platform/uaano/oauth/token", a.default.stringify({
                username: t.userName,
                password: Buffer.from(t.password).toString("base64"),
                grant_type: "password"
            }));
            e.body = Object.assign({}, o.data), e.session.jwt = o.data.access_token;
        } catch (t) {
            e.log.error({
                error: t
            }, "Call oath service failed!");
            let o = "登录失败, 具体信息请联系维护人员", n = null;
            (n = t && t.response && t.response.data) && (o = n.message || n.errors), e.throw(401, o);
        }
    }), u.post("/logout", async function(e) {
        e.session.jwt = null, e.status = 200;
    }), u.get("/captcha", async function(e, t) {
        await t();
        const o = e.request.query.width || 150, n = e.request.query.height || 36;
        let r = i.default.create({
            width: o,
            height: n,
            size: 4,
            noise: 1,
            fontSize: o > 760 ? 40 : 30,
            ignoreChars: "0oO1iIl"
        });
        e.session.captcha = r.text, e.type = "image/svg+xml", e.body = r.data;
    }), u.get("/menus", async function(e) {
        e.status = 200, e.type = "application/json", e.body = [ {
            id: "1",
            name: "nav.home",
            url: "/",
            icon: "el-icon-menu"
        }, {
            id: "2",
            name: "nav.activity",
            icon: "el-icon-edit",
            children: [ {
                id: "2-1",
                name: "nav.demo",
                url: "/examples",
                icon: "el-icon-share"
            }, {
                id: "2-2",
                name: "nav.list",
                url: "/examples/activity",
                icon: "el-icon-view"
            }, {
                id: "2-3",
                name: "nav.create",
                url: "/examples/activity/create",
                icon: "el-icon-message"
            }, {
                id: "2-3",
                name: "nav.charts",
                url: "/examples/charts",
                icon: "el-icon-picture"
            } ]
        }, {
            id: "3",
            name: "nav.about",
            url: "/about",
            icon: "el-icon-setting"
        } ];
    }), u.post("/platform/uaano/oauth/token", async function(e, t) {
        e.body = {
            access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYmFzIl0sInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsicmVhZCJdLCJleHAiOjk5OTk5OTk5OTk5OTksInVzZXJJZCI6IjQwMjg4YjdlNWJjZDc3MzMwMTViY2Q3ZmQ3MjIwMDAxIiwiYXV0aG9yaXRpZXMiOlsiYWRtaW4iXSwianRpIjoiNzJlYzNjNDMtMDMwYS00MWVkLWFiYjItYjdhMjY5NTA2OTIzIiwiY2xpZW50X2lkIjoiYmFzLWNsaWVudCJ9.uwywziNetHyfSdiqcJt6XUGy4V_WYHR4K6l7OP2VB9I"
        };
    }), e.exports = u.routes();
}, function(e, t) {
    e.exports = require("querystring");
}, function(e, t) {
    e.exports = require("svg-captcha");
}, function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = function(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }(o(22));
    t.default = (0, n.default)({
        APP: "hare",
        API: "hpi",
        BASE_API: "/hpi",
        SESS_KEY: "hare:sess",
        COOKIE_JWT: "hare_jwt"
    });
}, function(e, t) {
    e.exports = require("babel-runtime/core-js/object/freeze");
}, function(e, t, o) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    var r = n(o(3)), a = n(o(0));
    const s = (0, r.default)({
        prefix: a.default.BASE_API
    });
    s.get("/activities", async function(e) {
        e.status = 200, e.body = [ {
            account: "活动1",
            date: "2017-1-1",
            type: "价格优惠",
            region: "北京",
            priority: "高",
            organizer: "市场部",
            desc: "Description example of activity 1"
        }, {
            account: "活动2",
            date: "2017-1-2",
            type: "价格权益",
            region: "北京",
            priority: "高",
            organizer: "市场部",
            desc: "Description example of activity 2"
        }, {
            account: "活动3",
            date: "2017-1-3",
            type: "价格优惠",
            region: "上海",
            priority: "高",
            organizer: "市场部",
            desc: "Description example of activity 3"
        }, {
            account: "活动4",
            date: "2017-2-4",
            type: "价格优惠",
            region: "上海",
            priority: "中",
            organizer: "运营部",
            desc: "Description example of activity 4"
        }, {
            account: "活动5",
            date: "2017-3-5",
            type: "价格权益",
            region: "大连",
            priority: "高",
            organizer: "销售部",
            desc: "Description example of activity in 大连 on March 5th"
        }, {
            account: "活动6",
            date: "2017-4-6",
            type: "价格优惠",
            region: "西安",
            priority: "高",
            organizer: "市场部推广部",
            desc: "Description example of activity in 西安"
        }, {
            account: "活动7",
            date: "2017-5-7",
            type: "价格优惠",
            region: "大连",
            priority: "高",
            organizer: "销售部华北销售",
            desc: "Description example of activity in 大连"
        }, {
            account: "活动8",
            date: "2017-6-8",
            type: "价格优惠",
            region: "重庆",
            priority: "高",
            organizer: "销售部华南销售",
            desc: "Description example of activity in 重庆"
        }, {
            account: "活动9",
            date: "2017-6-9",
            type: "价格优惠",
            region: "南京",
            priority: "高",
            organizer: "销售部华东销售",
            desc: "Description example of activity in 南京"
        }, {
            account: "活动10",
            date: "2017-9-10",
            type: "价格权益",
            region: "New York",
            priority: "高",
            organizer: "销售部海外部",
            desc: "Description example of activity in New York"
        } ];
    }), e.exports = s.routes();
}, function(e, t, o) {
    "use strict";
    var n = o(25);
    e.exports = {
        srcDir: "client/",
        buildDir: "dist/client/",
        rootDir: "./",
        dev: !1,
        router: {
            middleware: [ "check-auth" ]
        },
        head: {
            title: "Hare 2.0",
            meta: [ {
                charset: "utf-8"
            }, {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            }, {
                hid: "description",
                name: "description",
                content: "Nuxt.js project"
            } ],
            link: [ {
                rel: "icon",
                type: "image/x-icon",
                href: "/favicon.ico"
            } ]
        },
        build: {
            publicPath: "/hare/",
            babel: {
                plugins: [ "transform-decorators-legacy", "transform-class-properties" ]
            },
            extend: function(e, t) {
                t.dev, t.isClient;
                e.resolve.alias["class-component"] = "@/plugins/class-component";
            },
            vendor: [ "axios", "element-ui", "negotiator", "vue-class-component", "vuex-class", "vue-i18n", "vue-chartjs", "vue-clipboards", "moment", "chart.js", "deepmerge" ],
            extractCSS: !0,
            filenames: {
                vendor: "vendor.[hash:12].js",
                app: "hare.[chunkhash:12].js",
                css: "hare.[contenthash:12].css"
            },
            plugins: [ new n.ContextReplacementPlugin(/moment[/\\]locale$/, /zh|en/) ]
        },
        loading: {
            color: "#60bbff"
        },
        generate: {
            dir: ".generated"
        },
        css: [ "normalize.css/normalize.css", "element-ui/lib/theme-default/index.css", {
            src: "@/assets/styles/main.scss",
            lang: "scss"
        } ],
        plugins: [ "@/plugins/i18n", "@/plugins/element-ui", "@/plugins/axios-defaults", {
            src: "@/plugins/clipboard",
            ssr: !1
        }, {
            src: "@/plugins/error-handler",
            ssr: !1
        } ],
        modules: [ "@nuxtjs/webpackmonitor" ],
        development: {
            proxies: []
        }
    };
}, function(e, t) {
    e.exports = require("webpack");
}, function(e, t) {
    e.exports = require("chalk");
}, function(e, t) {
    e.exports = require("debug");
}, function(e, t) {
    e.exports = require("koa-proxies");
} ]);