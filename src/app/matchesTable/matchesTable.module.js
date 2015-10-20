import dataModule from '../data/data.module.js';
import userDataModule from '../userData/userData.module.js';
import MatchesTableController from './matchesTable.controller.js';
import matchesTableRouteConfig from './matchesTable.route.js';

const module = angular.module('futbolApp.matchesTable', [
  'ui.router',
  dataModule.name,
  userDataModule.name
])
  .config(matchesTableRouteConfig)
  .controller('MatchesTableController', MatchesTableController);

export default module;
