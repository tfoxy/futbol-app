export default cardFactory;

function cardFactory(DS) {
  'ngInject';

  return DS.defineResource({
    name: 'card',
    relations: {
      hasOne: {
        player: {
          localField: 'player',
          localKey: 'playerId'
        },
        cardType: {
          localField: 'type',
          localKey: 'typeId'
        }
      },
      belongsTo: {
        matchTeamStats: {
          localField: 'matchTeamStats',
          localKey: 'matchTeamStatsId'
        }
      }
    }
  });
}
