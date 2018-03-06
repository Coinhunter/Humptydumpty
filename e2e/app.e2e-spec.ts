import { PlatsbankenPage } from './app.po';

describe('Platsbanken App', () => {
  let page: PlatsbankenPage;

  beforeEach(() => {
    page = new PlatsbankenPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
