import matchesTableModule from './matchesTable.module.js';

describe(matchesTableModule.name + '.controller', () => {
  let controller;

  beforeEach(angular.mock.module(matchesTableModule.name));

  beforeEach(inject(($controller) => {
    controller = $controller('MatchesTableController', {
      matchesByTeams: {},
      standings: {}
    });
  }));

  describe('#getMatchGoalsByTeam', () => {

    it('should return the scored local goals number if the team is local', () => {
      let team = {
        id: 1
      };
      let match = {
        localTeam: team,
        visitorTeam: {id: 2},
        localGoals: [{}],
        visitorGoals: []
      };
      let goals = controller.getMatchGoalsByTeam(match, team);
      expect(goals).to.equals(1);
    });

    it('should return the scored visitor goals number if the team is visitor', () => {
      let team = {
        id: 1
      };
      let match = {
        localTeam: {id: 2},
        visitorTeam: team,
        localGoals: [{}],
        visitorGoals: []
      };
      let goals = controller.getMatchGoalsByTeam(match, team);
      expect(goals).to.equals(0);
    });

  });

});
