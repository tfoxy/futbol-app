import StandingsController from './standings.controller.js';

function standingsRouterConfig($stateProvider) {
  'ngInject';
  $stateProvider.state('app.standings', {
    url: '/standings/{divisionIndex:[0-9]}',
    resolve: StandingsController.resolve,
    templateUrl: 'app/standings/standings.html',
    controller: 'StandingsController',
    controllerAs: 'vm'
  });
}

export default standingsRouterConfig;
