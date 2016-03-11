'use strict';

require('mocha-generators').install();

const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-string'));

describe('Router', () => {
  const page = require('./main.po');

  afterEach(function() {
    return browser.manage().logs().get('browser').then(function(browserLogs) {
      browserLogs.forEach(function(log) {
        // logs with a level value >= 1000 are errors
        if (log.level.value >= 1000) {
          // '\x1b[31m' is for color red
          // '\x1b[37m' is for color gray
          // '\x1b[0m' is for resetting color
          let lines = log.message.split('\n');
          let firstLine = lines.shift();
          let otherLines = lines.join('\n');
          console.error('\x1b[31m' + firstLine + '\x1b[0m');
          if (otherLines.length > 0) {
            console.error('\x1b[37m' + otherLines + '\x1b[0m');
          }
        }
      });
    });
  });

  describe('with mock data', function() {
    beforeEach(function() {
      page.loadMockData();
      return page.navigate().then(function() {
        console.log('NAVIGATED');
      });
    });

    afterEach(function() {
      browser.clearMockModules();
    });

    it('should change the url when using the navbar', navigateRoutes);
  });

  describe('without mock data', function() {
    beforeEach(function() {
      return page.navigate();
    });

    it('should change the url when using the navbar', navigateRoutes);
  });

  function * navigateRoutes() {
    yield page.nav.fixtureEl.click();
    expect(yield browser.getCurrentUrl()).to.endsWith('#/season/last/fixture/division/1');
    yield page.nav.resultsTableEl.click();
    expect(yield browser.getCurrentUrl()).to.endsWith('/season/last/results/division/1');
    yield page.nav.divisionsEls.get(1).click();
    expect(yield browser.getCurrentUrl()).to.endsWith('/season/last/results/division/2');
    yield page.nav.standingsEl.click();
    expect(yield browser.getCurrentUrl()).to.endsWith('/season/last/standings/division/2');
    yield page.nav.fixtureEl.click();
    expect(yield browser.getCurrentUrl()).to.endsWith('/season/last/fixture/division/2');
    yield page.nav.divisionsEls.get(0).click();
    expect(yield browser.getCurrentUrl()).to.endsWith('/season/last/fixture/division/1');
    yield page.nav.playersEl.click();
    expect(yield browser.getCurrentUrl()).to.endsWith('/season/last/players/division/1');
  }

});
