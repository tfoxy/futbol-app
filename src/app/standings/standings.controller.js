class StandingsController {

  static get resolve() {
    return {
      division: ($stateParams, season) => {
        'ngInject';
        return season.divisions[+$stateParams.divisionIndex - 1];
      },
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
