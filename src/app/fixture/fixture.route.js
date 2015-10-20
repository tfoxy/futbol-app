import FixtureController from './fixture.controller.js';

function fixtureRouterConfig($stateProvider) {
  'ngInject';
  $stateProvider.state('app.fixture', {
    url: '/fixture/{divisionIndex:[0-9]}',
    resolve: FixtureController.resolve,
    templateUrl: 'app/fixture/fixture.html',
    controller: 'FixtureController',
    controllerAs: 'fixtureCtrl'
  });
}

export default fixtureRouterConfig;
