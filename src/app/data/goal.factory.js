export default goalFactory;

function goalFactory(DS) {
  'ngInject';

  return DS.defineResource({
    name: 'goal',
    relations: {
      hasOne: {
        player: {
          localField: 'player',
          localKey: 'playerId'
        }
      },
      belongsTo: {
        matchTeamStats: {
          localField: 'matchTeamStats',
          localKey: 'matchTeamStatsId',
          parent: true
        }
      }
    }
  });
}
