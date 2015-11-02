class FixtureController {

  static get resolve() {
    return {
      processedData: ['data', data => data.getProcessedData()],
      division: (processedData, $stateParams) => {
        'ngInject';
        return processedData.divisionsByIndex[$stateParams.divisionIndex];
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
}

export default FixtureController;
