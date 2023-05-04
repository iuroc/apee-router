"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Apee 路由管理系统
 * @author 欧阳鹏
 * @link https://github.com/oyps/apee-router
 */
var ApeeRouter = /** @class */ (function () {
    function ApeeRouter(options) {
        var _this = this;
        this.routeList = {};
        this.default = options.default || 'home';
        /** 注册路由名称列表 */
        var routeNames = options.routes || [];
        routeNames.forEach(function (routeName) { return _this.set(routeName); });
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
        routeNames.forEach(function (routeName) {
        });
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
        var _this = this;
        window.addEventListener('hashchange', function (event) {
            _this.loadRoute(_this.getNowRoute(event));
        });
        this.loadRoute(this.getNowRoute());
    };
    ApeeRouter.prototype.getNowRoute = function (event) {
        var newHash = event ? new URL(event.newURL).hash : location.hash;
        var routeName = newHash.split('/')[1];
        var args = newHash.split('/').slice(2);
        if (!routeName)
            routeName = this.default;
        var route = this.routeList[routeName];
        route.args = args;
        return route;
    };
    /**
     * 载入路由
     * @param route 路由对象
     * @returns
     */
    ApeeRouter.prototype.loadRoute = function (route) {
        // 路由匹配错误，跳转主页
        if (!route)
            return location.hash = '';
        this.hideAllRouteDom();
        if (route.dom) {
            route.dom.style.display = 'revert';
            route.event.forEach(function (event) {
                event(route);
            });
        }
    };
    ApeeRouter.prototype.hideAllRouteDom = function () {
        var doms = document.querySelectorAll('[data-route]');
        doms.forEach(function (dom) { return dom.style.display = 'none'; });
    };
    return ApeeRouter;
}());
exports.default = ApeeRouter;
