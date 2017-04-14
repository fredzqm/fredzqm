import { FredzqmPage } from './app.po';

describe('fredzqm App', () => {
  let page: FredzqmPage;

  beforeEach(() => {
    page = new FredzqmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
