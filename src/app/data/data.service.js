import standingsCalculator from './standingsCalculator.js';

// A RESTful factory for retrieving contacts from 'data.json'
class DataService {

  static get _listeners() {
    return {
      initializeDivision,
      initializeTeams,
      generateMatchesByTeams,
      generateMatchesById,
      generatePlayerStatsPerMatch,
      generateTeamsById,
      generateDivisionsByIndex,
      createPlayerStatsById
    };
  }

  constructor($http) {
    'ngInject';
    this._path = 'assets/data.json';

    this._request = $http.get(this._path).then(resp => resp.data);

    this._initialize();
  }

  _initialize() {
    let processedData = {
      matchesByTeams: {},
      standingsByDivisionIndex: {},
      divisionsByIndex: {},
      teamsById: {},
      matchesById: {}
    };

    let listeners = {
      division: [
        initializeDivision,
        initializeTeams,
        generateTeamsById,
        generateDivisionsByIndex
      ],
      round: [],
      match: [
        generateMatchesByTeams,
        generateMatchesById,
        generatePlayerStatsPerMatch,
        generateTeamMatchList
      ]
    };

    this._processedDataPromise = this._request.then(data => {
      let seasons = data.seasons;
      let lastSeason = seasons[seasons.length - 1];
      processedData.lastSeason = lastSeason;
      this._iterateSeasonData(lastSeason, listeners, processedData);

      return processedData;
    });
  }

  getProcessedData() {
    return this._processedDataPromise;
  }

  _iterateSeasonData(season, listeners, processedData) {
    season.divisions.forEach(division => {
      division.season = season;
      listeners && listeners.division.forEach(listener => {
        listener(division, processedData);
      });
      division.rounds.forEach(round => {
        round.division = division;
        listeners && listeners.round.forEach(listener => {
          listener(round, processedData);
        });
        round.matches.forEach(match => {
          match.round = round;
          listeners && listeners.match.forEach(listener => {
            listener(match, processedData);
          });
        });
      });
    });
  }
}

export default DataService;

// //////////////

function generateMatchesByTeams(match) {
  let localId = match.local.team.id;
  let visitorId = match.visitor.team.id;
  let matchesByTeams = match.round.division.matchesByTeams;

  if (!(localId in matchesByTeams)) {
    matchesByTeams[localId] = {};
  }
  if (!(visitorId in matchesByTeams)) {
    matchesByTeams[visitorId] = {};
  }

  matchesByTeams[localId][visitorId] = match;
  matchesByTeams[visitorId][localId] = match;
}

function initializeDivision(division) {
  division.standings = standingsCalculator(division);
  division.matchesByTeams = {};
}

function initializeTeams(division) {
  division.teams.forEach(team => {
    team.matchList = [];
  });
}

function generateTeamsById(division, processedData) {
  division.teams.forEach(team => {
    processedData.teamsById[team.id] = team;
  });
}

function generateMatchesById(match, processedData) {
  processedData.matchesById[match.id] = match;
}

function generatePlayerStatsPerMatch(match) {
  if (match.hasResults) {
    match.local.playerStatsById = createPlayerStatsById(match, match.local);
    match.visitor.playerStatsById = createPlayerStatsById(match, match.visitor);
  }
}

function generateDivisionsByIndex(division, processedData) {
  processedData.divisionsByIndex[division.index] = division;
}

function generateTeamMatchList(match, processedData) {
  processedData.teamsById[match.local.team.id].matchList.push(match);
  processedData.teamsById[match.visitor.team.id].matchList.push(match);
}

const NONE_CARD = {type: 'none', severity: 0};
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
