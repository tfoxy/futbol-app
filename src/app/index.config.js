function config($logProvider, $httpProvider) {
  'ngInject';

  // Enable log
  $logProvider.debugEnabled(true);

  // Disable legacy methods `success` and `error`.
  $httpProvider.useLegacyPromiseExtensions(false);
}

export default config;
