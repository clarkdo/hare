!function(e) {
    var t = {};
    function o(n) {
        if (t[n]) return t[n].exports;
        var i = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(i.exports, i, i.exports, o), i.l = !0, i.exports;
    }
    o.m = e, o.c = t, o.d = function(e, t, n) {
        o.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, o.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return o.d(t, "a", t), t;
    }, o.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, o.p = "", o(o.s = 3);
}([ function(e, t) {
    const o = process.env.HOST || "0.0.0.0", n = process.env.PORT || "3000";
    e.exports = Object.freeze({
        APP: "hare",
        API: "hpi",
        BASE_API: "/hpi",
        SESS_KEY: "hare:sess",
        COOKIE_JWT: "hare_jwt",
        HOST: o,
        PORT: n,
        LB_ADDR: process.env.LB_ADDR || `http://${o}:${n}/hpi`
    });
}, function(e, t) {
    e.exports = require("koa");
}, function(e, t) {
    e.exports = require("koa-router");
}, function(e, t, o) {
    const n = o(1), {Nuxt: i, Builder: s} = o(4), r = o(5), a = o(6), c = o(7), u = o(8), p = o(9), l = o(10), d = o(11), y = o(12), f = o(13), m = o(14), h = o(0), g = o(22), x = o(24), w = o(25), b = o(26);
    !async function() {
        const e = /^win/.test(process.platform), t = h.HOST, o = h.PORT, v = w("app"), k = new n();
        k.keys = [ "hare-server" ], g.dev = !("production" === k.env);
        let I = process.env.LOG_DIR || (e ? "C:\\\\log" : "/var/tmp/log");
        a.sync(I);
        const j = {
            type: "rotating-file",
            path: `${I = I.replace(/(\\|\/)+$/, "") + (e ? "\\\\" : "/")}hare-access.log`,
            level: g.dev ? "debug" : "info",
            period: "1d",
            count: 4
        }, q = {
            type: "rotating-file",
            path: `${I}hare-error.log`,
            level: "error",
            period: "1d",
            count: 4
        }, z = r.createLogger({
            name: "hare",
            streams: [ j, q ]
        });
        k.use(c(z, {
            level: "info"
        })), k.use(u(z)), k.use(async function(e, t) {
            e.state.subapp = e.url.split("/")[1], await t();
        });
        const D = new i(g);
        if (g.dev) {
            const e = g.development;
            if (e && e.proxies) for (let t of e.proxies) console.log(`Active Proxy: path[${t.path}] target[${t.target}]`), 
            k.use(b(t.path, t));
            await new s(D).build();
        }
        const O = p(D.render);
        k.use(async (e, t) => {
            await t(), e.state.subapp !== h.API && (e.status = 200, e.req.session = e.session, 
            await O(e));
        });
        const R = {
            key: h.SESS_KEY
        };
        k.use(f(R, k)), k.use(async function(e, t) {
            const o = Date.now();
            await t();
            const n = Date.now();
            e.set("X-Response-Time", Math.ceil(n - o) + "ms");
        }), k.use(y({})), k.use(async function(e, t) {
            await t(), "www" !== e.hostname.slice(0, 3) && e.response.set("X-Robots-Tag", "noindex, nofollow");
        }), k.use(l()), k.use(async function(e, t) {
            v(e.method + " " + e.url), await t();
        }), k.use(async function(e, t) {
            switch (e.state.subapp) {
              case h.API:
                await d(m.middleware)(e);
            }
        }), k.listen(o, t);
        const S = "0.0.0.0" === t ? "localhost" : t;
        console.log("\n" + x.bgGreen.black(" OPEN ") + x.green(` http://${S}:${o}\n`));
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
    const n = o(1), i = o(15), s = o(16), r = o(17), a = o(21), c = new n();
    c.use(async function(e, t) {
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
            delete e.body.root, e.body = i(e.body, t);
            break;

          case "yaml":
          case "text":
            delete e.body.root, e.type = "yaml", e.body = s.dump(e.body);
            break;

          case !1:
            e.throw(406);
        }
    }), c.use(async function(e, t) {
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
                e.body = {
                    root: "error"
                };
                break;

              default:
              case 500:
                console.error(e.status, t.message), e.body = {
                    root: "error"
                }, "production" !== c.env && (e.body.stack = t.stack), e.app.emit("error", t, e);
            }
        }
    }), c.use(r), c.use(a), e.exports = c;
}, function(e, t) {
    e.exports = require("xmlify");
}, function(e, t) {
    e.exports = require("js-yaml");
}, function(e, t, o) {
    const n = o(18), i = o(19), s = o(2), r = o(20), a = o(0), c = s({
        prefix: a.BASE_API
    });
    var u = n.create({
        baseURL: a.LB_ADDR,
        timeout: 5e3,
        headers: {
            Authorization: "Basic YmFzLWNsaWVudDpYMmNYeW1nWkRrRkE3RWR0",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    });
    c.post("/login", async function(e) {
        const t = e.request.body;
        t && t.userName && t.password || e.throw(401, "用户名/密码未填写"), e.session.captcha.toLowerCase() !== t.captcha.toLowerCase() && e.throw(401, "验证码输入错误");
        try {
            const o = await u.post("/platform/uaano/oauth/token", i.stringify({
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
    }), c.post("/logout", async function(e) {
        e.session.jwt = null, e.status = 200;
    }), c.get("/captcha", async function(e, t) {
        await t();
        const o = e.request.query.width || 150, n = e.request.query.height || 36;
        let i = r.create({
            width: o,
            height: n,
            size: 4,
            noise: 1,
            fontSize: o > 760 ? 40 : 30,
            ignoreChars: "0oO1iIl"
        });
        e.session.captcha = i.text, e.type = "image/svg+xml", e.body = i.data;
    }), c.get("/menus", async function(e) {
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
                id: "2-4",
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
    }), c.post("/platform/uaano/oauth/token", async function(e, t) {
        e.body = {
            access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYmFzIl0sInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsicmVhZCJdLCJleHAiOjk5OTk5OTk5OTk5OTksInVzZXJJZCI6IjQwMjg4YjdlNWJjZDc3MzMwMTViY2Q3ZmQ3MjIwMDAxIiwiYXV0aG9yaXRpZXMiOlsiYWRtaW4iXSwianRpIjoiNzJlYzNjNDMtMDMwYS00MWVkLWFiYjItYjdhMjY5NTA2OTIzIiwiY2xpZW50X2lkIjoiYmFzLWNsaWVudCJ9.uwywziNetHyfSdiqcJt6XUGy4V_WYHR4K6l7OP2VB9I"
        };
    }), e.exports = c.routes();
}, function(e, t) {
    e.exports = require("axios");
}, function(e, t) {
    e.exports = require("querystring");
}, function(e, t) {
    e.exports = require("svg-captcha");
}, function(e, t, o) {
    const n = o(2)({
        prefix: o(0).BASE_API
    });
    n.get("/activities", async function(e) {
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
    }), e.exports = n.routes();
}, function(e, t, o) {
    const n = o(23);
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
            extend(e, {isDev: t}) {
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
        css: [ "normalize.css/normalize.css", "element-ui/lib/theme-chalk/index.css", {
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