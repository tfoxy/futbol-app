import dataModule from '../data/data.module.js';
import userDataModule from '../userData/userData.module.js';
import StandingsController from './standings.controller.js';
import standingsRouteConfig from './standings.route.js';

const module = angular.module('futbolApp.standings', [
  'ui.router',
  dataModule.name,
  userDataModule.name
])
  .config(standingsRouteConfig)
  .controller('StandingsController', StandingsController);

export default module;
