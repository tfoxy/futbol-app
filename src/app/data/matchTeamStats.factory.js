export default matchTeamStatsFactory;

function matchTeamStatsFactory(DS) {
  'ngInject';

  const NONE_CARD = {
    type: {
      name: '',
      severity: 0
    }
  };

  return DS.defineResource({
    name: 'matchTeamStats',
    methods: {
      getPlayerStatsById: getPlayerStatsById
    },
    relations: {
      hasOne: {
        team: {
          localField: 'team',
          localKey: 'teamId'
        }
      },
      hasMany: {
        card: {
          localField: 'cards',
          foreignKey: 'matchTeamStatsId'
        },
        goal: {
          localField: 'goals',
          foreignKey: 'matchTeamStatsId'
        },
        player: {
          localField: 'players',
          localKeys: 'playerIds'
        }
      },
      belongsTo: {
        match: {
          localField: 'match',
          localKey: 'matchId',
          parent: true
        }
      }
    }
  });


  function getPlayerStatsById() {
    if (!this.match.hasResults) {
      return null;
    }

    let playerStatsById = Object.create(null);
    let bestPlayer = this.match.bestPlayer;

    this.players.forEach(player => {
      playerStatsById[player.id] = {
        isBestPlayer: false,
        goals: [],
        card: NONE_CARD
      };
    });

    this.goals.forEach(goal => {
      playerStatsById[goal.player.id].goals.push(goal);
    });

    this.cards.forEach(card => {
      playerStatsById[card.player.id].card = card;
    });

    if (bestPlayer && bestPlayer.id in playerStatsById) {
      playerStatsById[bestPlayer.id].isBestPlayer = true;
    }

    return playerStatsById;
  }
}
