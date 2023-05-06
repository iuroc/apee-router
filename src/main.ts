/**
 * APEE 路由管理模块
 */
class ApeeRouter {
    /** 默认路由 */
    defaultRoute?: Route
    /** 路由列表 */
    routeList: Record<string, Route> = {}
    constructor(options?: InitOption) {
        if (options?.default) this.setDefaultRoute(options.default)
    }
    setDefaultRoute(_default: DefaultRouteOption) {
        if (typeof _default == 'string')
            this.defaultRoute = this.set(_default)[0]
        else if (Array.isArray(_default))
            this.defaultRoute = this.set(..._default)[0]
        else throw new Error('default 选项只能是 string | string[] 类型')
    }
    set(routeName: string | string[], routeEvent?: RouteEventSetOption): Route[]
    set(routeName: RouteNameSetOption, routeEvent?: RouteEventSetOption) {
        const routeNames = Array.isArray(routeName) ? routeName : [routeName]
        const routes: Route[] = []
        for (let i = 0; i < routeNames.length; i++) {
            const routeName = routeNames[i]
            const routeEvents = routeEvent ? Array.isArray(routeEvent) ? routeEvent : [routeEvent] : []
            const route = this.routeList[routeName]
            // 路由已经存在，追加路由事件列表
            if (route) {
                route.event.push(...routeEvents)
                routes.push(route)
                continue
            }
            // 路由不存在，开始创建新路由
            const dom = this.getRouteDom(routeName)
            // 路由对应的 DOM 不存在
            if (!dom) throw new Error(`data-route="${routeName}" 的 HTML 元素没有找到`)
            // 创建新路由
            const newRoute = this.routeList[routeName] = {
                name: routeName,
                event: routeEvents,
                dom: dom,
                data: {},
                args: [],
                status: 0
            }
            routes.push(newRoute)
        }
        return routes
    }

    /** 获取所有路由 DOM */
    getRouteDom(): NodeListOf<HTMLElement>
    /**
     * 获取某个路由 DOM
     * @param routeName 路由名称
     */
    getRouteDom(routeName: string): HTMLElement
    /**
     * 获取所有路由 DOM，并排除某个路由 DOM
     * @param routeName 需要排除的路由名称
     * @param exclude 是否开启该功能
     */
    getRouteDom(routeName: string, exclude: boolean): NodeListOf<HTMLElement>
    getRouteDom(routeName?: string, exclude: boolean = false) {
        let selector
        if (exclude && routeName) selector = `[data-route]:not([data-route="${routeName}"]`
        else selector = routeName ? `[data-route="${routeName}"]` : '[data-route]'
        const result = document.querySelectorAll<HTMLElement>(selector)
        return routeName && !exclude ? result[0] : result
    }
    loadRoute(route: Route, args: string[]) {
        this.getRouteDom(route.name, true).forEach(dom => {
            dom.style.display = 'none'
        })
        this.getRouteDom(route.name).style.display = 'block'
        route.args = args
        route.event.forEach(event => event(route))
    }

    start() {
        const _this = this
        const listener = (event?: HashChangeEvent) => {
            let newUrl = event?.newURL || location.href
            let newHash = new URL(newUrl).hash
            const args = newHash.split('/').slice(2)
            if (newHash == '') return _this.loadRoute(_this.defaultRoute as Route, args)
            let routeName = newHash.split('/')[1]
            const route = _this.routeList[routeName]
            if (!route) return location.hash = ''
            _this.loadRoute(route, args)
        }
        if (!this.defaultRoute) this.setDefaultRoute('home')
        window.addEventListener('hashchange', listener)
        listener()
    }
}

/** 初始化选项 */
type InitOption = {
    default: DefaultRouteOption
}

/** 默认路由选项 */
type DefaultRouteOption = string | [string, RouteEvent | RouteEvent[]]

/** 路由名称设置选项 */
type RouteNameSetOption = string | string[]
/** 路由事件设置选项 */
type RouteEventSetOption = RouteEvent | RouteEvent[]
/** 路由设置选项 */
type RouteSetOption = RouteNameSetOption | [RouteNameSetOption, RouteEventSetOption]
/** 路由事件 */
export type RouteEvent = (route: Route) => void

/** 路由对象 */
export type Route = {
    /** 路由名称 */
    name: string
    /** 路由数据存储区 */
    data: Record<string, any>,
    /** 路由就绪状态 */
    status: number,
    /** 路由事件列表 */
    event: RouteEvent[],
    /** 路由目标 DOM */
    dom: HTMLElement,
    /** 路由参数 */
    args: string[]
}

export default ApeeRouter