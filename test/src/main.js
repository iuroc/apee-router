"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * APEE 路由管理模块
 */
var ApeeRouter = /** @class */ (function () {
    function ApeeRouter(options) {
        /** 路由列表 */
        this.routeList = {};
        this.defaultRoute = this.setDefaultRoute((options === null || options === void 0 ? void 0 : options.default) || 'home');
    }
    ApeeRouter.prototype.setDefaultRoute = function (_default) {
        if (typeof _default == 'string')
            return this.set(_default);
        if (Array.isArray(_default))
            return this.set.apply(this, _default);
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
            if (route)
                return (_a = route.event).push.apply(_a, routeEvents), route;
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
    ApeeRouter.prototype.getRouteDom = function (routeName) {
        return document.querySelector("[data-route=\"".concat(routeName, "\"]"));
    };
    return ApeeRouter;
}());
exports.default = ApeeRouter;
new ApeeRouter();
