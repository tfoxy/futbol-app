/* eslint angular/on-watch: 0 */

function listenRootScopeEvents($rootScope, $log) {
  'ngInject';
  $rootScope.$on('$stateChangeError', (...args) => {
    $log.error('$stateChangeError', args);
  });

  $rootScope.$on('$stateNotFound', (...args) => {
    $log.error('$stateNotFound', args);
  });

  $rootScope.$on('ngDialog.opened', (e, $dialog) => {
    $dialog.children().eq(1).addClass('container');
  });
}

export default listenRootScopeEvents;
