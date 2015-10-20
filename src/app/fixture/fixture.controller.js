class FixtureController {

  static get resolve() {
    return {
      divisionsByIndex: ['data', data => data.getDivisionsByIndex()]
    };
  }

  constructor(divisionsByIndex, $stateParams, userData) {
    'ngInject';

    this.division = divisionsByIndex[$stateParams.divisionIndex];

    // Sync userData.divisionIndex
    userData.divisionIndex = +$stateParams.divisionIndex;
  }
}

export default FixtureController;
