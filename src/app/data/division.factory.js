import standingsCalculator from './standingsCalculator.js';

export default divisionFactory;

function divisionFactory(DS, playerStatsUtil) {
  'ngInject';

  return DS.defineResource({
    name: 'division',
    afterInject,
    methods: {
      getStandings
    },
    relations: {
      hasMany: {
        round: {
          localField: 'rounds',
          foreignKey: 'divisionId'
        },
        team: {
          localField: 'teams',
          localKeys: 'teamIds'
        }
      },
      belongsTo: {
        season: {
          localField: 'season',
          localKey: 'seasonId',
          parent: true
        }
      }
    }
  });


  function afterInject(resource, division) {
    division.matchesByTeams = Object.create(null);
    division.playerStatsById = Object.create(null);
    Object.defineProperty(division, 'playerStatsList', {
      get: () => {
        return playerStatsUtil.toArray(division.playerStatsById);
      }
    });
  }


  function getStandings() {
    return standingsCalculator(this);
  }
}
