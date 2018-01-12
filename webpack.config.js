const webpack = require('webpack')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const plugins = []

if (!isProduction) {
    plugins.push(
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['dist'] },
            files: ['./dist/*'],
        })
    )
}

module.exports = {
    entry: './src/canvas.js',
    output: {
        path: __dirname + '/dist/js',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    },
                },
            },
        ],
    },
    plugins,
    watch: !isProduction,
    devtool: isProduction ? false : 'source-map',
}
