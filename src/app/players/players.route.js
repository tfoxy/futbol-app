import PlayersController from './players.controller.js';

function playersRouterConfig($stateProvider) {
  'ngInject';
  $stateProvider.state('app.players', {
    url: '/players/{divisionIndex:[0-9]}',
    resolve: PlayersController.resolve,
    templateUrl: 'app/players/players.html',
    controller: 'PlayersController',
    controllerAs: 'playersCtrl'
  });
}

export default playersRouterConfig;
