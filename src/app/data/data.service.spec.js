import dataModule from './data.module.js';
import Data from './data.service.js';

describe(dataModule.name + '.service', () => {

  describe('._listeners', () => {

    it('should be an object', () => {
      expect(Data._listeners).to.be.an('object');
    });

    describe('.generateMatchesByTeams', () => {

      it('should fill processedData.matchesByTeams with the match team ids', () => {
        let matchesByTeams = {};
        let match = {
          id: 3,
          local: {
            team: {id: 1}
          },
          visitor: {
            team: {id: 2}
          },
          round: {division: {matchesByTeams}}
        };

        Data._listeners.generateMatchesByTeams(match);

        expect(matchesByTeams).to.have.deep.property('[1][2].id', 3);
        expect(matchesByTeams).to.have.deep.property('[2][1].id', 3);
      });

    });

    describe('.initializeDivision', () => {

      it('should add division standings', () => {
        let division = {
          index: 7,
          rounds: [], teams: []
        };

        Data._listeners.initializeDivision(division);

        expect(division.standings).to.have.length(0);
      });

    });

    describe('.generateDivisionsByIndex', () => {

      it('should add the division to divisionsByIndex', () => {
        let division = {
          id: 9,
          index: 7,
          rounds: [],
          teams: []
        };
        let processedData = {
          divisionsByIndex: {}
        };

        Data._listeners.generateDivisionsByIndex(division, processedData);

        expect(processedData.divisionsByIndex).to.have.deep.property('[7].id', 9);
      });

    });

  });

  describe('instance', () => {

    let data;

    beforeEach(angular.mock.module(dataModule.name));

    beforeEach(inject((_data_) => {
      data = _data_;
    }));

    describe('#_iterateSeasonData', () => {

      it('should add round property to matches', () => {
        let match = {
          id: 3,
          local: {
            team: {id: 1}
          },
          visitor: {
            team: {id: 2}
          }
        };
        let season = {
          divisions: [{
            rounds: [{
              id: 4,
              matches: [match]
            }],
            teams: [{id: 1}, {id: 2}]
          }]
        };

        data._iterateSeasonData(season);

        expect(match).to.have.deep.property('round.id', 4);
      });

      it('should add division property to rounds', () => {
        let round = {
          id: 3,
          matches: []
        };
        let season = {
          divisions: [{
            id: 7,
            rounds: [round],
            teams: []
          }]
        };

        data._iterateSeasonData(season);

        expect(round).to.have.deep.property('division.id', 7);
      });

    });

    describe('http request', () => {
      let $httpBackend;

      beforeEach(inject((_$httpBackend_) => {
        $httpBackend = _$httpBackend_;
      }));

      afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('should fetch data from json file', () => {
        $httpBackend.when('GET', data._path)
          .respond({seasons: [{divisions: []}]});
        $httpBackend.expectGET(data._path);
        $httpBackend.flush();
      });

      it('should fetch data with correct properties', () => {
        $httpBackend.when('GET', data._path)
          .respond({seasons: [{divisions: []}]});

        $httpBackend.flush();

        expect(data._request).to.become({seasons: [{divisions: []}]});
      });

    });

  });

});
