class TeamController {

  static get resolve() {
    return {
      processedData: ['data', data => data.getProcessedData()],
      team: (processedData, $stateParams) => {
        'ngInject';
        return processedData.teamsById[$stateParams.teamId];
      },
      $title: ['team', team => team.name]
    };
  }

  constructor(team, $filter, playerStatsUtil) {
    'ngInject';

    this.playerStatsUtil = playerStatsUtil;
    this._orderBy = $filter('orderBy');

    this.team = team;
    this.playerList = this._getPlayerList();
  }

  getMatchOpponentStats(match) {
    if (match.local.team.id !== this.team.id) {
      return match.local;
    } else if (match.visitor.team.id !== this.team.id) {
      return match.visitor;
    }
  }

  getMatchTeamStats(match) {
    if (match.local.team.id === this.team.id) {
      return match.local;
    } else if (match.visitor.team.id === this.team.id) {
      return match.visitor;
    }
  }

  isBestPlayerFromTeam(match) {
    let teamStats = this.getMatchTeamStats(match);
    let bestPlayer = match.bestPlayer;

    return (!!bestPlayer) && teamStats.players.some(player => {
      return player.id === bestPlayer.id;
    });
  }

  _getPlayerList() {
    let playerStatsById = {};

    this.team.matchList.forEach(match => {
      let teamStats = this.getMatchTeamStats(match);

      this.playerStatsUtil.addTeamStats(playerStatsById, teamStats);

      if (this.isBestPlayerFromTeam(match)) {
        this.playerStatsUtil.addBestPlayer(playerStatsById, match.bestPlayer);
      }
    });

    let playerList = this.playerStatsUtil.toArray(playerStatsById);

    return this._orderBy(playerList, [
      '-goals',
      '-bestPlayer',
      '-yellowCards',
      '-redCards'
    ]);
  }
}

export default TeamController;
