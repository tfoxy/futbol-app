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

  constructor(division, $stateParams, userData, $state) {
    'ngInject';

    this.division = division;
    this._$state = $state;

    // Sync userData.divisionIndex
    userData.divisionIndex = +$stateParams.divisionIndex;
  }

  showMatch(match) {
    console.log(this._$state.go('.match', {matchId: match.id}));
  }
}

export default FixtureController;
