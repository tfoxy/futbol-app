import indexModule from './index.module';

describe(indexModule.name, () => {
  beforeEach(angular.mock.module(indexModule.name));

  it('should set $state in the $rootScope', inject(($rootScope, $state) => {
    expect($rootScope).to.have.property('$state', $state);
  }));

  it('should inject Season service', inject(($injector) => {
    expect($injector.has('Season')).to.equal(true);
  }));
});
