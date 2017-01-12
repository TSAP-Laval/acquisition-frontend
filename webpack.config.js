var debug = false;
var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?includePaths[]='+ path.resolve(__dirname, 'node_modules')
]

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: "dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "eval-cheap-source-map",

    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: true, sourcemap: false }),
        new ExtractTextPlugin('bundle.css'),
        new HtmlWebpackPlugin({
            title: "TSAP",
            template: "templates/index.ejs"
        })
    ],

    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".scss"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.scss?$/,
                loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
            }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
};