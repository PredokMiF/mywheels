const path = require('path')
const webpack = require('webpack')
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
        hot: true,
        port: 3101,
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
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new ModuleFederationPlugin({
            name: 'core',
            library: { type: 'var', name: 'core' },
            filename: 'remoteEntry.js',
            remotes: {
                "@mywheels/vendors": "vendors",
            },
            exposes: {
                './Player': './src/export/Player.js',
            },
            shared: {
                ...sharedVendors,
            },
        }),
    ],
}
