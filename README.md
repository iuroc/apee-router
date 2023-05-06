# Apee-Router

ApeeRouter 是一个基于浏览器的前端路由管理器。

它能够帮助我们方便地实现单页面应用中页面之间的跳转和传参。

通过配置路由表，可以轻松实现动态添加、删除和修改路由的功能。

这是一个专为前端开发者设计的路由管理类库，它通过监听 `hashchange` 事件来实现页面的切换。

每个路由都是一个独立的对象，拥有自己的事件队列、DOM 绑定和数据缓存区，实现了路由的独立管理，提高了代码的可维护性和可扩展性。

同时，该类库采用 CSS `display` 属性来实现页面的切换效果，让用户体验更加流畅。

该类库易于使用，可用于各种前端项目中，为前端开发者提供了更加便捷和高效的路由管理方案。


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
    import ApeeRouter from 'apee-router'
    // JavaScript
    const ApeeRouter = require('apee-router').default
    ```

3. 创建 ApeeRouter 对象

    使用 `new`  关键字，创建一个对象。

    ```ts
    const router = new ApeeRouter()
    ```

4. 设置路由

    - 通过 `ApeeRouter` 类的构造函数设置路由

        ```ts
        new ApeeRouter({
            /** 可选，默认路由 */
            default: 'home',
            /** 可选，注册路由列表 */
            routeSet: ['about', ['list', (route) => {

            }], 'share']
        })
        ```
    - 通过 `set` 方法设置路由

        ```ts
        const router = new ApeeRouter()
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
    router.show()
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
    public loadRoute(route: Route, args: string[]): void
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
/** 路由名称设置选项 */
type RouteNameSetOption = string | string[]
/** 路由事件设置选项 */
type RouteEventSetOption = RouteEvent | RouteEvent[]
/** 路由设置选项 */
type RouteSetOption = RouteNameSetOption | [RouteNameSetOption, RouteEventSetOption]
/** 路由事件 */
type RouteEvent = (route: Route) => void
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