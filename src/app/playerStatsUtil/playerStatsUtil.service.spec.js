import playerStatsUtilModule from './playerStatsUtil.module.js';

describe(playerStatsUtilModule.name + '.service', () => {
  let playerStatsUtil;

  beforeEach(angular.mock.module(playerStatsUtilModule.name));

  beforeEach(inject(_playerStatsUtil_ => {
    playerStatsUtil = _playerStatsUtil_;
  }));

  describe('#addTeamStats', () => {

    it('should do nothing if the match is empty (has only an empty player list)', () => {
      let playerStatsById = {};
      playerStatsUtil.addTeamStats(playerStatsById, {players: []});

      expect(playerStatsById).to.deep.equal({});
    });

    it('should add players from the player list', () => {
      let playerList = [{id: 3, team: {id: 5}}];
      let playerStatsById = {};
      playerStatsUtil.addTeamStats(playerStatsById, {players: playerList});

      expect(playerStatsById).to.have.property('3');
    });

    it('should add a player property to the player stats', () => {
      let player = {id: 3, team: {id: 5}};
      let playerList = [player];
      let playerStatsById = {};
      playerStatsUtil.addTeamStats(playerStatsById, {players: playerList});

      expect(playerStatsById).to.have.deep.property('[3].player', player);
    });

    it('should add the team to the player stats team list', () => {
      let team = {id: 5};
      let player = {id: 3};
      let playerList = [player];
      let playerStatsById = {};
      playerStatsUtil.addTeamStats(playerStatsById, {players: playerList, team});

      expect(playerStatsById).to.have.deep.property('[3].teams[0]', team);
    });

    it('should set team as lastTeam', () => {
      let team = {id: 5};
      let player = {id: 3};
      let playerList = [player];
      let playerStatsById = {};
      playerStatsUtil.addTeamStats(playerStatsById, {players: playerList, team});

      expect(playerStatsById).to.have.deep.property('[3].lastTeam', team);
    });

    it('should start player stats with 0', () => {
      let playerList = [{id: 3}];
      let playerStatsById = {};
      playerStatsUtil.addTeamStats(playerStatsById, {players: playerList});

      expect(playerStatsById).to.have.deep.property('[3].goals', 0);
      expect(playerStatsById).to.have.deep.property('[3].bestPlayer', 0);
      expect(playerStatsById).to.have.deep.property('[3].yellowCards', 0);
      expect(playerStatsById).to.have.deep.property('[3].redCards', 0);
    });

    it('should count goals by the player', () => {
      let player = {id: 3};
      let anotherPlayer = {id: 7};
      let yetAnotherPlayer = {id: 9};
      let playerList = [anotherPlayer, player, yetAnotherPlayer];
      let teamStats = {
        players: playerList,
        goals: [{player}, {player: anotherPlayer}]
      };
      let playerStatsById = {};
      playerStatsUtil.addTeamStats(playerStatsById, teamStats);

      expect(playerStatsById).to.have.deep.property('[3].goals', 1);
    });

    it('should count yellow cards of the player', () => {
      let player = {id: 3};
      let anotherPlayer = {id: 7};
      let playerList = [player, anotherPlayer];
      let teamStats = {
        players: playerList,
        cards: [
          {type: 'yellow', player: anotherPlayer},
          {type: 'yellow', player},
          {type: 'red', player},
          {type: 'red', player}
        ]
      };
      let playerStatsById = {};
      playerStatsUtil.addTeamStats(playerStatsById, teamStats);

      expect(playerStatsById).to.have.deep.property('[3].yellowCards', 1);
    });

    it('should count red cards of the player', () => {
      let player = {id: 3};
      let anotherPlayer = {id: 7};
      let playerList = [player, anotherPlayer];
      let teamStats = {
        players: playerList,
        cards: [
          {type: 'yellow', player: anotherPlayer},
          {type: 'yellow', player},
          {type: 'red', player},
          {type: 'red', player}
        ]
      };
      let playerStatsById = {};
      playerStatsUtil.addTeamStats(playerStatsById, teamStats);

      expect(playerStatsById).to.have.deep.property('[3].redCards', 2);
    });

  });

  describe('#addBestPlayer', () => {

    it('should do nothing if there is no bestPlayer', () => {
      let playerStatsById = {};
      playerStatsUtil.addBestPlayer(playerStatsById, undefined);
      expect(playerStatsById).to.deep.equal({});
    });

    it('should add one to the best player', () => {
      let player = {id: 3};
      let playerStats = {player, bestPlayer: 0};
      let playerStatsById = {3: playerStats};
      playerStatsUtil.addBestPlayer(playerStatsById, player);
      expect(playerStats).to.have.property('bestPlayer', 1);
    });

  });

  describe('#addMatch', () => {

    it('should call addTeamStats and addBestPlayer', () => {
      let addTeamStats = playerStatsUtil.addTeamStats = sinon.spy();
      let addBestPlayer = playerStatsUtil.addBestPlayer = sinon.spy();
      let playerStatsById = {};
      let match = {local: {team: {id: 1}}, visitor: {team: {id: 2}}, bestPlayer: {id: 3}};
      playerStatsUtil.addMatch(playerStatsById, match);

      expect(addTeamStats).to.have.been.calledTwice;
      expect(addBestPlayer).to.have.been.calledOnce;
      expect(addTeamStats).to.have.been.calledWith(playerStatsById, match.localStats);
      expect(addTeamStats).to.have.been.calledWith(playerStatsById, match.visitorStats);
      expect(addBestPlayer).to.have.been.calledWith(playerStatsById, match.bestPlayer);
    });

  });

});
