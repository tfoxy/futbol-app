'use strict';
import dataModule from './data.module.js';
import standingsCalculator from './standingsCalculator.js';

describe(dataModule.name + '.standingsCalculator', () => {

  it('should return an array with the same length as the teams', () => {
    let standings = standingsCalculator({
      rounds: [],
      teams: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
    });

    expect(standings).to.have.length(4);
  });

  it('should increase matchesWon if the team won a match', () => {
    let standings = standingsCalculator({
      rounds: [{
        matches: [{
          hasResults: true,
          localStats: {
            team: {id: 3},
            goals: [1],
            cards: []
          },
          visitorStats: {
            team: {id: 4},
            goals: [],
            cards: []
          }
        }]
      }],
      teams: [{id: 3}, {id: 4}]
    });

    expect(standings[0]).to.have.property('matchesWon', 1);
  });

  it('should not increase matchesWon if the team lost a match', () => {
    let standings = standingsCalculator({
      rounds: [{
        matches: [{
          hasResults: true,
          localStats: {
            team: {id: 3},
            goals: [1],
            cards: []
          },
          visitorStats: {
            team: {id: 4},
            goals: [],
            cards: []
          }
        }]
      }],
      teams: [{id: 3}, {id: 4}]
    });

    expect(standings[1]).to.have.property('matchesWon', 0);
  });

  it('should increase matchesLost for the loser team', () => {
    let standings = standingsCalculator({
      rounds: [{
        matches: [{
          hasResults: true,
          localStats: {
            team: {id: 3},
            goals: [1],
            cards: []
          },
          visitorStats: {
            team: {id: 4},
            goals: [],
            cards: []
          }
        }]
      }],
      teams: [{id: 3}, {id: 4}]
    });

    expect(standings[1]).to.have.property('matchesLost', 1);
  });

  it('should sum the goals by both teams (scored and against)', () => {
    let standings = standingsCalculator({
      rounds: [{
        matches: [{
          hasResults: true,
          localStats: {
            team: {id: 3},
            goals: new Array(5),
            cards: []
          },
          visitorStats: {
            team: {id: 4},
            goals: new Array(2),
            cards: []
          }
        }]
      }],
      teams: [{id: 3}, {id: 4}]
    });

    expect(standings[0]).to.have.property('goalsScored', 5);
    expect(standings[0]).to.have.property('goalsAgainst', 2);
    expect(standings[1]).to.have.property('goalsScored', 2);
    expect(standings[1]).to.have.property('goalsAgainst', 5);
  });

  it('should increase matchesDrawn of both teams if there was a draw', () => {
    let standings = standingsCalculator({
      rounds: [{
        matches: [{
          hasResults: true,
          localStats: {
            team: {id: 3},
            goals: [1],
            cards: []
          },
          visitorStats: {
            team: {id: 4},
            goals: [1],
            cards: []
          }
        }]
      }],
      teams: [{id: 3}, {id: 4}]
    });

    expect(standings[0]).to.have.property('matchesDrawn', 1);
    expect(standings[1]).to.have.property('matchesDrawn', 1);
  });

  it('should add 3 points for a won match and no points for a match lost', () => {
    let standings = standingsCalculator({
      rounds: [{
        matches: [{
          hasResults: true,
          localStats: {
            team: {id: 3},
            goals: [1, 2],
            cards: []
          },
          visitorStats: {
            team: {id: 4},
            goals: [1],
            cards: []
          }
        }]
      }],
      teams: [{id: 3}, {id: 4}]
    });

    expect(standings[0]).to.have.property('points', 3);
    expect(standings[1]).to.have.property('points', 0);
  });

  it('should add 1 points for both teams for a draw', () => {
    let standings = standingsCalculator({
      rounds: [{
        matches: [{
          hasResults: true,
          localStats: {
            team: {id: 3},
            goals: [],
            cards: []
          },
          visitorStats: {
            team: {id: 4},
            goals: [],
            cards: []
          }
        }]
      }],
      teams: [{id: 3}, {id: 4}]
    });

    expect(standings[0]).to.have.property('points', 1);
    expect(standings[1]).to.have.property('points', 1);
  });

  it('should order the array by points', () => {
    let standings = standingsCalculator({
      rounds: [{
        matches: [{
          hasResults: true,
          localStats: {
            team: {id: 4},
            goals: [1],
            cards: []
          },
          visitorStats: {
            team: {id: 3},
            goals: [],
            cards: []
          }
        }]
      }],
      teams: [{id: 3}, {id: 4}]
    });

    expect(standings[0]).to.have.deep.property('team.id', 4);
    expect(standings[1]).to.have.deep.property('team.id', 3);
  });

  it('should order by goals difference when both teams have the same points', () => {
    let standings = standingsCalculator({
      rounds: [{
        matches: [{
          hasResults: true,
          localStats: {
            team: {id: 3},
            goals: new Array(8),
            cards: []
          },
          visitorStats: {
            team: {id: 5},
            goals: new Array(6),
            cards: []
          }
        }, {
          hasResults: true,
          localStats: {
            team: {id: 4},
            goals: new Array(5),
            cards: []
          },
          visitorStats: {
            team: {id: 5},
            goals: new Array(2),
            cards: []
          }
        }]
      }],
      teams: [{id: 3}, {id: 4}, {id: 5}]
    });

    expect(standings[0]).to.have.deep.property('team.id', 4);
    expect(standings[1]).to.have.deep.property('team.id', 3);
  });

  it('should order by goalsScored when both teams have' +
  ' the same points and goals difference', () => {
    let standings = standingsCalculator({
      rounds: [{
        matches: [{
          hasResults: true,
          localStats: {
            team: {id: 3},
            goals: new Array(5),
            cards: []
          },
          visitorStats: {
            team: {id: 5},
            goals: new Array(3),
            cards: []
          }
        }, {
          hasResults: true,
          localStats: {
            team: {id: 4},
            goals: new Array(8),
            cards: []
          },
          visitorStats: {
            team: {id: 5},
            goals: new Array(6),
            cards: []
          }
        }]
      }],
      teams: [{id: 3}, {id: 4}, {id: 5}]
    });

    expect(standings[0]).to.have.deep.property('team.id', 4);
    expect(standings[1]).to.have.deep.property('team.id', 3);
  });

  it('should skip a match where hasResults is false', () => {
    let standings = standingsCalculator({
      rounds: [{
        matches: [{
          hasResults: false,
          localStats: {team: {id: 3}},
          visitorStats: {team: {id: 4}}
        }]
      }],
      teams: [{id: 3}, {id: 4}]
    });

    expect(standings[0]).to.have.property('points', 0);
    expect(standings[1]).to.have.property('points', 0);
  });

  it('should add 3 points for a visitor that wins a match', () => {
    let standings = standingsCalculator({
      rounds: [{
        matches: [{
          hasResults: true,
          localStats: {
            team: {id: 3},
            goals: [],
            cards: []
          },
          visitorStats: {
            team: {id: 4},
            goals: [1],
            cards: []
          }
        }]
      }],
      teams: [{id: 3}, {id: 4}]
    });

    expect(standings[0]).to.have.property('points', 3);
  });

  it('should return an empty array if there are no teams and rounds', () => {
    let standings = standingsCalculator({
      rounds: [],
      teams: []
    });

    expect(standings).to.have.length(0);
  });

  it('should sum all played matches in matchesPlayed property', () => {
    let standings = standingsCalculator({
      rounds: [{
        matches: [{
          hasResults: true,
          localStats: {
            team: {id: 3},
            goals: [1],
            cards: []
          },
          visitorStats: {
            team: {id: 4},
            goals: [],
            cards: []
          }
        }, {
          hasResults: true,
          localStats: {
            team: {id: 3},
            goals: [],
            cards: []
          },
          visitorStats: {
            team: {id: 5},
            goals: [],
            cards: []
          }
        }, {
          hasResults: true,
          localStats: {
            team: {id: 3},
            goals: [],
            cards: []
          },
          visitorStats: {
            team: {id: 4},
            goals: [1],
            cards: []
          }
        }]
      }],
      teams: [{id: 3}, {id: 4}, {id: 5}]
    });

    expect(standings[0]).to.have.property('matchesPlayed', 3);
  });

  it('should have the goals difference in goalsDifference property', () => {
    let standings = standingsCalculator({
      rounds: [{
        matches: [{
          hasResults: true,
          localStats: {
            team: {id: 3},
            goals: new Array(3),
            cards: []
          },
          visitorStats: {
            team: {id: 4},
            goals: new Array(5),
            cards: []
          }
        }]
      }],
      teams: [{id: 3}, {id: 4}]
    });

    expect(standings[0]).to.have.property('goalsDifference', 2);
    expect(standings[1]).to.have.property('goalsDifference', -2);
  });

  it('should count the yellow cards', () => {
    let standings = standingsCalculator({
      rounds: [{
        matches: [{
          hasResults: true,
          localStats: {
            team: {id: 3},
            goals: [1],
            cards: [{type: 'yellow'}, {type: 'red'}, {type: 'yellow'}]
          },
          visitorStats: {
            team: {id: 4},
            goals: [],
            cards: []
          }
        }]
      }],
      teams: [{id: 3}, {id: 4}]
    });

    expect(standings[0]).to.have.property('yellowCards', 2);
  });

  it('should count the red cards', () => {
    let standings = standingsCalculator({
      rounds: [{
        matches: [{
          hasResults: true,
          localStats: {
            team: {id: 3},
            goals: [1],
            cards: [{type: 'yellow'}, {type: 'red'}, {type: 'yellow'}]
          },
          visitorStats: {
            team: {id: 4},
            goals: [],
            cards: []
          }
        }]
      }],
      teams: [{id: 3}, {id: 4}]
    });

    expect(standings[0]).to.have.property('redCards', 1);
  });

});
