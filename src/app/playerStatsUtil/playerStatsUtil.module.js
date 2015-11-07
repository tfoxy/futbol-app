import PlayerStatsUtil from './playerStatsUtil.service.js';

let module = angular.module('futbolApp.playerStatsUtil', [])
  .service('playerStatsUtil', PlayerStatsUtil);

export default module;
