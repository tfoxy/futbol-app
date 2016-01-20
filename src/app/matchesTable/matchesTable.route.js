import MatchesTableController from './matchesTable.controller.js';

function matchesTableRouterConfig($stateProvider) {
  'ngInject';

  $stateProvider.state('app.matchesTable', {
    url: '/results/division/:divisionIndex',
    resolve: MatchesTableController.resolve,
    templateUrl: 'app/matchesTable/matchesTable.html',
    controller: 'MatchesTableController',
    controllerAs: 'vm'
  });
}

export default matchesTableRouterConfig;
