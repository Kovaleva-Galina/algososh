const PAGE = 'http://localhost:3000';


describe('service is available', function() {
  it('should be available on localhost:3000', function() {
    cy.visit(PAGE);
  });
}); 

describe('6 страниц с визуализацией алгоритмов доступны пользователю', function() {
  it('Должен перейти на 6 страниц с алгоритмами', () => {
    cy.visit(PAGE);
    const urls = ['recursion', 'fibonacci', 'sorting', 'stack', 'queue', 'list'];
    urls.forEach((_, index) => {
      cy.get('[data-testid="links"] > a').eq(index).click();
      cy.url().should('eq', `${PAGE}/${urls[index]}`);
      cy.go('back');
    })
  }); 
});
    