/* global __dirname module */
const path = require('path');

const config = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './docs'),
        filename: 'js/main.js',
        publicPath: 'js/'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};

module.exports = (env, options) => {
    config.devtool = options.mode === "production"
                    ? false
                    : 'cheap-module-eval-source-map';

    return config;
};