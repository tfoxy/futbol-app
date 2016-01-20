class TeamController {

  static get resolve() {
    return {
      team: ($stateParams, Team) => {
        'ngInject';
        return Team.get($stateParams.teamId);
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
    if (match.localStats.team.id !== this.team.id) {
      return match.localStats;
    } else if (match.visitorStats.team.id !== this.team.id) {
      return match.visitorStats;
    }
  }

  getMatchTeamStats(match) {
    if (match.localStats.team.id === this.team.id) {
      return match.localStats;
    } else if (match.visitorStats.team.id === this.team.id) {
      return match.visitorStats;
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
