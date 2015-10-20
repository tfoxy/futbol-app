import TeamController from './team.controller.js';

function teamRouterConfig($stateProvider) {
  'ngInject';

  $stateProvider.state('app.team', {
    url: '/teams/{teamId:[0-9]{1,4}}',
    resolve: TeamController.resolve,
    templateUrl: 'app/team/team.html',
    controller: 'TeamController',
    controllerAs: 'teamCtrl'
  });
}

export default teamRouterConfig;
