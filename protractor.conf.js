'use strict';

/* global require exports process browser console */

const path = require('path');

const paths = require('./.yo-rc.json')['generator-gulp-angular'].props.paths;
const screenshotsFolder = '.tmp/screenshots';

let config = {
  // The address of a running selenium server.
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  // seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
      // When using travis, --no-sandbox arg is pushed to args
      args: []
    }
  },

  baseUrl: 'http://localhost:3000',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: [paths.e2e + '/**/*.js'],

  framework: 'mocha',
  mochaOpts: {
    timeout: 30000,
    slow: 4000
  },

  onPrepare: () => {
    // Avoid "angular could not be found on the window" error
    browser.driver.manage().window().maximize();
    return browser.get('/index.html');
  },

  onCleanUp: function(statusCode) {
    if (statusCode) {
      console.log(
        '\x1b[95mERROR SCREENSHOTS FOLDER: ' +
        fileUrl(screenshotsFolder) +
        '\x1b[0m'
      );
    }
  }
};

if (process.env.TRAVIS) {
  config.capabilities.chromeOptions.args.push('--no-sandbox');
} else {
  process.env.PROSHOT_DIR = screenshotsFolder;
  process.env.multi = 'spec=- mocha-proshot=-';
  config.mochaOpts.reporter = 'mocha-multi';
}

exports.config = config;


function fileUrl(str) {
  if (typeof str !== 'string') {
    throw new Error('Expected a string');
  }

  let pathName = path.resolve(str).replace(/\\/g, '/');

  // Windows drive letter must be prefixed with a slash
  if (pathName[0] !== '/') {
    pathName = '/' + pathName;
  }

  return encodeURI('file://' + pathName);
}
