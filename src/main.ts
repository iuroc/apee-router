/**
 * Apee 路由管理系统
 * @author 欧阳鹏
 * @link https://github.com/oyps/apee-router
 */
class ApeeRouter {
    /** 路由对象集合 */
    routeList: Record<string, Route>
    /** 默认路由名称 */
    default: string
    constructor(options?: InitOptions) {
        this.routeList = {}
        this.default = options?.default || 'home'
        /** 注册路由名称列表 */
        const routeNames = options?.routes || []
        routeNames.forEach(routeName => this.set(routeName))
    }
    /**
     * 注册路由
     * @param routeName 路由名称
     * @param event 路由事件，多次设置可执行多个事件
     */
    set(routeNames: string | string[], event?: RouteEvent) {
        if (typeof routeNames == 'string') routeNames = [routeNames]
        for (let i = 0; i < routeNames.length; i++) {
            const routeName = routeNames[i]
            const dom = this.getDom(routeName)
            // DOM 不存在，跳过该条路由设置
            if (!dom) continue
            if (!this.routeList[routeName])
                this.routeList[routeName] = {
                    data: {},
                    event: [],
                    args: [],
                    name: routeName,
                    status: 0,
                    dom: dom
                }
            const route = this.routeList[routeName]
            route.name = routeName
            if (typeof event == 'function')
                route.event.push(event)
        }
    }
    /**
     * 获取路由目标 DOM
     * @param routeName 路由名称
     * @returns 路由目标 DOM
     */
    getDom(routeName: string) {
        return document.querySelector<HTMLElement>(`[data-route="${routeName}"]`)
    }
    /**
     * 初始化路由
     * @param routeName 路由名称
     * @returns 路由对象
     */
    initRoute(routeName: string): Route {
        const route = this.routeList[routeName]
        route.name = routeName
        if (!route.event) route.event = []
        if (!route.data) route.data = {}
        if (!route.status) route.event = []
        return route
    }
    /** 启动路由系统 */
    start() {
        const _this = this
        window.addEventListener('hashchange', (event) => {
            this.loadRoute(_this, event)
        })
        this.loadRoute(_this)
    }
    /**
     * 载入路由
     * @param route 路由对象
     * @returns 
     */
    loadRoute(_this: this, event?: HashChangeEvent) {
        let newHash = event ? new URL(event.newURL).hash : location.hash
        let routeName = newHash.split('/')[1]
        let args = newHash.split('/').slice(2)
        const route = _this.routeList[routeName]
        if (!newHash) {
            const defaultDom = this.getDom(_this.default)
            if (route) {
                routeName = _this.default
            } else if (defaultDom) {
                _this.changeView(defaultDom)
            } else return
        }
        if (!route) return location.hash = ''
        // 路由匹配错误，跳转主页
        route.args = args
        route.event.forEach(event => {
            event(route)
        })
        _this.changeView(route.dom)
    }
    changeView(dom: HTMLElement) {
        this.hideAllRouteDom()
        dom.style.display = 'revert'
    }
    hideAllRouteDom() {
        const doms = document.querySelectorAll<HTMLElement>('[data-route]')
        doms.forEach(dom => dom.style.display = 'none')
    }
}

/** 配置选项 */
type InitOptions = {
    /** 注册路由名称列表 */
    routes?: string[],
    /** 默认路由名称 */
    default?: string
}

/** 路由对象 */
type Route = {
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
    args: string[]
}
/** 路由事件 */
type RouteEvent = (route: Route) => void


export default ApeeRouter