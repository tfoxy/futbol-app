import {resolveDivision} from '../util';

class PlayersController {

  static get resolve() {
    return {
      division: resolveDivision,
      $title: ['division', division => 'Jugadores ' + division.name]
    };
  }

  constructor(division, $stateParams, userData) {
    'ngInject';

    this.division = division;

    this.playerList = division.playerStatsList;

    // Sync userData.divisionIndex
    userData.divisionIndex = +$stateParams.divisionIndex;
  }
}

export default PlayersController;
