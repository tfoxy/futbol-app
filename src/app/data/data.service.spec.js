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
      .respond({});
    $httpBackend.expectGET(data._path);
    $httpBackend.flush();
  });

  it('should fetch data with correct properties', () => {
    $httpBackend.when('GET', data._path)
      .respond({foo: 'bar'});

    $httpBackend.flush();

    expect(data._request).to.become({foo: 'bar'});
  });

});
