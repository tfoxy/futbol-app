class StandingsController {

  static get resolve() {
    return {
      processedData: ['data', data => data.getProcessedData()],
      division: (processedData, $stateParams) => {
        'ngInject';
        return processedData.divisionsByIndex[$stateParams.divisionIndex];
      },
      $title: ['division', division => 'Posiciones ' + division.name]
    };
  }

  constructor(division, $stateParams, userData) {
    'ngInject';

    this.standings = division.standings;

    // Sync userData.divisionIndex
    userData.divisionIndex = +$stateParams.divisionIndex;
  }
}

export default StandingsController;
