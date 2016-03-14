import {resolveDivision} from '../util';

class StandingsController {

  static get resolve() {
    return {
      division: resolveDivision,
      $title: ['division', division => 'Posiciones ' + division.name]
    };
  }

  constructor(division, $stateParams, userData) {
    'ngInject';

    this.standings = division.getStandings();

    // Sync userData.divisionIndex
    userData.divisionIndex = +$stateParams.divisionIndex;
  }
}

export default StandingsController;
