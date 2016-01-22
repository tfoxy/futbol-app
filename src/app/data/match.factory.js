export default matchFactory;

function matchFactory($timeout, DS, playerStatsUtil) {
  'ngInject';

  const Match = DS.defineResource({
    name: 'match',
    afterInject,
    relations: {
      hasOne: {
        player: {
          localField: 'bestPlayer',
          localKey: 'bestPlayerId'
        },
        matchTeamStats: [{
          localField: 'localStats',
          localKey: 'localStatsId'
        }, {
          localField: 'visitorStats',
          localKey: 'visitorStatsId'
        }]
      },
      belongsTo: {
        round: {
          localField: 'round',
          localKey: 'roundId',
          parent: true
        }
      }
    }
  });

  Match._helpers = {
    generateMatchesByTeams,
    generateTeamMatchList,
    generatePlayerStatsPerDivision
  };

  return Match;


  function afterInject(resource, match) {
    $timeout(() => {
      generateMatchesByTeams(match);
      generateTeamMatchList(match);
      generatePlayerStatsPerDivision(match);
    });
  }


  function generateMatchesByTeams(match) {
    let localId = match.localStats.team.id;
    let visitorId = match.visitorStats.team.id;
    let matchesByTeams = match.round.division.matchesByTeams;

    if (!(localId in matchesByTeams)) {
      matchesByTeams[localId] = Object.create(null);
    }
    if (!(visitorId in matchesByTeams)) {
      matchesByTeams[visitorId] = Object.create(null);
    }

    matchesByTeams[localId][visitorId] = match;
    matchesByTeams[visitorId][localId] = match;
  }


  function generateTeamMatchList(match) {
    match.localStats.team.matchList.push(match);
    match.visitorStats.team.matchList.push(match);
  }


  function generatePlayerStatsPerDivision(match) {
    let playerStatsById = match.round.division.playerStatsById;
    playerStatsUtil.addMatch(playerStatsById, match);
  }
}
