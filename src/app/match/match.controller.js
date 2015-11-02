class MatchController {

  static get resolve() {
    return {
      processedData: ['data', data => data.getProcessedData()],
      match: (processedData, $stateParams) => {
        'ngInject';
        return processedData.matchesById[$stateParams.matchId];
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
