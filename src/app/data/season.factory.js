export default seasonFactory;

function seasonFactory(DS) {
  'ngInject';

  return DS.defineResource({
    name: 'season',
    relations: {
      hasMany: {
        division: {
          localField: 'divisions',
          foreignKey: 'seasonId'
        }
      }
    }
  });
}
