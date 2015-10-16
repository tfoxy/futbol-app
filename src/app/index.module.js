import config from './index.config.js';
import routerConfig from './index.route.js';

angular.module('futbolApp', [
  'ui.router'
])
  .config(config)
  .config(routerConfig);
