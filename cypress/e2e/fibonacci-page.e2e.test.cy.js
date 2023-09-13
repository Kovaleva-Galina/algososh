import { fibIterative } from "../../src/components/fibonacci-page/fibIterative";
const PAGE = 'http://localhost:3000';

describe('Фибоначчи', () => {
  it('Кнопка недоступна при пустом поле ввода', () => {
    cy.visit(`${PAGE}/fibonacci`);
    cy.get('[data-testid="button"]').should('be.disabled');
    cy.get('input').clear();
    cy.get('[data-testid="button"]').should('be.disabled');
  });
  it('должна правильно генерировать числа Фибоначчи', () => {

    // Функция для вычисления чисел Фибоначчи
    const values = 19;
    cy.visit(`${PAGE}/fibonacci`);

    // Ввести значение в поле ввода
    cy.get('input').type(values);
    const arr = fibIterative(values);

    // Нажать на кнопку "Рассчитать"
    cy.get('[data-testid="button"]').click();

    // Ждем, чтобы убедиться, что результаты загрузились
    cy.wait(10000);

    // Проверка чисел Фибоначчи
    cy.get('[data-testid="string-result"] .text_type_circle').each((item, index) => {
      cy.wrap(item).invoke('text').should('contain', arr[index]);
    })
  });
})