export default seasonDataFactory;

function seasonDataFactory(DS) {
  'ngInject';

  return DS.defineResource({
    name: 'seasonData',
    relations: {
      hasOne: {
        season: {
          localField: 'season',
          localKey: 'id'
        }
      },
      hasMany: {
        division: {
          localField: 'divisions'
        },
        round: {
          localField: 'rounds'
        },
        match: {
          localField: 'matches'
        },
        matchTeamStats: {
          localField: 'matchTeamStats'
        },
        team: {
          localField: 'teams'
        },
        player: {
          localField: 'players'
        },
        goal: {
          localField: 'goals'
        },
        card: {
          localField: 'cards'
        },
        cardType: {
          localField: 'cardTypes'
        }
      }
    }
  });
}
