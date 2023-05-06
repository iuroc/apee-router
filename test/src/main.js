"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * APEE 路由管理模块
 */
var ApeeRouter = /** @class */ (function () {
    /**
     * 实例化路由管理模块
     * @param options 配置选项
     */
    function ApeeRouter(options) {
        /** 路由列表 */
        this.routeList = {};
        if (options === null || options === void 0 ? void 0 : options.default)
            this.setDefaultRoute(options.default);
        if (options === null || options === void 0 ? void 0 : options.routeSet)
            this.setRouteOption(options.routeSet);
    }
    ApeeRouter.prototype.setRouteOption = function (routeSet) {
        var _this_1 = this;
        if (!Array.isArray(routeSet))
            throw new Error('routeSet 类型错误');
        routeSet.forEach(function (set) {
            if (typeof set == 'string')
                _this_1.set(set);
            else if (Array.isArray(set)) {
                if (set.length == 2 && typeof set[1] != 'string')
                    _this_1.set.apply(_this_1, set);
                else
                    _this_1.set(set);
            }
            else {
                throw new Error('routeSet 类型错误');
            }
        });
    };
    ApeeRouter.prototype.setDefaultRoute = function (_default) {
        if (typeof _default == 'string')
            this.defaultRoute = this.set(_default)[0];
        else if (Array.isArray(_default))
            this.defaultRoute = this.set.apply(this, _default)[0];
        else
            throw new Error('default 选项只能是 string | string[] 类型');
    };
    ApeeRouter.prototype.set = function (routeName, routeEvent) {
        var _a;
        var routeNames = Array.isArray(routeName) ? routeName : [routeName];
        var routes = [];
        for (var i = 0; i < routeNames.length; i++) {
            var routeName_1 = routeNames[i];
            var routeEvents = routeEvent ? Array.isArray(routeEvent) ? routeEvent : [routeEvent] : [];
            var route = this.routeList[routeName_1];
            // 路由已经存在，追加路由事件列表
            if (route) {
                (_a = route.event).push.apply(_a, routeEvents);
                routes.push(route);
                continue;
            }
            // 路由不存在，开始创建新路由
            var dom = this.getRouteDom(routeName_1);
            // 路由对应的 DOM 不存在
            if (!dom)
                throw new Error("data-route=\"".concat(routeName_1, "\" \u7684 HTML \u5143\u7D20\u6CA1\u6709\u627E\u5230"));
            // 创建新路由
            var newRoute = this.routeList[routeName_1] = {
                name: routeName_1,
                event: routeEvents,
                dom: dom,
                data: {},
                args: [],
                status: 0
            };
            routes.push(newRoute);
        }
        return routes;
    };
    ApeeRouter.prototype.getRouteDom = function (routeName, exclude) {
        if (exclude === void 0) { exclude = false; }
        var selector;
        if (exclude && routeName)
            selector = "[data-route]:not([data-route=\"".concat(routeName, "\"]");
        else
            selector = routeName ? "[data-route=\"".concat(routeName, "\"]") : '[data-route]';
        var result = document.querySelectorAll(selector);
        if (result.length == 0)
            throw new Error("".concat(selector, " \u5143\u7D20\u4E0D\u5B58\u5728"));
        return routeName && !exclude ? result[0] : result;
    };
    /**
     * 载入路由
     * @param route 路由对象
     * @param args 路由参数
     */
    ApeeRouter.prototype.loadRoute = function (route, args) {
        this.getRouteDom(route.name, true).forEach(function (dom) {
            dom.style.display = 'none';
        });
        this.getRouteDom(route.name).style.display = 'block';
        route.args = args;
        route.event.forEach(function (event) { return event(route); });
    };
    /** 启动路由系统 */
    ApeeRouter.prototype.start = function () {
        var _this = this;
        var listener = function (event) {
            var newUrl = (event === null || event === void 0 ? void 0 : event.newURL) || location.href;
            var newHash = new URL(newUrl).hash;
            var args = newHash.split('/').slice(2);
            if (newHash == '')
                return _this.loadRoute(_this.defaultRoute, args);
            var routeName = newHash.split('/')[1];
            var route = _this.routeList[routeName];
            if (!route)
                return location.hash = '';
            _this.loadRoute(route, args);
        };
        if (!this.defaultRoute)
            this.setDefaultRoute('home');
        window.addEventListener('hashchange', listener);
        listener();
    };
    /** 工具类 */
    ApeeRouter.util = {
        /** 显示元素 */
        show: function (dom) {
            if (!dom)
                return;
            var doms = dom instanceof Node ? [dom] : dom;
            doms.forEach(function (dom) { return dom.style.display = 'block'; });
        },
        /** 隐藏 DOM */
        hide: function (dom) {
            if (!dom)
                return;
            var doms = dom instanceof Node ? [dom] : dom;
            doms.forEach(function (dom) { return dom.style.display = 'none'; });
        },
    };
    return ApeeRouter;
}());
exports.default = ApeeRouter;
