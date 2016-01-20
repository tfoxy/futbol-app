class DivisionListController {
  constructor(season, $state, userData) {
    'ngInject';

    this.list = season.divisions;
    this.$state = $state;
    this.userData = userData;
  }

  divisionHref(divisionIndex) {
    let seasonId = this.$state.params.seasonId;
    return this.$state.href(this.$state.current.name, {seasonId, divisionIndex});
  }

  stateHasDivisionIndexParam() {
    return 'divisionIndex' in this.$state.params;
  }
}

export default DivisionListController;
