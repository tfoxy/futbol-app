import dataModule from '../data/data.module.js';
import userDataModule from '../userData/userData.module.js';
import PlayersController from './players.controller.js';
import playersRouteConfig from './players.route.js';

const module = angular.module('futbolApp.players', [
  'ui.router',
  dataModule.name,
  userDataModule.name
])
  .config(playersRouteConfig)
  .controller('PlayersController', PlayersController);

export default module;
