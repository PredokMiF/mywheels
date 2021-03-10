const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const sharedVendors = require('./shared')

const DIST_PATH = path.join(__dirname, 'dist')

module.exports = {
    entry: './src/index',
    output: {
        path: DIST_PATH,
    },
    mode: 'development',
    devServer: {
        contentBase: DIST_PATH,
        hot: true,
        port: 3100,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ModuleFederationPlugin({
            name: 'vendors',
            library: { type: 'var', name: 'vendors' },
            filename: 'remoteEntry.js',
            remotes: {},
            exposes: {
                '.': './src/index',
            },
            shared: {
                ...sharedVendors,
            },
        }),
    ],
}
