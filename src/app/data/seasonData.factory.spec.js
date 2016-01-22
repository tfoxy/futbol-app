import dataModule from './data.module';

describe(dataModule.name + '.seasonData.factory', () => {
  let SeasonData;

  beforeEach(angular.mock.module(dataModule.name));

  beforeEach(inject((_SeasonData_) => {
    SeasonData = _SeasonData_;
  }));

  describe('.find', () => {
    let $httpBackend, $timeout;

    beforeEach(inject((_$httpBackend_, _$timeout_) => {
      $httpBackend = _$httpBackend_;
      $timeout = _$timeout_;
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should fetch data from json file', () => {
      SeasonData.find('last');
      $httpBackend.expectGET(['api', SeasonData.endpoint, 'last.json'].join('/')).respond({id: 1});
      $httpBackend.flush();
      $timeout.flush();
    });

    it('should fetch data with correct properties', inject((Season, Division) => {
      SeasonData.find('last');

      $httpBackend.expectGET(['api', SeasonData.endpoint, 'last.json'].join('/')).respond({
        id: 1,
        season: {
          id: 1
        },
        divisions: [{
          id: 2,
          seasonId: 1
        }]
      });

      $httpBackend.flush();
      $timeout.flush();

      expect(Season.get(1)).to.have.property('id', 1);
      expect(Division.get(2)).to.have.property('id', 2);
    }));

  });

});
