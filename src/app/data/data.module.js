import playerStatsUtilModule from '../playerStatsUtil/playerStatsUtil.module.js';
import DataService from './data.service.js';

const module = angular.module('futbolApp.data', [
  playerStatsUtilModule.name
])
  .service('data', DataService);

export default module;
