import config from './index.config.js';
import routerConfig from './index.route.js';
import fillRootScope from'./fillRootScope.run.js';

import userDataModule from './userData/userData.module.js';
import divisionListModule from './divisionList/divisionList.module.js';
import standingsModule from './standings/standings.module.js';
import matchesTableModule from './matchesTable/matchesTable.module.js';

angular.module('futbolApp', [
  'ui.router',
  userDataModule.name,
  divisionListModule.name,
  standingsModule.name,
  matchesTableModule.name
])
  .config(config)
  .config(routerConfig)
  .run(fillRootScope);
