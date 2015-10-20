class StandingsController {

  static get resolve() {
    return {
      standings: ['data', data => data.getStandings()]
    };
  }

  constructor(standings, $stateParams, userData) {
    'ngInject';

    this.standings = standings[$stateParams.divisionIndex];

    // Sync userData.divisionIndex
    userData.divisionIndex = +$stateParams.divisionIndex;
  }
}

export default StandingsController;
