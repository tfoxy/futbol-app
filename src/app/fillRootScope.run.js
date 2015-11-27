function fillRootScope($rootScope, $state, $stateParams, $timeout, $document, userData) {
  'ngInject';

  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.userData = userData;

  let isExpandClicked = false;
  $rootScope.isCollapsed = true;
  $rootScope.collapse = function collapse() {
    $rootScope.isCollapsed = !$rootScope.isCollapsed;
    isExpandClicked = true;
  };
  $document.find('body').on('click', function bodyClickListener() {
    if (isExpandClicked) {
      isExpandClicked = false;
    } else {
      $rootScope.$apply(function() {
        $rootScope.isCollapsed = true;
      });
    }
  });
}

export default fillRootScope;
