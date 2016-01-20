import StandingsController from './standings.controller.js';

function standingsRouterConfig($stateProvider) {
  'ngInject';
  $stateProvider.state('app.standings', {
    url: '/standings/division/:divisionIndex',
    resolve: StandingsController.resolve,
    templateUrl: 'app/standings/standings.html',
    controller: 'StandingsController',
    controllerAs: 'vm'
  });
}

export default standingsRouterConfig;
