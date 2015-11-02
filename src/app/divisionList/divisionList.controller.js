class DivisionListController {

  static get resolve() {
    return {
      processedData: ['data', data => data.getProcessedData()],
      divisions: ['processedData', processedData => processedData.lastSeason.divisions]
    };
  }

  constructor(divisions, $state, userData) {
    'ngInject';

    this.list = divisions;
    this.$state = $state;
    this.userData = userData;
  }

  divisionHref(divisionIndex) {
    return this.$state.href(this.$state.current.name, {divisionIndex});
  }

  stateHasDivisionIndexParam() {
    return 'divisionIndex' in this.$state.params;
  }
}

export default DivisionListController;
