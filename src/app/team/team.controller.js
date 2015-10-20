class TeamController {

  static get resolve() {
    return {
      teams: ['data', data => data.getTeams()],
      team: ['teams', '$stateParams', (teams, $stateParams) => teams[$stateParams.teamId]],
      matchesByTeams: ['data', data => data.getMatchesByTeams()],
      $title: ['team', team => team.name]
    };
  }

  constructor(team, matchesByTeams) {
    'ngInject';

    this.team = team;
    this.matchList = this._getMatchList(matchesByTeams);
    this.playerList = this._getPlayerList();
  }

  _getMatchList(matchesByTeams) {
    let matchList = [];
    let matchesByOtherTeamId = matchesByTeams[this.team.id];
    for (let otherTeamId in matchesByOtherTeamId) {
      let match = matchesByOtherTeamId[otherTeamId];
      matchList.push(match);
    }

    return matchList.sort(roundIndexSorter);
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

    this.matchList.forEach(match => {
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

    return playerList.sort(playerStatsSorter);
  }
}

export default TeamController;


function roundIndexSorter(leftMatch, rightMatch) {
  return leftMatch.round.index - rightMatch.round.index;
}

function playerStatsSorter(leftPlayerStats, rightPlayerStats) {
  let diffGoals = rightPlayerStats.goals - leftPlayerStats.goals;
  if (diffGoals) {
    return diffGoals;
  }

  let diffBestPlayer = rightPlayerStats.bestPlayer - leftPlayerStats.bestPlayer;
  if (diffBestPlayer) {
    return diffBestPlayer;
  }

  let diffYellowCards = rightPlayerStats.yellowCards - leftPlayerStats.yellowCards;
  if (diffYellowCards) {
    return diffYellowCards;
  }

  let diffRedCards = rightPlayerStats.redCards - leftPlayerStats.redCards;
  if (diffRedCards) {
    return diffRedCards;
  }

  return -1;
}
