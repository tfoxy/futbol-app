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

  getDivisionsByIndex() {
    return this._lastSeasonPromise.then(season => {
      let divisionsByIndex = {};
      season.divisions.forEach(division => {
        divisionsByIndex[division.index] = division;
      });
      return divisionsByIndex;
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
