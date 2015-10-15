'use strict';

const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');

const browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['scripts:watch', 'inject'], () => {

  gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject']);

  gulp.watch(path.join(conf.paths.src, '/app/**/*.css'), (event) => {
    if (isOnlyChange(event)) {
      browserSync.reload(event.path);
    } else {
      gulp.start('inject');
    }
  });


  gulp.watch(path.join(conf.paths.src, '/app/**/*.html'), (event) => {
    browserSync.reload(event.path);
  });
});
