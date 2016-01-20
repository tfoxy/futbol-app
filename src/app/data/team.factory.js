export default teamFactory;

function teamFactory(DS) {
  'ngInject';

  return DS.defineResource({
    name: 'team',
    afterInject: afterInject
  });


  function afterInject(resource, team) {
    team.matchList = [];
  }
}
