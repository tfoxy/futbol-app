import dataModule from '../data/data.module.js';
import StandingsController from './standings.controller.js';

const module = angular.module('futbolApp.standings', [
  dataModule.name
])
  .controller('StandingsController', StandingsController);

export default module;
