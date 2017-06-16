import { HumptydumptyPage } from './app.po';

describe('humptydumpty App', () => {
  let page: HumptydumptyPage;

  beforeEach(() => {
    page = new HumptydumptyPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
