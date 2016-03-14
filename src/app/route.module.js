import userDataModule from './userData/userData.module.js';
import divisionListModule from './divisionList/divisionList.module.js';
import dataModule from './data/data.module.js';

export default angular.module('futbolApp.route', [
  'ui.router',
  'ui.router.title',
  userDataModule.name,
  divisionListModule.name,
  dataModule.name
])
  .config(routerConfig);

function routerConfig($urlRouterProvider, $stateProvider, userData) {
  'ngInject';

  $urlRouterProvider.otherwise(function() {
    return `/season/${userData.seasonId}/standings/division/${userData.divisionIndex}`;
  });

  $stateProvider.state('app', {
    url: '/season/{seasonId:[a-zA-Z0-9]+}',
    abstract: true,
    resolve: {
      seasonData: ($timeout, $stateParams, SeasonData) => {
        'ngInject';
        // Wait for the execution of all angular run functions before making the request
        return $timeout(() => SeasonData.find($stateParams.seasonId));
      },
      season: (seasonData) => {
        'ngInject';
        return seasonData.season;
      }
    },
    views: {
      'divisionList': {
        templateUrl: 'app/divisionList/divisionList.html',
        controller: 'DivisionListController',
        controllerAs: 'vm'
      }
    }
  });
}
