/**
 * APEE 路由管理模块
 * @author 欧阳鹏
 * @link https://github.com/oyps/apee-router
 */
class ApeeRouter {
    /** 默认路由 */
    private defaultRoute?: Route
    /** 路由列表 */
    private routeList: Record<string, Route> = {}
    /** 是否发生过 `hashChange` 事件 */
    public hashChanged: boolean = false
    /**
     * 实例化路由管理模块
     * @param options 配置选项
     */
    public constructor(options?: InitOption) {
        if (options?.default) this.setDefaultRoute(options.default)
        if (options?.routeSet) this.setRouteOption(options.routeSet)
    }
    private setRouteOption(routeSet: RouteSetOption[]) {
        if (!Array.isArray(routeSet)) throw new Error('routeSet 类型错误')
        routeSet.forEach(set => {
            if (typeof set == 'string') this.set(set)
            else if (Array.isArray(set)) {
                if (set.length == 2 && typeof set[1] != 'string')
                    this.set(...set as [RouteNameSetOption, RouteEventSetOption])
                else this.set(set as string[])
            } else {
                throw new Error('routeSet 类型错误')
            }
        })
    }

    /**
     * 设置默认路由
     * @param _default 默认路由选项
     */
    public setDefaultRoute(_default: DefaultRouteOption) {
        if (typeof _default == 'string')
            this.defaultRoute = this.set(_default)[0]
        else if (Array.isArray(_default))
            this.defaultRoute = this.set(..._default)[0]
        else throw new Error('default 选项类型错误')
    }
    /**
     * 设置路由
     * @param routeName 路由名称，可通过数组传入多个
     * @param routeEvent 路由事件，可通过数组传入多个
     */
    public set(routeName: RouteNameSetOption, routeEvent?: RouteEventSetOption) {
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
    public getRouteDom(): NodeListOf<HTMLElement>
    /**
     * 获取某个路由 DOM
     * @param routeName 路由名称
     */
    public getRouteDom(routeName: string): HTMLElement
    /**
     * 获取所有路由 DOM，并排除某个路由 DOM
     * @param routeName 需要排除的路由名称
     * @param exclude 是否开启该功能
     */
    public getRouteDom(routeName: string, exclude: boolean): NodeListOf<HTMLElement>
    public getRouteDom(routeName?: string, exclude: boolean = false) {
        let selector
        if (exclude && routeName) selector = `[data-route]:not([data-route="${routeName}"]`
        else selector = routeName ? `[data-route="${routeName}"]` : '[data-route]'
        const result = document.querySelectorAll<HTMLElement>(selector)
        if (routeName && !exclude && result.length == 0)
            throw new Error(`${selector} 元素不存在`)
        return routeName && !exclude ? result[0] : result
    }
    /**
     * 载入路由
     * @param route 路由对象
     * @param args 路由参数
     */
    public loadRoute(route: Route, args: string[]) {
        this.getRouteDom(route.name, true).forEach(dom => {
            dom.style.display = 'none'
        })
        this.getRouteDom(route.name).style.display = 'block'
        route.args = args
        route.event.forEach(event => event(route, this))
    }
    /** 启动路由系统 */
    public start() {
        const _this = this
        const listener = (event?: HashChangeEvent) => {
            if (event) this.hashChanged = true
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
    /** 工具类 */
    public static util = {
        /** 显示元素 */
        show(dom?: HTMLElement | HTMLElement[]) {
            if (!dom) return
            const doms = dom instanceof Node ? [dom] : dom
            doms.forEach(dom => dom.style.display = 'block')
        },
        /** 隐藏 DOM */
        hide(dom?: HTMLElement | HTMLElement[]) {
            if (!dom) return
            const doms = dom instanceof Node ? [dom] : dom
            doms.forEach(dom => dom.style.display = 'none')
        },
    }
}

/** 初始化选项 */
type InitOption = {
    /** 默认路由设置选项 */
    default?: DefaultRouteOption,
    /** 路由注册选项 */
    routeSet?: RouteSetOption[]
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
export type RouteEvent = (route: Route, router: ApeeRouter) => void

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
export { ApeeRouter as Router }