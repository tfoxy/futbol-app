import teamModule from './team.module.js';

describe(teamModule.name + '.controller', () => {
  let controller, team;

  beforeEach(angular.mock.module(teamModule.name));

  beforeEach(inject(($controller) => {
    team = {id: '79', matchList: []};
    controller = $controller('TeamController', {
      team
    });
  }));

  describe('#getMatchOpponentStats', () => {

    it('should return the visitor team stats if team is local', () => {
      let match = {
        localStats: {
          team: {id: 7}
        },
        visitorStats: {
          team: team
        }
      };

      expect(controller.getMatchOpponentStats(match)).to.have.deep.property('team.id', 7);
    });

    it('should return the local team stats if team is visitor', () => {
      let match = {
        localStats: {
          team: team
        },
        visitorStats: {
          team: {id: 7}
        }
      };

      expect(controller.getMatchOpponentStats(match)).to.have.deep.property('team.id', 7);
    });

  });

  describe('#getMatchTeamStats', () => {

    it('should return the local team stats if team is local', () => {
      let match = {
        localStats: {
          team: {id: 7}
        },
        visitorStats: {
          team: team
        }
      };

      expect(controller.getMatchTeamStats(match)).to.have.deep.property('team.id', team.id);
    });

    it('should return the visitor team stats if team is visitor', () => {
      let match = {
        localStats: {
          team: team
        },
        visitorStats: {
          team: {id: 7}
        }
      };

      expect(controller.getMatchTeamStats(match)).to.have.deep.property('team.id', team.id);
    });

  });

  describe('#isBestPlayerFromTeam', () => {

    it('should return true if best player is in the team', () => {
      let match = {
        bestPlayer: {id: 3},
        localStats: {
          team: {id: 7},
          players: [{id: 5}]
        },
        visitorStats: {
          team: team,
          players: [{id: 9}, {id: 3}, {id: 11}]
        }
      };

      expect(controller.isBestPlayerFromTeam(match)).to.be.true;
    });

    it('should return false if best player is not in the team', () => {
      let match = {
        bestPlayer: {id: 3},
        localStats: {
          team: team,
          players: [{id: 5}]
        },
        visitorStats: {
          team: {id: 7},
          players: [{id: 3}]
        }
      };

      expect(controller.isBestPlayerFromTeam(match)).to.be.false;
    });

    it('should return false if there is no best player', () => {
      let match = {
        localStats: {
          team: team,
          players: [{id: 5}]
        },
        visitorStats: {
          team: {id: 7},
          players: [{id: 3}]
        }
      };

      expect(controller.isBestPlayerFromTeam(match)).to.be.false;
    });

  });

  describe('#_getPlayerList', () => {

    it('should return an empty array if there are no matches', () => {
      expect(controller._getPlayerList()).to.have.length(0);
    });

    it('should return players with goals, yellow cards, red cards and best player', () => {
      team.matchList = [
        {
          hasResults: true,
          bestPlayer: {id: 3},
          localStats: {
            team: team,
            players: [{id: 3}],
            goals: [{player: {id: 3}}, {player: {id: 3}}],
            cards: [
              {type: 'yellow', player: {id: 3}},
              {type: 'yellow', player: {id: 3}},
              {type: 'red', player: {id: 3}}
            ]
          },
          visitorStats: {
            team: {id: 7},
            players: []
          }
        }
      ];
      let playerList = controller._getPlayerList();

      expect(playerList).to.have.length(1);
      expect(playerList[0]).to.have.deep.property('player.id', 3);
      expect(playerList[0]).to.have.property('goals', 2);
      expect(playerList[0]).to.have.property('yellowCards', 2);
      expect(playerList[0]).to.have.property('redCards', 1);
      expect(playerList[0]).to.have.property('bestPlayer', 1);
    });

    it('should sort the players by goals', () => {
      team.matchList = [
        {
          hasResults: true,
          localStats: {
            team: team,
            players: [{id: 3}, {id: 5}, {id: 9}],
            goals: [{player: {id: 5}}, {player: {id: 5}}, {player: {id: 3}}],
            cards: []
          },
          visitorStats: {
            team: {id: 7},
            players: []
          }
        }
      ];
      let playerList = controller._getPlayerList();

      expect(playerList).to.have.length(3);
      expect(playerList[0]).to.have.deep.property('player.id', 5);
      expect(playerList[1]).to.have.deep.property('player.id', 3);
    });

    it('should sort the players by best player number if they have the same goals', () => {
      team.matchList = [
        {
          hasResults: true,
          bestPlayer: {id: 5},
          localStats: {
            team: team,
            players: [{id: 3}, {id: 5}, {id: 9}],
            goals: [],
            cards: []
          },
          visitorStats: {
            team: {id: 7},
            players: []
          }
        }
      ];
      let playerList = controller._getPlayerList();

      expect(playerList).to.have.length(3);
      expect(playerList[0]).to.have.deep.property('player.id', 5);
    });

    it('should skip stats for match that has no results', () => {
      team.matchList = [
        {
          hasResults: false,
          localStats: {
            team: team,
            players: [{id: 3}]
          },
          visitorStats: {
            team: {id: 7},
            players: []
          }
        }
      ];
      let playerList = controller._getPlayerList();

      expect(playerList).to.have.length(1);
    });

  });

});
