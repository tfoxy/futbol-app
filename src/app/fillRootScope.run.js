function fillRootScope($rootScope, $state, $stateParams, userData, $timeout) {
  'ngInject';

  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.userData = userData;

  $rootScope.isCollapsed = true;
  $rootScope.collapse = function collapse() {
    $timeout(() => {
      $rootScope.isCollapsed = !$rootScope.isCollapsed;
    });
  };
}

export default fillRootScope;
