'use strict';

const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');

const browserSync = require('browser-sync');
const browserSyncSpa = require('browser-sync-spa');

const util = require('util');

function browserSyncInit(baseDir, browser, testing) {
  browser = browser === undefined ? 'default' : browser;

  let routes = null;
  if (baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  let server = {
    baseDir: baseDir,
    routes: routes
  };

  /*
   * You can add a proxy to your backend by uncommenting the line below.
   * You just have to configure a context which will we redirected and the target url.
   * Example: $http.get('/users') requests will be automatically proxified.
   *
   * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.0.5/README.md
   */
  // server.middleware = proxyMiddleware('/users',
  //   {target: 'http://jsonplaceholder.typicode.com', proxyHost: 'jsonplaceholder.typicode.com'});

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: browser,
    notify: !testing
  });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', ['watch'], () => {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:dist', ['build'], () => {
  browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['inject'], () => {
  browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], [], true);
});

gulp.task('serve:e2e-dist', ['build'], () => {
  browserSyncInit(conf.paths.dist, [], true);
});
