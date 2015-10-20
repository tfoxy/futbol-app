import dataModule from '../data/data.module.js';
import TeamController from './team.controller.js';
import teamRouteConfig from './team.route.js';

const module = angular.module('futbolApp.team', [
  'ui.router',
  dataModule.name
])
  .config(teamRouteConfig)
  .controller('TeamController', TeamController);

export default module;
