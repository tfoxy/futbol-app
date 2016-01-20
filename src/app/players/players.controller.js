class PlayersController {

  static get resolve() {
    return {
      division: ($stateParams, season) => {
        'ngInject';
        return season.divisions[+$stateParams.divisionIndex - 1];
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
