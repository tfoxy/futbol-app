'use strict';

const path = require('path');
const gulp = require('gulp');

const karma = require('karma');

function runTests(singleRun, done) {
  karma.server.start({
    configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: singleRun,
    autoWatch: !singleRun
  }, function(failCount) {
    done(failCount ? new Error('Failed ' + failCount + ' tests.') : null);
  });
}

gulp.task('test', ['scripts:test'], (done) => {
  runTests(true, done);
});

gulp.task('test:auto', ['scripts:test-watch'], (done) => {
  runTests(false, done);
});
