import dataModule from '../data/data.module.js';
import userDataModule from '../userData/userData.module.js';
import FixtureController from './fixture.controller.js';
import fixtureRouteConfig from './fixture.route.js';

const module = angular.module('futbolApp.fixture', [
  'ui.router',
  dataModule.name,
  userDataModule.name
])
  .config(fixtureRouteConfig)
  .controller('FixtureController', FixtureController);

export default module;
