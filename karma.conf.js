var webpackConfig = require('./webpack.config');
var path = require('path');
const autoprefixer = require('autoprefixer')

const sassLoaders = [
    'css-loader',
    'postcss-loader',
    'sass-loader?includePaths[]=' + path.resolve(__dirname, 'node_modules')
];

module.exports = function (config) {
  config.set({
    basePath: path.resolve(__dirname, './'),
    files: [
      'tests/tests.webpack.js'
    ],
    preprocessors: {
      'tests/tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
          loaders: [
              {
                  test: /\.(ts|tsx)$/,
                  exclude: path.resolve(__dirname, 'node_modules'),
                  loader: 'ts-loader'
            },
            {
              test: /\.scss$/,
              loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            //Configuration required by enzyme
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
          ]
      },
      resolve: {
          //Added .json extension required by cheerio (enzyme dependency)
          extensions: ['', '.js', '.ts', '.tsx', '.json', '.scss', '.css']
      },
      //Configuration required by enzyme
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
        'config': JSON.stringify(webpackConfig.debug ? {
            serverURL: "http://localhost:3000/api"
        } : {
            serverURL: "http://67.205.146.224:3000/api"
        })
      },
      postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ]
    },
    webpackServer: {
        noInfo: true
    },
    coverageReporter: {
      type : 'text',
      dir : 'coverage/',
      file : 'coverage.txt'
    },
    frameworks: ['mocha', 'chai', 'sinon'],
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
    plugins: [
            "karma-*"
        ]
  })
}