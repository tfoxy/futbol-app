import matchesTableModule from './matchesTable.module.js';

describe(matchesTableModule.name + '.controller', () => {
  let controller, matchesByTeams, standings;

  beforeEach(angular.mock.module(matchesTableModule.name));

  beforeEach(inject(($controller) => {
    matchesByTeams = {};
    standings = {};
    controller = $controller('MatchesTableController', {
      matchesByTeams,
      standings
    });
  }));

  describe('#getMatchGoalsByTeam', () => {

    it('should return the scored local goals number if the team is local', () => {
      let team = {
        id: 1
      };
      let match = {
        local: {
          team: team,
          goals: [{}]
        },
        visitor: {
          team: {id: 2},
          goals: []
        }
      };
      let goals = controller.getMatchGoalsByTeam(match, team);
      expect(goals).to.equals(1);
    });

    it('should return the scored visitor goals number if the team is visitor', () => {
      let team = {
        id: 1
      };
      let match = {
        local: {
          team: {id: 2},
          goals: [{}]
        },
        visitor: {
          team: team,
          goals: []
        }
      };
      let goals = controller.getMatchGoalsByTeam(match, team);
      expect(goals).to.equals(0);
    });

  });

  describe('#getMatchByTeams', () => {

    it('should return the match played by both teams', () => {
      let localTeam = {id: 1};
      let visitorTeam = {id: 2};
      let match = {
        id: 3,
        local: {
          team: localTeam
        },
        visitor: {
          team: visitorTeam
        }
      };

      matchesByTeams[1] = {2: match};

      let returnedMatch = controller.getMatchByTeams(localTeam, visitorTeam);

      expect(returnedMatch).to.equal(match);
    });

  });

});
