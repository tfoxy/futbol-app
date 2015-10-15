import config from './index.config';
import routerConfig from './index.route';

angular.module('futbolApp', [
  'ui.router'
])
  .config(config)
  .config(routerConfig);
