# Apee-Router

这是一个专为前端开发者设计的路由管理类库，它通过监听 `hashchange` 事件来实现页面的切换。

每个路由都是一个独立的对象，拥有自己的事件队列、DOM 绑定和数据缓存区，实现了路由的独立管理，提高了代码的可维护性和可扩展性。

同时，该类库采用 CSS `display` 属性来实现页面的切换效果，让用户体验更加流畅。

该类库易于使用，可用于各种前端项目中，为前端开发者提供了更加便捷和高效的路由管理方案。

## 核心概念

1. 路由设置选项

    【路由设置选项】由【路由名称设置选项】和【路由事件设置选项】组成。

    在设置路由时，需要填写【路由设置选项】。

    基本语法为：

    ```
    路由名称设置选项[, 路由事件设置选项]
    ```

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

    实例化时，可以传入配置选项。

    ```ts
    const router = new ApeeRouter({
        default: 'main',
        routeSet: []
    })
    ```

    配置选项说明：

    - `default`：默认路由，示例：

        ```ts
        const routeEvent = (route) => {
            console.log(route)
        }

        // 设置路由名称
        default: 'main'

        // 设置路由事件
        default: ['main', routeEvent]

        // 设置多个事件
        default: ['main', [routeEvent, routeEvent, ...]]
        ```

    - `routeSet`：路由注册列表，是一个数组

        ```ts
        // 不设置事件
        routeSet: ['main', 'list', ...]

        // 设置事件
        routeSet: ['main', ['list', routeEvent], 'about', ...]
        
        // 多个路由
        routeSet: ['main', [['list', 'about', ...], routeEvent]]
        ```
4. 创建路由

    ```

    ```