import DivisionListController from './divisionList/divisionList.controller.js';

function routerConfig($urlRouterProvider, $stateProvider, userData) {
  'ngInject';
  $urlRouterProvider.otherwise(`/standings/${userData.divisionIndex}`);

  $stateProvider.state('app', {
    abstract: true,
    views: {
      'divisionList': {
        resolve: DivisionListController.resolve,
        templateUrl: 'app/divisionList/divisionList.html',
        controller: 'DivisionListController',
        controllerAs: 'vm'
      }
    }
  });
}

export default routerConfig;
