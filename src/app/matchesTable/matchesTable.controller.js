class MatchesTableController {

  static get resolve() {
    return {
      division: ($stateParams, season) => {
        'ngInject';
        return season.divisions[+$stateParams.divisionIndex - 1];
      },
      $title: ['division', division => 'Resultados ' + division.name]
    };
  }

  constructor(division, $stateParams, userData) {
    'ngInject';

    this._matchesByTeams = division.matchesByTeams;
    this.standings = division.getStandings();

    // Sync userData.divisionIndex
    userData.divisionIndex = +$stateParams.divisionIndex;
  }

  getMatchGoalsByTeam(match, team) {
    if (team.id === match.localStats.team.id) {
      return match.localStats.goals.length;
    } else if (team.id === match.visitorStats.team.id) {
      return match.visitorStats.goals.length;
    }
  }

  getMatchByTeams(leftTeam, rightTeam) {
    let matches = this._matchesByTeams[leftTeam.id];
    return matches ? matches[rightTeam.id] : null;
  }
}

export default MatchesTableController;
