import MatchPlayersTableController from './matchPlayersTable.controller.js';

export default matchPlayersTableDirective;

function matchPlayersTableDirective() {
  return {
    restrict: 'A',
    scope: {
      teamStats: '=matchPlayersTable'
    },
    templateUrl: 'app/match/matchPlayersTable.html',
    controller: MatchPlayersTableController,
    controllerAs: 'vm',
    bindToController: true
  };
}
