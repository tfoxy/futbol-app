class FixtureController {

  static get resolve() {
    return {
      division: ($stateParams, season) => {
        'ngInject';
        return season.divisions[+$stateParams.divisionIndex - 1];
      },
      $title: ['division', division => 'Fixture ' + division.name]
    };
  }

  constructor(division, $stateParams, userData) {
    'ngInject';

    this.division = division;

    // Sync userData.divisionIndex
    userData.divisionIndex = +$stateParams.divisionIndex;
  }
}

export default FixtureController;
