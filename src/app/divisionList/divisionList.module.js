import userDataModule from '../userData/userData.module.js';
import dataModule from '../data/data.module.js';
import DivisionListController from './divisionList.controller.js';

let module = angular.module('futbolApp.divisionList', [
  'ui.router',
  userDataModule.name,
  dataModule.name
])
  .controller('DivisionListController', DivisionListController);

export default module;
