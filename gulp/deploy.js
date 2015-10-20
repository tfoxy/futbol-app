'use strict';

const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');

const ghPages = require('gulp-gh-pages');

gulp.task('deploy', () => {
  return gulp.src(path.join(conf.paths.dist, '/**/*'))
    .pipe(ghPages({
      push: false,
      remoteUrl: 'https://github.com/tfoxy/futbol-la-providencia.git'
    }));
});
