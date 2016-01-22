import dataModule from './data.module';

describe(dataModule.name + '.round.factory', () => {
  let Round;

  beforeEach(angular.mock.module(dataModule.name));

  beforeEach(inject((_Round_) => {
    Round = _Round_;
  }));

  describe('.inject', () => {

    it('should add division property to rounds', inject((Division) => {
      Division.inject({
        id: 7,
        teams: []
      });

      let round = Round.inject({
        id: 3,
        divisionId: 7
      });

      expect(round).to.have.deep.property('division.id', 7);
    }));

  });

});
