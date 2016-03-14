export function resolveDivision($stateParams, season) {
  'ngInject';
  return season.divisions[(+$stateParams.divisionIndex - 1) || 0];
}
