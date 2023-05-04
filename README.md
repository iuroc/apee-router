# Apee-Router

> 原生 JS 实现的路由管理系统

## 使用方法

### 1. 安装

- 通过 npm 安装

    ```bash
    npm install apee-router
    ```
- 通过 `<script>` 引入

    ```html
    <script src="apee-router.js"></script>
    ```

### 2. 实例化 ApeeRouter 类

- 使用 TypeScript

    ```typescript
    import ApeeRouter from 'apee-router'
    const apeeRouter = new ApeeRouter()
    ```
- 使用 JavaScript

    ```javascript
    const ApeeRouter = require('apee-router')
    const apeeRouter = new ApeeRouter()
    ```
- 使用 `<script>` 引入

    ```javascript
    const apeeRouter = new ApeeRouter()
    ```

### 注册路由

- 方法 1：在构造函数中设置

    ```typescript
    const apeeRouter = new ApeeRouter({
        routes: ['home', 'about', 'list']
    })
    ```
- 方法 2：使用 `set` 方法设置

    ```typescript
    const apeeRouter = new ApeeRouter()
    apeeRouter.set('home')
    apeeRouter.set('home', (route: Route))
    apeeRouter.set(['about', 'list'])

    ```