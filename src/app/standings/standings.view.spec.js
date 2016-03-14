import standingsModule from './standings.module';
import routeModule from '../route.module';

describe(standingsModule.name + ' view', () => {
  let $scope, compileAndDigest, $state, $httpBackend, $timeout;

  beforeEach(angular.mock.module(standingsModule.name));

  beforeEach(angular.mock.module(routeModule.name));

  beforeEach(angular.mock.module('app/divisionList/divisionList.html'));

  beforeEach(angular.mock.module('app/standings/standings.html'));

  beforeEach(inject(($rootScope, $compile) => {
    $scope = $rootScope.$new();
    compileAndDigest = (t) => {
      let element = angular.element(t);
      $compile(element)($scope);
      $scope.$digest();

      return element;
    };
  }));

  beforeEach(inject((_$state_, _$httpBackend_, _$timeout_) => {
    $state = _$state_;
    $httpBackend = _$httpBackend_;
    $timeout = _$timeout_;
  }));

  it('should compile and digest successfully', () => {
    $httpBackend.whenGET('api/seasonData/last.json').respond({
      id: 1,
      season: {id: 1},
      divisions: [{
        id: 1,
        index: 0,
        name: 'fooDivision',
        seasonId: 1
      }]
    });
    $state.transitionTo('app.standings', {
      divisionIndex: '1',
      seasonId: 'last'
    });

    let element = compileAndDigest('<div><div ui-view="@app"></div></div>');
    $timeout.flush();
    $httpBackend.flush();
    let view = element.children().children();
    expect(view.length).to.be.gt(0);
    expect(view[0].tagName).to.equal('SECTION');
    expect(view.attr('id')).to.equal('standings-view');
  });
});
