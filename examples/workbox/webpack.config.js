const path = require('path');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PUBLIC_PATH = '/sw-tools/examples/workbox/dist/';

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'src/index'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].js',
        publicPath: PUBLIC_PATH,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 100,
                    name: '[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('index.css'),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new WorkboxWebpackPlugin.InjectManifest({
            swSrc: path.resolve(__dirname, 'src/service-worker.js'),
            swDest: 'service-worker.js',
            exclude: [/\.png$/],
            importWorkboxFrom: 'local'
        })
    ]
}

new WorkboxWebpackPlugin.InjectManifest({
    swSrc: path.resolve(__dirname, 'src/service-worker.js'),
    swDest: 'service-worker.js',
    exclude: [/\.png$/],
    importWorkboxFrom: 'local'
})