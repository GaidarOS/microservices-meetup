import { WikiPage } from './app.po';

describe('wiki App', () => {
  let page: WikiPage;

  beforeEach(() => {
    page = new WikiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
