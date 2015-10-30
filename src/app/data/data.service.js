import standingsCalculator from './standingsCalculator.js';

// A RESTful factory for retrieving contacts from 'data.json'
class DataService {

  constructor($http) {
    'ngInject';
    this._path = 'assets/data.json';

    this._request = $http.get(this._path).then(resp => {
      return resp.data;
    });

    this._initialize();
  }

  _initialize() {
    this._lastSeasonPromise = this._request.then(data => {
      let seasons = data.seasons;
      let lastSeason = seasons[seasons.length - 1];
      return lastSeason;
    });

    this._standingsPromise =
      this._lastSeasonPromise.then(generateStandingsMap);

    this._matchesByTeamsPromise =
      this._lastSeasonPromise.then(generateMatchesByTeams);

    this._teamsPromise =
      this._lastSeasonPromise.then(generateTeamsById);

    this._matchesByIdPromise =
      this._lastSeasonPromise.then(generateMatchesById);
  }

  getStandings() {
    return this._standingsPromise;
  }

  getMatchesByTeams() {
    return this._matchesByTeamsPromise;
  }

  getDivisionList() {
    return this._lastSeasonPromise.then(season => season.divisions);
  }

  getTeams() {
    return this._teamsPromise;
  }

  getMatchesById() {
    return this._matchesByIdPromise;
  }

  getDivisionsByIndex() {
    return this._lastSeasonPromise.then(season => {
      let divisionsByIndex = {};
      season.divisions.forEach(division => {
        divisionsByIndex[division.index] = division;
      });
      return divisionsByIndex;
    });
  }

  getDivisionByIndex(divisionIndex) {
    return this._lastSeasonPromise.then(season => {
      return season.divisions.find(division => {
        return division.index === +divisionIndex;
      });
    });
  }

}

export default DataService;

// //////////////

function generateMatchesByTeams(season) {
  let matchesByTeams = {};

  season.divisions.forEach(division => {
    division.rounds.forEach(round => {
      round.matches.forEach(match => {
        let localId = match.local.team.id;
        let visitorId = match.visitor.team.id;

        if (!(localId in matchesByTeams)) {
          matchesByTeams[localId] = {};
        }
        if (!(visitorId in matchesByTeams)) {
          matchesByTeams[visitorId] = {};
        }

        matchesByTeams[localId][visitorId] = match;
        matchesByTeams[visitorId][localId] = match;

        match.round = round;
      });

      round.division = division;
    });
  });

  return matchesByTeams;
}

function generateStandingsMap(season) {
  let standingsPerDivisionIndex = {};

  season.divisions.forEach(division => {
    standingsPerDivisionIndex[division.index] = standingsCalculator(division);
  });

  return standingsPerDivisionIndex;
}

function generateTeamsById(season) {
  let teamsById = {};

  season.divisions.forEach(division => {
    division.teams.forEach(team => {
      teamsById[team.id] = team;
    });
  });

  return teamsById;
}

function generateMatchesById(season) {
  let matchesById = {};

  season.divisions.forEach(division => {
    division.rounds.forEach(round => {
      round.matches.forEach(match => {
        matchesById[match.id] = match;

        if (match.hasResults) {
          match.local.playerStatsById = createPlayerStatsById(match, match.local);
          match.visitor.playerStatsById = createPlayerStatsById(match, match.visitor);
        }
      });
    });
  });

  return matchesById;
}

const NONE_CARD = {type: 'none'};
function createPlayerStatsById(match, teamStats) {
  let playerStatsById = {};

  teamStats.players.forEach(player => {
    playerStatsById[player.id] = {
      isBestPlayer: false,
      goals: [],
      card: NONE_CARD
    };
  });

  teamStats.goals.forEach(goal => {
    playerStatsById[goal.player.id].goals.push(goal);
  });

  teamStats.cards.forEach(card => {
    playerStatsById[card.player.id].card = card;
  });

  if (match.bestPlayer && match.bestPlayer.id in playerStatsById) {
    playerStatsById[match.bestPlayer.id].isBestPlayer = true;
  }

  return playerStatsById;
}
