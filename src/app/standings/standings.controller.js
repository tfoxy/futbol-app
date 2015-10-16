class StandingsController {

  static get resolve() {
    return {
      standings: ['data', data => data.getStandings()]
    };
  }

  constructor(standings) {
    'ngInject';

    this.standings = standings;
  }
}

export default StandingsController;
