const PAGE = 'http://localhost:3000';

describe('Очередь', () => {
  it('Кнопка недоступна при пустом поле ввода', () => {
    cy.visit(`${PAGE}/queue`);
    cy.get('[data-testid="button-add"]').should('be.disabled');
    cy.get('input').clear();
    cy.get('[data-testid="button-add"]').should('be.disabled');
  });
  it('Проверка добавления/удаления элементов в стек, очистка стека', () => {
    cy.visit(`${PAGE}/queue`);
    cy.get('[data-testid="button-add"]').as('addButton');
    cy.get('[data-testid="button-delete"]').as('deleteButton');
    cy.get('[data-testid="button-clear"]').as('clearButton');
    let message = '123';

    // Первая проверка кнопки добавления
    // Ввести значение в поле ввода
    cy.get('input').type(message);

    let list = {
      chars: [],
      head: 0,
      tail: 0
    };

    // Нажать на кнопку "Добавить"
    cy.get('@addButton').click();
    list.chars.push(message);
    cy.get('[data-testid="circle"]').eq(list.chars.length - 1).invoke('attr', 'class').should("contain", "circle_changing");

    cy.get('[data-testid="queue-result"] .text_type_circle').eq(list.tail).invoke('text').should('contain', message);
    cy.get('[data-testid="circle-content"]').eq(list.head).find('div:first').invoke('attr', 'class').should("contain", "circle_head");
    cy.get('[data-testid="circle-content"]').eq(list.tail).find('div:last').invoke('attr', 'class').should("contain", "circle_tail");
    cy.wait(1000);

    // Вторая проверка кнопки добавления
    message = '345';
    cy.get('input').type(message);

    // Нажать на кнопку "Добавить"
    cy.get('@addButton').click();

    list = { ...list, chars: [...list.chars, message], tail: list.tail + 1 };
    cy.get('[data-testid="circle"]').eq(list.chars.length - 1).invoke('attr', 'class').should("contain", "circle_changing");
    cy.wait(1100);
    cy.get('[data-testid="queue-result"] .text_type_circle').eq(list.tail).invoke('text').should('contain', message);
    cy.get('[data-testid="circle-content"]').eq(list.head).find('div:first').invoke('attr', 'class').should("contain", "circle_head");
    cy.get('[data-testid="circle-content"]').eq(list.tail).find('div:last').invoke('attr', 'class').should("contain", "circle_tail");

    // Третья проверка кнопки добавления
    message = '567';
    cy.get('input').type(message);

    // Нажать на кнопку "Добавить"
    cy.get('@addButton').click();

    list = { ...list, chars: [...list.chars, message], tail: list.tail + 1 };
    cy.get('[data-testid="circle"]').eq(list.chars.length - 1).invoke('attr', 'class').should("contain", "circle_changing");
    cy.wait(1100);
    cy.get('[data-testid="queue-result"] .text_type_circle').eq(list.tail).invoke('text').should('contain', message);

    cy.get('[data-testid="circle-content"]').eq(list.head).find('div:first').invoke('attr', 'class').should("contain", "circle_head");
    cy.get('[data-testid="circle-content"]').eq(list.tail).find('div:last').invoke('attr', 'class').should("contain", "circle_tail");


    //Четвертая проверка кнопки добавления
    message = '789';
    cy.get('input').type(message);

    // Нажать на кнопку "Добавить"
    cy.get('@addButton').click();

    list = { ...list, chars: [...list.chars, message], tail: list.tail + 1 }
    cy.get('[data-testid="circle"]').eq(list.chars.length - 1).invoke('attr', 'class').should("contain", "circle_changing");
    cy.wait(1100);
    cy.get('[data-testid="queue-result"] .text_type_circle').eq(list.tail).invoke('text').should('contain', message);

    cy.get('[data-testid="circle-content"]').eq(list.head).find('div:first').invoke('attr', 'class').should("contain", "circle_head");
    cy.get('[data-testid="circle-content"]').eq(list.tail).find('div:last').invoke('attr', 'class').should("contain", "circle_tail");


    // Нажать на кнопку "Удалить"
    cy.get('@deleteButton').click();
    list = { ...list, chars: [list.chars.slice(list.head + 1, list.tail + 1)], head: list.head + 1 };
    cy.get('[data-testid="circle"]').eq(list.chars.length - 1).invoke('attr', 'class').should("contain", "circle_changing");
    cy.wait(1100);
    cy.get('[data-testid="circle-content"]').eq(list.head).find('div:first').invoke('attr', 'class').should("contain", "circle_head");
    cy.get('[data-testid="circle-content"]').eq(list.tail).find('div:last').invoke('attr', 'class').should("contain", "circle_tail");

    // Нажать на кнопку "Очистить"
    cy.get('@clearButton').click();
    list = { chars: [], head: 0, tail: 0 };
    cy.get('[data-testid="string-result"] .text_type_circle').should('have.length', 0);
  });

})