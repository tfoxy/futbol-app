class PlayersController {

  static get resolve() {
    return {
      processedData: ['data', data => data.getProcessedData()],
      division: (processedData, $stateParams) => {
        'ngInject';
        return processedData.divisionsByIndex[$stateParams.divisionIndex];
      },
      $title: ['division', division => 'Jugadores ' + division.name]
    };
  }

  constructor(division, $stateParams, userData) {
    'ngInject';

    this.division = division;

    this.playerList = division.playerStatsList;

    // Sync userData.divisionIndex
    userData.divisionIndex = +$stateParams.divisionIndex;
  }
}

export default PlayersController;
