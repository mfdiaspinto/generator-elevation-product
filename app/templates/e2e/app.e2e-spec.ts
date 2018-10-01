import { JasminPage } from './app.po';

describe('<%= product %> App', () => {
  let page: JasminPage;

  beforeEach(() => {
    page = new JasminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
