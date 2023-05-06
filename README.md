# Apee-Router

> APEE 路由控制模块，原生 JS 实现

## 使用方法

### 1. 安装

- 通过 npm 安装

    ```bash
    npm install apee-router
    ```
- 通过 `<script>` 引入

    ```html
    <!-- 未压缩版本 -->
    <script src="/dist/apee-router.js"></script>
    <!-- 压缩版本 -->
    <script src="/dist/apee-router.min.js"></script>
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
    const apeeRouter = new ApeeRouter.default()
    ```
- 使用 `<script>` 引入

    ```javascript
    const apeeRouter = new ApeeRouter()
    ```

### 3. 注册路由

- 方法 1：在构造函数中设置

    ```typescript
    const apeeRouter = new ApeeRouter({
        routes: ['home', 'about', 'list']
    })
    ```
- 方法 2：使用 `set` 方法设置

    ```typescript
    apeeRouter.set('home')
    apeeRouter.set('home', (route: Route) => {})
    apeeRouter.set(['about', 'list'], (route: Route) => {})
    ```

### 4. 启动路由

```typescript
apeeRouter.start()
```

## 关于

- 作者：欧阳鹏
- 公众号：代码十级
- 开发日期：2023 年 5 月 5 日

