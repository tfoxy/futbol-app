class StandingsController {

  static get resolve() {
    return {
      standings: ['data', data => data.getStandings()],
      division: (data, $stateParams) => {
        'ngInject';
        return data.getDivisionByIndex($stateParams.divisionIndex);
      },
      $title: ['division', division => 'Posiciones ' + division.name]
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
