'use strict';

describe('Router', () => {
  const page = require('./main.po');

  afterEach(function() {
    browser.manage().logs().get('browser').then(function(browserLogs) {
      browserLogs.forEach(function(log) {
        if (log.level.value >= 1000) {
          console.error('error: ' + require('util').inspect(log.message, {colors: true}));
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

  function navigateRoutes() {
    page.nav.fixtureEl.click();
    expect(browser.getCurrentUrl()).toMatch(/#\/fixture\/1/);
    page.nav.resultsTableEl.click();
    expect(browser.getCurrentUrl()).toMatch(/#\/matches-table\/1/);
    page.nav.divisionsEls.get(1).click();
    expect(browser.getCurrentUrl()).toMatch(/#\/matches-table\/2/);
    page.nav.standingsEl.click();
    expect(browser.getCurrentUrl()).toMatch(/#\/standings\/2/);
    page.nav.fixtureEl.click();
    expect(browser.getCurrentUrl()).toMatch(/#\/fixture\/2/);
    page.nav.divisionsEls.get(0).click();
    expect(browser.getCurrentUrl()).toMatch(/#\/fixture\/1/);
    page.nav.playersEl.click();
    expect(browser.getCurrentUrl()).toMatch(/#\/players\/1/);
  }

});
