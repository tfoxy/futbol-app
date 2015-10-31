import FixtureController from './fixture.controller.js';
import MatchController from '../match/match.controller.js';

function fixtureRouterConfig($stateProvider) {
  'ngInject';
  $stateProvider.state('app.fixture', {
    url: '/fixture/{divisionIndex:[0-9]}',
    resolve: FixtureController.resolve,
    templateUrl: 'app/fixture/fixture.html',
    controller: 'FixtureController',
    controllerAs: 'fixtureCtrl'
  });

  $stateProvider.state('app.fixture.match', {
    url: '/match/{matchId:[0-9]+}',
    resolve: MatchController.resolve,
    data: {},
    onEnter: (ngDialog, $state, match, $timeout) => {
      'ngInject';
      function FixtureMatchController() {
        MatchController.call(this, match);
      }
      FixtureMatchController.prototype = Object.create(MatchController.prototype);
      FixtureMatchController.prototype.constructor = FixtureMatchController;

      let dialog = ngDialog.open({
        template: 'app/match/match.html',
        controller: FixtureMatchController,
        controllerAs: 'matchCtrl'
      });
      dialog.closePromise.then(data => {
        // If data.value is undefined, it was closed programmatically
        if ($state.current.name !== 'app.fixture' && data.value) {
          $state.go('app.fixture');
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

export default fixtureRouterConfig;
