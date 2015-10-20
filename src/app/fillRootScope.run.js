function fillRootScope($rootScope, $state, $stateParams, userData) {
  'ngInject';

  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.userData = userData;
}

export default fillRootScope;
