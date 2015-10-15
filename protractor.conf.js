'use strict';

/* global require exports process browser */

const paths = require('./.yo-rc.json')['generator-gulp-angular'].props.paths;
const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
const hat = require('hat');
const SpecReporter = require('jasmine-spec-reporter');


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

  framework: 'jasmine2',

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    // Remove protractor dot reporter
    print: () => {}
  },

  onPrepare: () => {
    if (!process.env.TRAVIS) {
      jasmine.getEnv().addReporter(new HtmlScreenshotReporter({
        dest: '.tmp/screenshots',
        captureOnlyFailedSpecs: true,
        pathBuilder: function() {
          return '.' + hat();
        }
      }));
    }

    // add jasmine spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({
      displayStacktrace: 'all',
      displaySpecDuration: true
    }));

    // Avoid "angular could not be found on the window" error
    browser.driver.manage().window().maximize();
    return browser.get('/index.html');
  }
};

if (process.env.TRAVIS) {
  config.capabilities.chromeOptions.args.push('--no-sandbox');
}

exports.config = config;
