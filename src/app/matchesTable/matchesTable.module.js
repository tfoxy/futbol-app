import dataModule from '../data/data.module.js';
import MatchesTableController from './matchesTable.controller.js';

const module = angular.module('futbolApp.matchesTable', [
  dataModule.name
])
  .controller('MatchesTableController', MatchesTableController);

export default module;
