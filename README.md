# Apee-Router

Apee-Router 是一个简单且轻量级的 JavaScript 路由库，允许开发人员轻松处理他们的 Web 应用程序中的路由。

它提供了一种定义路由、设置默认路由和根据 URL 更改加载路由的方式。

## 使用方法

1. 安装 Apee-Router

    - 通过 npm

        ```bash
        npm install apee-router
        ```
    - 通过 `<script>`

        ```html
        <!-- 未压缩版本 -->
        <script src="https://cdn.jsdelivr.net/npm/apee-router/dist/apee-router.js"></script>
        <!-- 压缩版本 -->
        <script src="https://cdn.jsdelivr.net/npm/apee-router/dist/apee-router.min.js"></script>
        ```

2. 导入 `ApeeRouter` 类

    如果您使用 `<script>` 引入 Apee-Router，则直接获得全局的 ApeeRouter 类。

    ```ts
    // TypeScript
    import { Router } from 'apee-router'
    // JavaScript
    const { Router } = require("apee-router")
    ```

3. 创建 ApeeRouter 对象

    使用 `new`  关键字，创建一个对象。

    ```ts
    const router = new Router()
    ```

4. 设置路由

    - 通过 `ApeeRouter` 类的构造函数设置路由

        ```ts
        new Router({
            /** 可选，默认路由 */
            default: 'home',
            /** 可选，注册路由列表 */
            routeSet: ['about', ['list', (route, router) => {

            }], 'share']
        })
        ```
    - 通过 `set` 方法设置路由

        ```ts
        const router = new Router()
        const routeEvent = (route) => {
            console.log(route.name)
        }

        // 单个路由 + 单个路由事件
        router.set('home', routeEvent)
        // 单个路由 + 单个路由事件
        router.set('home', [routeEvent, routeEvent])
        // 多个路由 + 单个路由事件
        router.set(['home', 'about'], routeEvent)
        // 多个路由 + 多个路由事件
        router.set(['home', 'about'], [routeEvent, routeEvent])
        ```
6. 启动路由

    ```ts
    router.start()
    ```
7. 设置 CSS

    ```css
    [data-route] {
        display: none;
    }
    ```
8. 创建 HTML

    ```html
    <div data-route="home"></div>
    <div data-route="list"></div>
    <div data-route="share"></div>
    <div data-route="about"></div>
    ```

    您也可以在 VSCode 中新建 HTML 代码片段，输入 apr 即可快捷插入路由 DOM。

    ```json
    "ApeeRouter": {
		"prefix": "apee-router",
		"body": "<div data-route=\"$1\">\n    $2\n</div>\n",
		"description": "插入一个 ApeeRouter 路由 DOM"
	},
    ```

## API 文档

- `constructor` 方法

    ```ts
    /**
     * 实例化路由管理模块
     * @param options 配置选项
     */
    public constructor(options?: InitOption): void
    ```
- `set` 方法

    ```ts
    /**
     * 设置路由
     * @param routeName 路由名称，可通过数组传入多个
     * @param routeEvent 路由事件，可通过数组传入多个
     */
    public set(routeName: RouteNameSetOption, routeEvent?: RouteEventSetOption): Route[]
    ```
- `setDefaultRoute` 方法

    ```ts
    /**
     * 设置默认路由
     * @param _default 默认路由选项
     */
    public setDefaultRoute(_default: DefaultRouteOption): void
    ```
- `getRouteDom` 方法

    ```ts
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
    ```
- `loadRoute` 方法

    ```ts
    /**
     * 载入路由
     * @param route 路由对象
     * @param args 路由参数
     */
    public loadRoute(route: Route, args: string[] = []): void
    ```

- `start` 方法

    ```ts
    /** 启动路由系统 */
    public start(): void
    ```
- `ApeeRouter.util` 工具类

    ```ts
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
    ```

## 类型定义

```ts
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
```

## 开发环境

- 打包项目

    ```bash
    npm run build
    ```
- 测试环境

    ```bash
    npm run test
    ```

## 关于项目

- 作者：欧阳鹏
- 公众号：代码十级（微信搜索，点点关注哦）
- 博客：https://apee.top
- 开发日期：2023 年 5 月 7 日
