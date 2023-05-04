(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Apee 路由管理系统
 * @author 欧阳鹏
 * @link https://github.com/oyps/apee-router
 */
var ApeeRouter = /** @class */ (function () {
    function ApeeRouter(options) {
        var _this_1 = this;
        this.routeList = {};
        this.default = (options === null || options === void 0 ? void 0 : options.default) || 'home';
        /** 注册路由名称列表 */
        var routeNames = (options === null || options === void 0 ? void 0 : options.routes) || [];
        routeNames.forEach(function (routeName) { return _this_1.set(routeName); });
    }
    /**
     * 注册路由
     * @param routeName 路由名称
     * @param event 路由事件，多次设置可执行多个事件
     */
    ApeeRouter.prototype.set = function (routeNames, event) {
        if (typeof routeNames == 'string')
            routeNames = [routeNames];
        for (var i = 0; i < routeNames.length; i++) {
            var routeName = routeNames[i];
            var dom = this.getDom(routeName);
            // DOM 不存在，跳过该条路由设置
            if (!dom)
                continue;
            if (!this.routeList[routeName])
                this.routeList[routeName] = {
                    data: {},
                    event: [],
                    args: [],
                    name: routeName,
                    status: 0,
                    dom: dom
                };
            var route = this.routeList[routeName];
            route.name = routeName;
            if (typeof event == 'function')
                route.event.push(event);
        }
    };
    /**
     * 获取路由目标 DOM
     * @param routeName 路由名称
     * @returns 路由目标 DOM
     */
    ApeeRouter.prototype.getDom = function (routeName) {
        return document.querySelector("[data-route=\"".concat(routeName, "\"]"));
    };
    /**
     * 初始化路由
     * @param routeName 路由名称
     * @returns 路由对象
     */
    ApeeRouter.prototype.initRoute = function (routeName) {
        var route = this.routeList[routeName];
        route.name = routeName;
        if (!route.event)
            route.event = [];
        if (!route.data)
            route.data = {};
        if (!route.status)
            route.event = [];
        return route;
    };
    /** 启动路由系统 */
    ApeeRouter.prototype.start = function () {
        var _this_1 = this;
        var _this = this;
        window.addEventListener('hashchange', function (event) {
            _this_1.loadRoute(_this, event);
        });
        this.loadRoute(_this);
    };
    /**
     * 载入路由
     * @param route 路由对象
     * @returns
     */
    ApeeRouter.prototype.loadRoute = function (_this, event) {
        var newHash = event ? new URL(event.newURL).hash : location.hash;
        var routeName = newHash.split('/')[1];
        var args = newHash.split('/').slice(2);
        var route = _this.routeList[routeName];
        if (!newHash) {
            var defaultDom = this.getDom(_this.default);
            if (route) {
                routeName = _this.default;
            }
            else if (defaultDom) {
                _this.changeView(defaultDom);
            }
            else
                return;
        }
        if (!route)
            return location.hash = '';
        // 路由匹配错误，跳转主页
        route.args = args;
        route.event.forEach(function (event) {
            event(route);
        });
        _this.changeView(route.dom);
    };
    ApeeRouter.prototype.changeView = function (dom) {
        this.hideAllRouteDom();
        dom.style.display = 'revert';
    };
    ApeeRouter.prototype.hideAllRouteDom = function () {
        var doms = document.querySelectorAll('[data-route]');
        doms.forEach(function (dom) { return dom.style.display = 'none'; });
    };
    return ApeeRouter;
}());
exports.default = ApeeRouter;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apee_router_1 = require("./apee-router");
var apeeRouter = new apee_router_1.default();
apeeRouter.set(['about']);
apeeRouter.start();
console.log(apeeRouter);

},{"./apee-router":1}]},{},[2]);
