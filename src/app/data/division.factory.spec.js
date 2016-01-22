import dataModule from './data.module';

describe(dataModule.name + '.division.factory', () => {
  let Division;

  beforeEach(angular.mock.module(dataModule.name));

  beforeEach(inject((_Division_) => {
    Division = _Division_;
  }));

  describe('instance', () => {

    it('should have a getStandings method', () => {
      let division = Division.inject({
        id: 7,
        rounds: [],
        teams: []
      });

      expect(division.getStandings()).to.have.length(0);
    });

  });

});
