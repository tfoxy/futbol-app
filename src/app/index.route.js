function routerConfig($urlRouterProvider, $stateProvider, userData) {
  'ngInject';

  $urlRouterProvider.otherwise(function() {
    return `/season/${userData.seasonId}/standings/division/${userData.divisionIndex}`;
  });

  $stateProvider.state('app', {
    url: '/season/{seasonId:[a-zA-Z0-9]+}',
    abstract: true,
    resolve: {
      seasonData: ($stateParams, SeasonData) => {
        'ngInject';
        return SeasonData.find($stateParams.seasonId);
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

export default routerConfig;
