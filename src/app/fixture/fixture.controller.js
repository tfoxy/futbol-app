class FixtureController {

  static get resolve() {
    return {
      division: (data, $stateParams) => {
        'ngInject';
        return data.getDivisionByIndex($stateParams.divisionIndex);
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
