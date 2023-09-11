import { reverseString } from "../../src/components/string/reverseString";

const PAGE = 'http://localhost:3000';

describe('Строка', () => {
  it('Кнопка недоступна при пустом поле ввода', () => {
    cy.visit(`${PAGE}/recursion`);
    cy.get('[data-testid="button"]').should('be.disabled');
    cy.get('input').clear();
    cy.get('[data-testid="button"]').should('be.disabled');
  });

  it('Проверка разворота строки', () => {
    const message = 'hello';
    cy.visit(`${PAGE}/recursion`);
    // Ввести значение в поле ввода
    cy.get('input').type(message);

    const updatedChars = [];

    reverseString(message, (updated) => updatedChars.push(updated))

    // Нажать на кнопку "Развернуть"
    cy.get('[data-testid="button"]').click();

    updatedChars.forEach(({ chars, left, right }) => {
      if (left < right) {
        cy.get('[data-testid="circle"]').eq(left).invoke('attr', 'class').should("contain", "circle_changing");
        cy.get('[data-testid="circle"]').eq(right).invoke('attr', 'class').should("contain", "circle_changing");
        cy.get('[data-testid="string-result"] .text_type_circle').each((item, index) => {
          cy.wrap(item).invoke('text').should('contain', chars[index]);
        })
        cy.get('[data-testid="circle"]').eq(left).invoke('attr', 'class').should("contain", "circle_modified");
        cy.get('[data-testid="circle"]').eq(right).invoke('attr', 'class').should("contain", "circle_modified");
      } else if (left === right) {
        cy.get('[data-testid="circle"]').eq(left).invoke('attr', 'class').should("contain", "circle_modified");
      }
    })
  });
})