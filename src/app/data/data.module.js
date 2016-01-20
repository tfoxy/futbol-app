import playerStatsUtilModule from '../playerStatsUtil/playerStatsUtil.module.js';
import cardFactory from './card.factory.js';
import cardTypeFactory from './cardType.factory.js';
import divisionFactory from './division.factory.js';
import goalFactory from './goal.factory.js';
import matchFactory from './match.factory.js';
import matchTeamStatsFactory from './matchTeamStats.factory.js';
import playerFactory from './player.factory.js';
import roundFactory from './round.factory.js';
import seasonFactory from './season.factory.js';
import seasonDataFactory from './seasonData.factory.js';
import teamFactory from './team.factory.js';

const module = angular.module('futbolApp.data', [
  'js-data',
  playerStatsUtilModule.name
])
  .config(config)
  .service('Card', cardFactory)
  .service('CardType', cardTypeFactory)
  .service('Division', divisionFactory)
  .service('Goal', goalFactory)
  .service('Match', matchFactory)
  .service('MatchTeamStats', matchTeamStatsFactory)
  .service('Player', playerFactory)
  .service('Round', roundFactory)
  .service('Season', seasonFactory)
  .service('SeasonData', seasonDataFactory)
  .service('Team', teamFactory)
  /* eslint-disable no-unused-vars */
  .run(function(Card, CardType, Division, Goal, Match, MatchTeamStats, Player, Round, Season, SeasonData, Team) {
    // noop
  });
  /* eslint-enable no-unused-vars */

export default module;


function config(DSHttpAdapterProvider) {
  DSHttpAdapterProvider.defaults.basePath = 'api';
  DSHttpAdapterProvider.defaults.suffix = '.json';
}
