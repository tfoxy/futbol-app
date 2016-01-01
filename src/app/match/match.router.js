import MatchController from './match.controller.js';

function matchRouterConfig($stateProvider) {
  'ngInject';

  $stateProvider.state('app.match', {
    url: '/matches/{matchId:[0-9]+}',
    resolve: MatchController.resolve,
    templateUrl: 'app/match/match.html',
    controller: 'MatchController',
    controllerAs: 'vm'
  });
}

export default matchRouterConfig;
