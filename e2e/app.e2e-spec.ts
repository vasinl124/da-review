import { DaReviewPage } from './app.po';

describe('da-review App', function() {
  let page: DaReviewPage;

  beforeEach(() => {
    page = new DaReviewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
