import dataModule from './data.module';

describe(dataModule.name + '.match.factory', () => {
  let Match;

  beforeEach(angular.mock.module(dataModule.name));

  beforeEach(inject((_Match_) => {
    Match = _Match_;
  }));

  describe('._helpers.generateMatchesByTeams', () => {

    it('should fill matchesByTeams with the match team ids', () => {
      let matchesByTeams = Object.create(null);
      let match = {
        id: 3,
        localStats: {
          id: 4,
          team: {id: 1},
          teamId: 1
        },
        localStatsId: 4,
        visitorStats: {
          id: 5,
          team: {id: 2},
          teamId: 2
        },
        visitorStatsId: 5,
        round: {
          id: 6,
          division: {
            id: 7,
            matchesByTeams
          },
          divisionId: 7
        },
        roundId: 6
      };

      Match._helpers.generateMatchesByTeams(match);

      expect(matchesByTeams).to.have.deep.property('[1][2].id', 3);
      expect(matchesByTeams).to.have.deep.property('[2][1].id', 3);
    });

  });

  describe('.inject', () => {

    it('should add round property to matches', inject((Round) => {
      Round.inject({
        id: 4
      });

      let match = Match.inject({
        id: 3,
        roundId: 4
      });

      expect(match).to.have.deep.property('round.id', 4);
    }));

  });

});
