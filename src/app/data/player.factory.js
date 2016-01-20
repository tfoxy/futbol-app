export default playerFactory;

function playerFactory(DS) {
  'ngInject';

  return DS.defineResource({
    name: 'player'
  });
}
