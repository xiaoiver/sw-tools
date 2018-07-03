## 使用说明

安装构建依赖
```bash
npm install
```

构建全部示例项目
```bash
npm run build
```

* 示例项目位于 `/examples` 下
* 为了发布到 Github Page 上，修改了 `PUBLIC_PATH`

## sw-precache

使用 sw-precache-webpack-plugin 创建预缓存列表。

会生成一个全新的 Service Worker。

## sw-toolbox

由于 sw-toolbox 已经集成到了 sw-precache 中，因此同样可以使用 sw-precache-webpack-plugin 配置动态缓存列表。

```javascript
new SWPrecacheWebpackPlugin({
    cacheId: 'sw-tools',
    filename: 'service-worker.js',
    minify: false,
    navigateFallback: PUBLIC_PATH + 'index.html',
    staticFileGlobsIgnorePatterns: [/\.map$/, /\.png$/],
    runtimeCaching: [{
        urlPattern: /\.png$/,
        handler: 'networkFirst'
    }]
})
```

会生成一个全新的 Service Worker。

## workbox

使用 workbox-webpack-plugin 扩展已有 Service Worker。
