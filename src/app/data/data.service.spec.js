import dataModule from './data.module.js';

describe(dataModule.name + '.service', () => {
  let data, $httpBackend;

  beforeEach(angular.mock.module(dataModule.name));

  beforeEach(inject((_data_, _$httpBackend_) => {
    data = _data_;
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

  describe('#getMatchesByTeams', () => {

    it('should return a matrix where the indexes are the team ids', () => {
      let match = {
        id: 3,
        local: {
          team: {id: 1}
        },
        visitor: {
          team: {id: 2}
        }
      };
      let jsonData = {
        seasons: [{
          divisions: [{
            rounds: [{
              matches: [match]
            }],
            teams: [{id: 1}, {id: 2}]
          }]
        }]
      };

      $httpBackend.when('GET', data._path)
        .respond(jsonData);

      $httpBackend.flush();

      expect(data.getMatchesByTeams()).to.eventually.have.deep.property('[1][2].id', 3);
      expect(data.getMatchesByTeams()).to.eventually.have.deep.property('[2][1].id', 3);
    });

  });

  describe('#getStandings', () => {

    it('should return standings for all divisions', () => {
      let jsonData = {
        seasons: [{
          divisions: [{
            id: 7,
            rounds: [], teams: []
          }, {
            id: 3,
            rounds: [], teams: []
          }]
        }]
      };

      $httpBackend.when('GET', data._path)
        .respond(jsonData);

      $httpBackend.flush();

      expect(data.getStandings()).to.eventually.have.deep.property('7');
      expect(data.getStandings()).to.eventually.have.deep.property('3');
    });

  });

});
