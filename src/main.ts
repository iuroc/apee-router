/**
 * APEE 路由管理模块
 */
class ApeeRouter {
    defaultRoute: Route
    /** 路由列表 */
    routeList: Record<string, Route> = {}
    constructor(options?: InitOption) {
        this.defaultRoute = this.setDefaultRoute(options?.default || 'home')
    }
    setDefaultRoute(_default: DefaultRouteOption) {
        if (typeof _default == 'string')
            return this.set(_default)
        if (Array.isArray(_default))
            return this.set(..._default)
        throw new Error('default 选项只能是 string | string[] 类型')
    }
    set(routeName: string, routeEvent?: RouteEventSetOption): Route
    set(routeName: string[], routeEvent?: RouteEventSetOption): Route[]
    set(routeName: RouteNameSetOption, routeEvent?: RouteEventSetOption) {
        const routeNames = Array.isArray(routeName) ? routeName : [routeName]
        const routes: Route[] = []
        for (let i = 0; i < routeNames.length; i++) {
            const routeName = routeNames[i]
            const routeEvents = routeEvent ? Array.isArray(routeEvent) ? routeEvent : [routeEvent] : []
            const route = this.routeList[routeName]
            // 路由已经存在，追加路由事件列表
            if (route) return route.event.push(...routeEvents), route
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
    getRouteDom(routeName: string) {
        return document.querySelector<HTMLElement>(`[data-route="${routeName}"]`)
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


new ApeeRouter()