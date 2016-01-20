export default roundFactory;

function roundFactory(DS) {
  'ngInject';

  return DS.defineResource({
    name: 'round',
    relations: {
      hasMany: {
        match: {
          localField: 'matches',
          foreignKey: 'roundId'
        }
      },
      belongsTo: {
        division: {
          localField: 'division',
          localKey: 'divisionId',
          parent: true
        }
      }
    }
  });
}
