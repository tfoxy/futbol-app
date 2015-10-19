function standingsCalculator(divisionData) {
  let teams = divisionData.teams;
  let rounds = divisionData.rounds;
  let standings = [];
  let standingsById = {};

  teams.forEach(team => {
    let standing = {
      team: team,
      points: 0,
      matchesWon: 0,
      matchesDrawn: 0,
      matchesLost: 0,
      goalsScored: 0,
      goalsAgainst: 0
    };
    standings.push(standing);
    standingsById[team.id] = standing;
  });

  rounds.forEach(round => {
    round.matches.forEach(match => {
      if (!match.hasResults) {
        return;
      }

      let localStanding = standingsById[match.local.team.id];
      let visitorStanding = standingsById[match.visitor.team.id];
      let diffGoals = match.visitor.goals.length - match.local.goals.length;

      if (diffGoals < 0) {
        localStanding.points += 3;
        localStanding.matchesWon++;
        visitorStanding.matchesLost++;
      } else if (diffGoals > 0) {
        visitorStanding.points += 3;
        visitorStanding.matchesWon++;
        localStanding.matchesLost++;
      } else {
        localStanding.points += 1;
        visitorStanding.points += 1;
        localStanding.matchesDrawn++;
        visitorStanding.matchesDrawn++;
      }

      localStanding.goalsScored += match.local.goals.length;
      localStanding.goalsAgainst += match.visitor.goals.length;

      visitorStanding.goalsScored += match.visitor.goals.length;
      visitorStanding.goalsAgainst += match.local.goals.length;
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

export default standingsCalculator;
