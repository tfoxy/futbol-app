import config from './index.config.js';
import routerConfig from './index.route.js';
import fillRootScope from'./fillRootScope.run.js';
import listenRootScopeEvents from './listenRootScopeEvents.run.js';

import userDataModule from './userData/userData.module.js';
import divisionListModule from './divisionList/divisionList.module.js';
import standingsModule from './standings/standings.module.js';
import matchesTableModule from './matchesTable/matchesTable.module.js';
import teamModule from './team/team.module.js';
import fixtureModule from './fixture/fixture.module.js';
import matchModule from './match/match.module.js';

angular.module('futbolApp', [
  'ui.router',
  'ui.router.title',
  userDataModule.name,
  divisionListModule.name,
  standingsModule.name,
  matchesTableModule.name,
  teamModule.name,
  fixtureModule.name,
  matchModule.name
])
  .config(config)
  .config(routerConfig)
  .run(fillRootScope)
  .run(listenRootScopeEvents);
