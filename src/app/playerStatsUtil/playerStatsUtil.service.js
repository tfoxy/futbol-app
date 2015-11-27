class PlayerStatsUtil {

  addTeamStats(playerStatsById, teamStats) {
    teamStats.players && teamStats.players.forEach(player => {
      if (player.id in playerStatsById) {
        let playerStats = playerStatsById[player.id];
        let teamFound = playerStats.teams.find(team => team.id === teamStats.team.id);
        if (!teamFound) {
          playerStats.teams.push(teamStats.team);
        }
      } else {
        playerStatsById[player.id] = {
          player,
          teams: [teamStats.team],
          get lastTeam() {
            return this.teams[this.teams.length - 1];
          },
          goals: 0,
          bestPlayer: 0,
          yellowCards: 0,
          redCards: 0
        };
      }
    });

    teamStats.goals && teamStats.goals.forEach(goal => {
      let playerStats = playerStatsById[goal.player.id];
      playerStats.goals += 1;
    });

    teamStats.cards && teamStats.cards.forEach(card => {
      let playerStats = playerStatsById[card.player.id];
      let type = card.type === 'red' ? 'redCards' : 'yellowCards';
      playerStats[type] += 1;
    });
  }

  addBestPlayer(playerStatsById, bestPlayer) {
    if (bestPlayer) {
      let playerStats = playerStatsById[bestPlayer.id];
      playerStats.bestPlayer += 1;
    }
  }

  addMatch(playerStatsById, match) {
    this.addTeamStats(playerStatsById, match.local);
    this.addTeamStats(playerStatsById, match.visitor);
    this.addBestPlayer(playerStatsById, match.bestPlayer);
  }

  toArray(playerStatsById) {
    let playerList = [];
    for (let playerId in playerStatsById) {
      let playerStats = playerStatsById[playerId];
      playerList.push(playerStats);
    }
    return playerList;
  }

}

export default PlayerStatsUtil;
