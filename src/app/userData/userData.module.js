import userData from './userData.js';

let module = angular.module('futbolApp.userData', [])
  .constant('userData', userData);

export default module;
