class MatchController {

  static get resolve() {
    return {
      matchesById: ['data', data => data.getMatchesById()],
      match: (matchesById, $stateParams) => {
        'ngInject';
        return matchesById[$stateParams.matchId];
      },
      $title: match => {
        'ngInject';
        return `${match.local.team.name} vs. ${match.visitor.team.name} ${match.date}`;
      }
    };
  }

  constructor(match) {
    'ngInject';

    this.match = match;
  }

}

export default MatchController;
