class MatchesTableController {

  static get resolve() {
    return {
      matchesByTeams: ['data', data => data.getMatchesByTeams()],
      standings: ['data', data => data.getStandings()]
    };
  }

  constructor(matchesByTeams, standings) {
    'ngInject';

    this._matchesByTeams = matchesByTeams;
    this.standings = standings;
  }

  getMatchGoalsByTeam(match, team) {
    if (team === match.localTeam) {
      return match.localGoals.length;
    } else if (team === match.visitorTeam) {
      return match.visitorGoals.length;
    }
  }

  getMatchByTeams(leftTeam, rightTeam) {
    // TODO
  }
}

export default MatchesTableController;
