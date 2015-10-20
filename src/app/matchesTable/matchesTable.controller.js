class MatchesTableController {

  static get resolve() {
    return {
      matchesByTeams: ['data', data => data.getMatchesByTeams()],
      standings: ['data', data => data.getStandings()]
    };
  }

  constructor(matchesByTeams, standings, $stateParams, userData) {
    'ngInject';

    this._matchesByTeams = matchesByTeams;
    this.standings = standings[$stateParams.divisionIndex];

    // Sync userData.divisionIndex
    userData.divisionIndex = +$stateParams.divisionIndex;
  }

  getMatchGoalsByTeam(match, team) {
    if (team.id === match.local.team.id) {
      return match.local.goals.length;
    } else if (team.id === match.visitor.team.id) {
      return match.visitor.goals.length;
    }
  }

  getMatchByTeams(leftTeam, rightTeam) {
    return this._matchesByTeams[leftTeam.id][rightTeam.id];
  }
}

export default MatchesTableController;
