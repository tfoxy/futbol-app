import dataModule from '../data/data.module.js';
import userDataModule from '../userData/userData.module.js';
import matchModule from '../match/match.module.js';
import FixtureController from './fixture.controller.js';
import fixtureRouteConfig from './fixture.route.js';

const module = angular.module('futbolApp.fixture', [
  'ui.router',
  'ngDialog',
  dataModule.name,
  userDataModule.name,
  matchModule.name
])
  .config(fixtureRouteConfig)
  .controller('FixtureController', FixtureController);

export default module;
