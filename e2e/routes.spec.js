'use strict';

describe('Router', () => {
  const page = require('./main.po');

  beforeEach(() => {
    page.loadMockData();
    page.navigate().then(function() {
      console.log('NAVIGATED');
    });
  });

  it('should change the url when using the navbar', () => {
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
  });

});
