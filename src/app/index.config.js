function config($logProvider, $httpProvider, ngDialogProvider) {
  'ngInject';

  // Enable log
  $logProvider.debugEnabled(true);

  // Disable legacy methods `success` and `error`.
  $httpProvider.useLegacyPromiseExtensions(false);

  ngDialogProvider.setDefaults({
    className: 'ngdialog-theme-plain'
  });
}

export default config;
