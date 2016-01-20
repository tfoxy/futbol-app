class MatchController {

  static get resolve() {
    return {
      match: ($stateParams, Match) => {
        'ngInject';
        return Match.get($stateParams.matchId);
      },
      $title: match => {
        'ngInject';
        return `${match.localStats.team.name} vs. ${match.visitorStats.team.name} ${match.startAt}`;
      }
    };
  }

  constructor(match) {
    'ngInject';

    this.match = match;
  }

}

export default MatchController;
