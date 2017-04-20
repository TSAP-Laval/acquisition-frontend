var webpackConfig = require('./webpack.config');
var path = require('path');
const autoprefixer = require('autoprefixer')

module.exports = function(config) {
    config.set({
        basePath: path.resolve(__dirname, './'),
        files: [
            'tests/tests.webpack.js'
        ],
        preprocessors: {
            'tests/tests.webpack.js': ['webpack', 'sourcemap', 'coverage']
        },
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [{
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
                'text-encoding': 'window',
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
            type: 'text',
            dir: 'coverage/',
            file: 'coverage.txt',
            reporters: [
                // reporters not supporting the `file` property
                { type: 'html', subdir: 'html' },
                { type: 'lcov', subdir: '.', file: 'lcov.info'},
                // reporters supporting the `file` property, use `subdir` to directly
                // output them in the `dir` directory
                { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
                { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
                { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
                { type: 'text', subdir: '.', file: 'text.txt' },
                { type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
            ]
        },
        frameworks: ['mocha', 'chai', 'sinon'],
        reporters: ['mocha', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: true,
        concurrency: Infinity,
        plugins: [
            "karma-*",
            "karma-coverage"
        ]
    })
}