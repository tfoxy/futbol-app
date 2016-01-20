/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

const fs = require('fs');
const mockData = require('./data.mock.json');

const angularMocksScript = fs.readFileSync('bower_components/angular-mocks/angular-mocks.js', {
  encoding: 'utf8'
});

function MainPage() {
  this.nav = {
    element: $('body > header > .navbar')
  };
  this.nav.standingsEl = this.nav.element.$('a[ui-sref^="app.standings"]');
  this.nav.resultsTableEl = this.nav.element.$('a[ui-sref^="app.matchesTable"]');
  this.nav.fixtureEl = this.nav.element.$('a[ui-sref^="app.fixture"]');
  this.nav.playersEl = this.nav.element.$('a[ui-sref^="app.players"]');
  this.nav.divisionsEls = this.nav.element.$$('[ui-view="divisionList"] a');
}

MainPage.prototype.navigate = navigate;
MainPage.prototype.loadMockData = loadMockData;
MainPage.prototype.logBrowserLog = logBrowserLog;

function navigate() {
  return browser.get('/index.html');
}

function loadMockData() {
  browser.addMockModule('ngMockE2E', angularMocksScript);
  browser.addMockModule('futbolAppDev', function(mockData) {
    angular.module('futbolAppDev', ['ngMockE2E'])
      .run(['$httpBackend', function($httpBackend) {
        $httpBackend.whenGET('api/seasonData/last.json').respond(mockData);
        $httpBackend.whenGET(/^app\//).passThrough();
      }]);
  }, mockData);
}

function logBrowserLog() {
  browser.manage().logs().get('browser').then(function(browserLog) {
    console.log('log: ' + require('util').inspect(browserLog));
  });
}

module.exports = new MainPage();
