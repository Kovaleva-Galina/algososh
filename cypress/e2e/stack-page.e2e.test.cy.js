const PAGE = 'http://localhost:3000';

describe('Стэк', () => {
  it('Кнопка недоступна при пустом поле ввода', () => {
    cy.visit(`${PAGE}/stack`);
    cy.get('[data-testid="button-add"]').should('be.disabled');
    cy.get('input').clear();
    cy.get('[data-testid="button-add"]').should('be.disabled');
  });

  it('Проверка добавления/удаления элементов в стек, очистка стека', () => {
    cy.visit(`${PAGE}/stack`);
    cy.get('[data-testid="button-add"]').as('addButton');
    cy.get('[data-testid="button-delete"]').as('deleteButton');
    cy.get('[data-testid="button-clear"]').as('clearButton');
    let message = '123';

    // Первая проверка кнопки добавления
    // Ввести значение в поле ввода
    cy.get('input').type(message);

    let list = [];

    // Нажать на кнопку "Добавить"
    cy.get('@addButton').click();
    list.push(message);
    cy.get('[data-testid="circle"]').eq(list.length - 1).invoke('attr', 'class').should("contain", "circle_changing");
    cy.get('[data-testid="string-result"] .text_type_circle').should('have.length', 1);
    cy.get('[data-testid="string-result"] .text_type_circle').last().invoke('text').should('contain', message);
    cy.wait(1100);
    // Вторая проверка кнопки добавления
    message = '345';
    cy.get('input').type(message);

    // Нажать на кнопку "Добавить"
    cy.get('@addButton').click();
    list.push(message);
    cy.get('[data-testid="circle"]').eq(list.length - 1).invoke('attr', 'class').should("contain", "circle_changing");
    cy.get('[data-testid="string-result"] .text_type_circle').should('have.length', 2);
    cy.get('[data-testid="string-result"] .text_type_circle').last().invoke('text').should('contain', message);
    cy.wait(1100);

    // Третья проверка кнопки добавления
    message = '567';
    cy.get('input').type(message);

    // Нажать на кнопку "Добавить"
    cy.get('@addButton').click();
    list.push(message);
    cy.get('[data-testid="circle"]').eq(list.length - 1).invoke('attr', 'class').should("contain", "circle_changing");
    cy.get('[data-testid="string-result"] .text_type_circle').should('have.length', 3);
    cy.get('[data-testid="string-result"] .text_type_circle').last().invoke('text').should('contain', message);
    cy.wait(1100);

    // Четвертая проверка кнопки добавления
    message = '789';
    cy.get('input').type(message);

    // Нажать на кнопку "Добавить"
    cy.get('@addButton').click();
    list.push(message);
    cy.get('[data-testid="circle"]').eq(list.length - 1).invoke('attr', 'class').should("contain", "circle_changing");
    cy.get('[data-testid="string-result"] .text_type_circle').should('have.length', 4);
    cy.get('[data-testid="string-result"] .text_type_circle').last().invoke('text').should('contain', message);
    cy.wait(1100);

    // Нажать на кнопку "Удалить"
    cy.get('@deleteButton').click();
    list.pop();
    cy.get('[data-testid="circle"]').eq(list.length).invoke('attr', 'class').should("contain", "circle_changing");
    cy.get('[data-testid="string-result"] .text_type_circle').should('have.length', 3);
    cy.get('[data-testid="string-result"] .text_type_circle').last().invoke('text').should('not.contain', message);
    cy.wait(1100);

    // Нажать на кнопку "Очистить"
    cy.get('@clearButton').click();
    list = [];
    cy.get('[data-testid="string-result"] .text_type_circle').should('have.length', 0);
  });
})