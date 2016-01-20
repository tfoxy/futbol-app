export default standingsCalculator;

function standingsCalculator(division) {
  let teams = division.teams;
  let rounds = division.rounds;
  let standings = [];
  let standingsById = {};

  teams.forEach(team => {
    let standing = {
      team: team,
      get points() {
        return 3 * this.matchesWon + this.matchesDrawn;
      },
      get matchesPlayed() {
        return this.matchesWon + this.matchesDrawn + this.matchesLost;
      },
      matchesWon: 0,
      matchesDrawn: 0,
      matchesLost: 0,
      goalsScored: 0,
      goalsAgainst: 0,
      get goalsDifference() {
        return this.goalsScored - this.goalsAgainst;
      },
      yellowCards: 0,
      redCards: 0,
      generatedYellowCards: 0,
      generatedRedCards: 0,
      get totalYellowCardsOnMatches() {
        return this.yellowCards + this.generatedYellowCards;
      },
      get totalRedCardsOnMatches() {
        return this.redCards + this.generatedRedCards;
      }
    };
    standings.push(standing);
    standingsById[team.id] = standing;
  });

  rounds.forEach(round => {
    round.matches.forEach(match => {
      if (!match.hasResults) {
        return;
      }

      let localStanding = standingsById[match.localStats.team.id];
      let visitorStanding = standingsById[match.visitorStats.team.id];
      let diffGoals = match.visitorStats.goals.length - match.localStats.goals.length;

      if (diffGoals < 0) {
        localStanding.matchesWon++;
        visitorStanding.matchesLost++;
      } else if (diffGoals > 0) {
        visitorStanding.matchesWon++;
        localStanding.matchesLost++;
      } else {
        localStanding.matchesDrawn++;
        visitorStanding.matchesDrawn++;
      }

      countGoalsAndCards(localStanding, match.localStats, match.visitorStats);
      countGoalsAndCards(visitorStanding, match.visitorStats, match.localStats);
    });
  });

  standings.sort(standingSorter);

  return standings;
}

function standingSorter(leftStanding, rightStanding) {
  let diffPoints = rightStanding.points - leftStanding.points;

  if (diffPoints !== 0) {
    return diffPoints;
  }

  let diffGoalsDifference =
      rightStanding.goalsScored - rightStanding.goalsAgainst -
      (leftStanding.goalsScored - leftStanding.goalsAgainst);

  if (diffGoalsDifference !== 0) {
    return diffGoalsDifference;
  }

  let diffGoalsScored = rightStanding.goalsScored - leftStanding.goalsScored;

  return diffGoalsScored;
}

function countGoalsAndCards(standing, teamStats, opponentTeamStats) {
  standing.goalsScored += teamStats.goals.length;
  standing.goalsAgainst += opponentTeamStats.goals.length;

  teamStats.cards.forEach(card => {
    if (card.type === 'yellow') {
      standing.yellowCards += 1;
    } else if (card.type === 'red') {
      standing.redCards += 1;
    }
  });

  opponentTeamStats.cards.forEach(card => {
    if (card.type === 'yellow') {
      standing.generatedYellowCards += 1;
    } else if (card.type === 'red') {
      standing.generatedRedCards += 1;
    }
  });
}
