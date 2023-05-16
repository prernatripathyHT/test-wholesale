const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'production',

    devtool: 'source-map',

    optimization: {
        minimize: false
    },

    performance: {
        hints: false
    },

    entry: './assets/js/common.js',

    output: {
        path: __dirname + 'assets',
        filename: 'theme.js.liquid',
    },

    plugins: [
        new Dotenv()
    ]
};
