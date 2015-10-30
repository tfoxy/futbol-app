import dataModule from '../data/data.module.js';
import matchRouterConfig from './match.router.js';
import MatchController from './match.controller.js';
import matchPlayersTableDirective from './matchPlayersTable.directive.js';

const module = angular.module('futbolApp.match', [
  dataModule.name
])
  .config(matchRouterConfig)
  .controller('MatchController', MatchController)
  .directive('matchPlayersTable', matchPlayersTableDirective);

export default module;
