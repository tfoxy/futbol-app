import MatchesTableController from './matchesTable.controller.js';

function matchesTableRouterConfig($stateProvider) {
  'ngInject';
  $stateProvider.state('app.matchesTable', {
    url: '/matchesTable/{divisionIndex:[0-9]}',
    resolve: MatchesTableController.resolve,
    templateUrl: 'app/matchesTable/matchesTable.html',
    controller: 'MatchesTableController',
    controllerAs: 'matchesTableCtrl'
  });
}

export default matchesTableRouterConfig;
