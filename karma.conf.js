'use strict';

const path = require('path');
const conf = require('./gulp/conf');

const _ = require('lodash');
const wiredep = require('wiredep');
const babelMoreOptions = {presets: 'es2015'};

const pathSrcHtml = [
  path.join(conf.paths.tmp, '/serve/**/*.html'),
  path.join(conf.paths.src, '/**/*.html')
];


function listFiles() {
  let wiredepOptions = _.extend({}, conf.wiredep, {
    dependencies: true,
    devDependencies: true
  });

  let patterns = wiredep(wiredepOptions).js
    .concat([
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      path.join(conf.paths.src, '/test.js'),
      path.join(conf.paths.tmp, '/partials/templateCacheHtml.js')
    ])
    .concat(pathSrcHtml);

  let files = patterns.map(function(pattern) {
    return {
      pattern: pattern
    };
  });
  files.push({
    pattern: path.join(conf.paths.src, '/assets/**/*'),
    included: false,
    served: true,
    watched: false
  });
  return files;
}

module.exports = function(config) {

  let configuration = {
    files: listFiles(),

    singleRun: true,

    autoWatch: false,

    ngHtml2JsPreprocessor: {
      stripPrefix: conf.paths.src + '/'
    },

    logLevel: config.LOG_INFO,

    babelPreprocessor: {
      options: {
        sourceMap: 'inline'
      },
      filename: function(file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function(file) {
        return file.originalPath;
      }
    },

    frameworks: [
      'mocha',
      'chai-as-promised',
      'chai-sinon'
    ],

    browsers: ['PhantomJS'],

    plugins: [
      'karma-babel-preprocessor',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chai-as-promised',
      'karma-chai-sinon',
      'karma-ng-html2js-preprocessor',
      'karma-webpack'
    ],

    // coverageReporter: {type: 'html', dir: 'coverage/'},
    coverageReporter: {
      // configure the reporter to use isparta for JavaScript coverage
      // Only on { "karma-coverage": "douglasduteil/karma-coverage#next" }
      instrumenters: {isparta: require('isparta')},
      instrumenter: {
        '**/*.js': 'isparta'
      },
      instrumenterOptions: {
        isparta: {babel: babelMoreOptions}
      }
    },

    reporters: ['mocha', 'coverage'],

    preprocessors: {
      'src/**/*.html': ['ng-html2js'],
      'src/**/*.spec.js': ['babel'],
      'src/test.js': ['webpack']
    },

    webpack: {
      // *optional* babel options: isparta will use it as well as babel-loader
      babel: {
        presets: ['es2015']
      },
      // *optional* isparta options: istanbul behind isparta will use it
      isparta: {
        embedSource: true,
        noAutoWrap: true,
        // these babel options will be passed only to isparta and not to babel-loader
        babel: {
          presets: ['es2015']
        }
      },
      module: {
        preLoaders: [
          // transpile all files except testing sources with babel as usual
          {
            test: /\.js$/,
            exclude: [
              'src/app/**/*.spec.js',
              path.resolve('node_modules/')
            ],
            loader: 'isparta'
          }
        ]
      },
      webpackMiddleware: {
        stats: {
          chunks: false
        }
      }
    },

    proxies: {
      '/assets/': path.join('/base/', conf.paths.src, '/assets/')
    }
  };

  // This block is needed to execute Chrome on Travis
  // If you ever plan to use Chrome and Travis, you can keep it
  // If not, you can safely remove it
  // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
  if (configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
    configuration.customLaunchers = {
      'chrome-travis-ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    };
    configuration.browsers = ['chrome-travis-ci'];
  }

  config.set(configuration);
};
