'use strict';

const path = require('path');
const gulp = require('gulp');

const karma = require('karma');

function runTests(singleRun, done) {

  let localConfig = {
    configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: singleRun,
    autoWatch: !singleRun
  };

  let server = new karma.Server(localConfig, function(failCount) {
    done(failCount ? new Error('Failed ' + failCount + ' tests.') : null);
  });
  server.start();
}

gulp.task('test', ['scripts:test'], function(done) {
  runTests(true, done);
});

gulp.task('test:auto', ['scripts:test-watch'], function(done) {
  runTests(false, done);
});
