class MatchesTableController {

  static get resolve() {
    return {
      processedData: ['data', data => data.getProcessedData()],
      division: (processedData, $stateParams) => {
        'ngInject';
        return processedData.divisionsByIndex[$stateParams.divisionIndex];
      },
      $title: ['division', division => 'Resultados ' + division.name]
    };
  }

  constructor(division, $stateParams, userData) {
    'ngInject';

    this._matchesByTeams = division.matchesByTeams;
    this.standings = division.standings;

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
