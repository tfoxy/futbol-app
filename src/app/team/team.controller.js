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

  constructor(team, $filter) {
    'ngInject';

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

      teamStats.players.forEach(player => {
        if (!(player.id in playerStatsById)) {
          playerStatsById[player.id] = {
            player,
            goals: 0,
            bestPlayer: 0,
            yellowCards: 0,
            redCards: 0
          };
        }
      });

      if (!match.hasResults) {
        return;
      }

      teamStats.goals.forEach(goal => {
        let playerStats = playerStatsById[goal.player.id];
        playerStats.goals += 1;
      });

      teamStats.cards.forEach(card => {
        let playerStats = playerStatsById[card.player.id];
        let type = card.type === 'red' ? 'redCards' : 'yellowCards';
        playerStats[type] += 1;
      });

      if (this.isBestPlayerFromTeam(match)) {
        let playerStats = playerStatsById[match.bestPlayer.id];
        playerStats.bestPlayer += 1;
      }
    });

    let playerList = [];

    for (let playerId in playerStatsById) {
      let playerStats = playerStatsById[playerId];
      playerList.push(playerStats);
    }

    return this._orderBy(playerList, [
      '-goals',
      '-bestPlayer',
      '-yellowCards',
      '-redCards'
    ]);
  }
}

export default TeamController;
