class MatchPlayersTableController {

  constructor() {
    'ngInject';
    this.playerStatsById = this.teamStats.getPlayerStatsById();
  }

}

export default MatchPlayersTableController;
