class DivisionListController {

  static get resolve() {
    return {
      divisions: ['data', data => data.getDivisionList()]
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
