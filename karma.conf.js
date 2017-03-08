var webpack = require('karma-webpack')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      './test/index.js'
    ],
    preprocessors: {
      './test/index.js': ['webpack', 'sourcemap']
    },
    webpack: {
      resolve: {
          //Added .json extension required by cheerio (enzyme dependency)
          extensions: ['.js', '.ts', '.tsx', '.json']
      },
      devtool: 'inline-source-map',
      module: {
          loaders: [
              {
                  test: /\.(ts|tsx)$/,
                  exclude: /node_modules/,
                  loader: 'ts-loader'
            },
            //Configuration required by enzyme
            {
                test: /\.json$/,
                loader: 'json'
            }
          ]
      },
      //Configuration required by enzyme
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
      }
    },
    webpackMiddleware: {
        // webpack-dev-middleware configuration
        // i. e.
        noInfo: true
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    captureTimeout: 60000,
    singleRun: true,
    concurrency: Infinity,
    plugins: [
            require('karma-chrome-launcher'),
            require('karma-sourcemap-loader'),
            require('karma-webpack'),
            require('karma-chai'),
            require('karma-mocha'),
            require('karma-sinon'),
        ]
  })
}