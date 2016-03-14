import config from './index.config.js';
import fillRootScope from'./fillRootScope.run.js';
import listenRootScopeEvents from './listenRootScopeEvents.run.js';

import routeModule from './route.module.js';
import standingsModule from './standings/standings.module.js';
import matchesTableModule from './matchesTable/matchesTable.module.js';
import teamModule from './team/team.module.js';
import fixtureModule from './fixture/fixture.module.js';
import matchModule from './match/match.module.js';
import playersModule from './players/players.module.js';

export default angular.module('futbolApp', [
  'ngTouch',
  'ngAria',
  routeModule.name,
  standingsModule.name,
  matchesTableModule.name,
  teamModule.name,
  fixtureModule.name,
  matchModule.name,
  playersModule.name
])
  .config(config)
  .run(fillRootScope)
  .run(listenRootScopeEvents);
