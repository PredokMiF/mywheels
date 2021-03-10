const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const sharedVendors = require('@mywheels/vendors/shared')

const DIST_PATH = path.join(__dirname, 'dist')

module.exports = {
    entry: './src/index',
    output: {
        path: DIST_PATH,
    },
    mode: 'development',
    devServer: {
        contentBase: DIST_PATH,
        port: 3202,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new ModuleFederationPlugin({
            name: 'app1',
            library: { type: 'var', name: 'app2' },
            filename: 'remoteEntry.js',
            remotes: {
                "@mywheels/vendors": "vendors",
                "@mywheels/core": "core",
            },
            exposes: {},
            shared: {
                ...sharedVendors,
            },
        }),
    ],
}
