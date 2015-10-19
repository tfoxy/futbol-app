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
  }

  getStandings() {
    return this._standingsPromise;
  }

  getMatchesByTeams() {
    return this._matchesByTeamsPromise;
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
      });
    });
  });

  return matchesByTeams;
}

function generateStandingsMap(season) {
  let standingsPerDivisionId = {};

  season.divisions.forEach(division => {
    standingsPerDivisionId[division.id] = standingsCalculator(division);
  });

  return standingsPerDivisionId;
}


