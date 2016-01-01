import MatchesTableController from './matchesTable.controller.js';

function matchesTableRouterConfig($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider.state('app.matchesTable', {
    url: '/matches-table/{divisionIndex:[0-9]}',
    resolve: MatchesTableController.resolve,
    templateUrl: 'app/matchesTable/matchesTable.html',
    controller: 'MatchesTableController',
    controllerAs: 'vm'
  });

  $urlRouterProvider.when('/matchesTable/{divisionIndex:[0-9]}', $stateParams => {
    'ngInject';

    return '/matches-table/' + $stateParams.divisionIndex;
  });
}

export default matchesTableRouterConfig;
