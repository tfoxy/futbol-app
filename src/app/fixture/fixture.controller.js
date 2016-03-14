import {resolveDivision} from '../util';

class FixtureController {

  static get resolve() {
    return {
      division: resolveDivision,
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
