import TeamController from './team.controller.js';
import MatchController from '../match/match.controller.js';

function teamRouterConfig($stateProvider) {
  'ngInject';
  $stateProvider.state('app.team', {
    url: '/teams/{teamId:[0-9]{1,4}}',
    resolve: TeamController.resolve,
    templateUrl: 'app/team/team.html',
    controller: 'TeamController',
    controllerAs: 'teamCtrl'
  });

  $stateProvider.state('app.team.match', {
    url: '/match/{matchId:[0-9]+}',
    resolve: MatchController.resolve,
    data: {},
    onEnter: (ngDialog, $state, match, $timeout) => {
      'ngInject';
      function TeamMatchController() {
        MatchController.call(this, match);
      }
      TeamMatchController.prototype = Object.create(MatchController.prototype);
      TeamMatchController.prototype.constructor = TeamMatchController;

      let dialog = ngDialog.open({
        template: 'app/match/match.html',
        controller: TeamMatchController,
        controllerAs: 'matchCtrl'
      });
      dialog.closePromise.then(data => {
        // If data.value is undefined, it was closed programmatically
        if ($state.current.name !== 'app.team' && data.value) {
          $state.go('app.team');
        }
      });

      $timeout(() => {
        $state.current.data.dialog = dialog;
      });
    },
    onExit: $state => {
      'ngInject';
      $state.current.data.dialog.close();
    }
  });
}

export default teamRouterConfig;
