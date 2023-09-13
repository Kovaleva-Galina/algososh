const PAGE = 'http://localhost:3000';

describe('Связный список', () => {
  it('Кнопка недоступна при пустом поле ввода значения', () => {
    cy.visit(`${PAGE}/list`);
    cy.get('[data-testid="button-add-in-head"]').as('addInHeadButton');
    cy.get('[data-testid="button-add-in-tail"]').as('addInTailButton');
    cy.get('@addInHeadButton').should('be.disabled');
    cy.get('@addInTailButton').should('be.disabled');

    cy.get('[data-testid="input-value"]').clear();
    cy.get('@addInHeadButton').should('be.disabled');
    cy.get('@addInTailButton').should('be.disabled');
  });

  it('Кнопка недоступна при пустом поле ввода индекса', () => {
    cy.visit(`${PAGE}/list`);
    cy.get('[data-testid="button-add-by-index"]').as('addByIndexButton');
    cy.get('[data-testid="button-delete-by-index"]').as('deleteByIndexButton');
    cy.get('@addByIndexButton').should('be.disabled');
    cy.get('@deleteByIndexButton').should('be.disabled');

    cy.get('[data-testid="input-index"]').clear();
    cy.get('@addByIndexButton').should('be.disabled');
    cy.get('@deleteByIndexButton').should('be.disabled');
  });

  it('Проверка отрисовки дефолтного списка', () => {
    cy.visit(`${PAGE}/list`);

    let list = {
      chars: [1, 3, 5, 8],
      head: 0,
      tail: 3
    };

    cy.get('[data-testid="string-result"] .text_type_circle').each((item, index) => {
      cy.wrap(item).invoke('text').should('contain', list.chars[index]);
    })

    cy.get('[data-testid="circle-content"]').eq(list.head).find('div:first').invoke('attr', 'class').should("contain", "circle_head");
    cy.get('[data-testid="circle-content"]').eq(list.tail).find('div:last').invoke('attr', 'class').should("contain", "circle_tail");

  });

  it('Добавления элемента в head', () => {
    cy.visit(`${PAGE}/list`);

    //Кнопки добавления

    cy.get('[data-testid="button-add-in-head"]').as('addInHeadButton');
    cy.get('[data-testid="button-add-in-tail"]').as('addInTailButton');
    cy.get('[data-testid="button-add-by-index"]').as('addByIndexButton');

    //Кнопки удаления

    cy.get('[data-testid="button-delete-from-head"]').as('deleteFromHeadButton');
    cy.get('[data-testid="button-delete-from-tail"]').as('deleteFromTailButton');
    cy.get('[data-testid="button-delete-by-index"]').as('deleteByIndexButton');

    //Инпуты

    cy.get('[data-testid="input-value"]').as('valueInput');
    cy.get('[data-testid="input-index"]').as('indexInput');

    let list = {
      chars: [1, 3, 5, 8],
      head: 0,
      tail: 3
    };

    const value = 11;

    // Проверка кнопки добавления в head
    // Ввести значение в поле ввода
    cy.get('@valueInput').type(value);

    // Нажать на кнопку "Добавить"
    cy.get('@addInHeadButton').click();

    cy.get('[data-testid="circle-added"] .text_type_circle').should("contain", value);
    cy.get('[data-testid="circle"]').eq(list.head).invoke('attr', 'class').should("contain", "circle_changing").should("contain", "circle_small");


    list = { ...list, chars: [value, ...list.chars], tail: list.tail + 1 }

    cy.wait(750)
    //Проверка, что добавляемый элемент подсвечивается зеленым
    cy.get('[data-testid="circle"]').eq(list.head).invoke('attr', 'class').should("contain", "circle_modified").should("not.contain", "circle_small");


    //Проверяем весь массив элементов
    cy.wait(1500)
    cy.get('[data-testid="string-result"] .text_type_circle').each((item, index) => {
      cy.wrap(item).invoke('text').should('contain', list.chars[index]);
    })
  });
  it('Добавления элемента в tail', () => {
    cy.visit(`${PAGE}/list`);

    //Кнопки добавления

    cy.get('[data-testid="button-add-in-tail"]').as('addInTailButton');

    //Инпуты

    cy.get('[data-testid="input-value"]').as('valueInput');

    let list = {
      chars: [1, 3, 5, 8],
      head: 0,
      tail: 3
    };

    const value = 11;

    // Проверка кнопки добавления в tail
    // Ввести значение в поле ввода
    cy.get('@valueInput').type(value);

    // Нажать на кнопку "Добавить"
    cy.get('@addInTailButton').click();

    cy.get('[data-testid="circle-added"] .text_type_circle').should("contain", value);
    cy.get('[data-testid="circle"]').eq(list.tail).invoke('attr', 'class').should("contain", "circle_changing").should("contain", "circle_small");


    list = { ...list, chars: [...list.chars, value], tail: list.tail + 1 }

    cy.wait(750)
    //Проверка, что добавляемый элемент подсвечивается зеленым
    cy.get('[data-testid="circle"]').eq(list.tail).invoke('attr', 'class').should("contain", "circle_modified").should("not.contain", "circle_small");
    //Проверяем весь массив элементов
    cy.wait(1500)
    cy.get('[data-testid="string-result"] .text_type_circle').each((item, index) => {
      cy.wrap(item).invoke('text').should('contain', list.chars[index]);
    })
  });
  it('Добавления элемента по индексу', () => {
    cy.visit(`${PAGE}/list`);

    //Кнопки добавления
    cy.get('[data-testid="button-add-by-index"]').as('addByIndexButton');

    //Инпуты

    cy.get('[data-testid="input-value"]').as('valueInput');
    cy.get('[data-testid="input-index"]').as('indexInput');

    let list = {
      chars: [1, 3, 5, 8],
      head: 0,
      tail: 3
    };

    const value = 11;
    const index = 2;

    // Проверка кнопки добавления в index
    // Ввести значение в поле ввода
    cy.get('@valueInput').type(value);
    cy.get('@indexInput').type(index);

    // Нажать на кнопку "Добавить"
    cy.get('@addByIndexButton').click();

    cy.get('[data-testid="circle-added"] .text_type_circle').should("contain", value);
    cy.get('[data-testid="circle"]').eq(0).invoke('attr', 'class').should("contain", "circle_changing").should("not.contain", "circle_small");

    cy.get('[data-testid="circle-added"] .text_type_circle').should("contain", value);
    cy.get('[data-testid="circle"]').eq(1).invoke('attr', 'class').should("contain", "circle_changing").should("not.contain", "circle_small");

    cy.get('[data-testid="circle-added"] .text_type_circle').should("contain", value);
    cy.get('[data-testid="circle"]').eq(index).invoke('attr', 'class').should("contain", "circle_changing").should("contain", "circle_small");


    list = { ...list, chars: [...list.chars.slice(list.head, index), value, ...list.chars.slice(index, list.tail + 1)], tail: list.tail + 1 }

    cy.wait(750)
    //Проверка, что добавляемый элемент подсвечивается зеленым
    cy.get('[data-testid="circle"]').eq(index).invoke('attr', 'class').should("contain", "circle_modified").should("not.contain", "circle_small");


    //Проверяем весь массив элементов
    cy.wait(1500)
    cy.get('[data-testid="string-result"] .text_type_circle').each((item, index) => {
      cy.wrap(item).invoke('text').should('contain', list.chars[index]);
    })
  });
  it('Удаление элемента из head', () => {
    cy.visit(`${PAGE}/list`);

    //Кнопки удаления

    cy.get('[data-testid="button-delete-from-head"]').as('deleteFromHeadButton');

    let list = {
      chars: [1, 3, 5, 8],
      head: 0,
      tail: 3
    };

    // Нажать на кнопку "Удалить"
    cy.get('@deleteFromHeadButton').click();

    cy.get('[data-testid="circle-removed"] .text_type_circle').should("contain", list.chars[list.head]);
    cy.get('[data-testid="circle-removed"] [data-testid="circle"]').eq(list.head).invoke('attr', 'class').should("contain", "circle_changing").should("contain", "circle_small");


    list = { ...list, chars: [...list.chars.slice(list.head + 1, list.tail + 1)], tail: list.tail - 1 }

    cy.wait(750)
    //Проверка, что теперь удаляемый элемент head подсвечивается зеленым
    cy.get('[data-testid="circle"]').eq(list.head).invoke('attr', 'class').should("contain", "circle_modified").should("not.contain", "circle_small");


    //Проверяем весь массив элементов
    cy.wait(1500)
    cy.get('[data-testid="string-result"] .text_type_circle').each((item, index) => {
      cy.wrap(item).invoke('text').should('contain', list.chars[index]);
    })
  });
  it('Удаление элемента из tail', () => {
    cy.visit(`${PAGE}/list`);

    //Кнопки удаления

    cy.get('[data-testid="button-delete-from-tail"]').as('deleteFromTailButton');

    let list = {
      chars: [1, 3, 5, 8],
      head: 0,
      tail: 3
    };

    // Нажать на кнопку "Удалить"
    cy.get('@deleteFromTailButton').click();

    cy.get('[data-testid="circle-removed"] .text_type_circle').should("contain", list.chars[list.tail]);
    cy.get('[data-testid="circle-removed"] [data-testid="circle"]').invoke('attr', 'class').should("contain", "circle_changing").should("contain", "circle_small");


    list = { ...list, chars: [...list.chars.slice(list.head, list.tail)], tail: list.tail - 1 }

    //Проверка, что теперь удаляемый элемент tail подсвечивается зеленым
    cy.get('[data-testid="circle"]').eq(list.tail + 1).invoke('attr', 'class').should("contain", "circle_modified").should("not.contain", "circle_small");


    //Проверяем весь массив элементов
    cy.wait(1500)
    cy.get('[data-testid="string-result"] .text_type_circle').each((item, index) => {
      cy.wrap(item).invoke('text').should('contain', list.chars[index]);
    })
  });
  it('Удаление элемента по индексу', () => {
    cy.visit(`${PAGE}/list`);

    //Кнопки удаления

    cy.get('[data-testid="button-delete-by-index"]').as('deleteByIndexButton');

    //Инпуты

    cy.get('[data-testid="input-index"]').as('indexInput');

    let list = {
      chars: [1, 3, 5, 8],
      head: 0,
      tail: 3
    };

    const index = 2;

    cy.get('@indexInput').type(index);

    // Нажать на кнопку "Удалить"
    cy.get('@deleteByIndexButton').click();

    cy.get('[data-testid="circle-removed"] .text_type_circle').should("contain", list.chars[0]);
    cy.get('[data-testid="circle"]').eq(0).invoke('attr', 'class').should("contain", "circle_changing").should("not.contain", "circle_small");

    cy.get('[data-testid="circle-removed"] .text_type_circle').should("contain", list.chars[1]);
    cy.get('[data-testid="circle"]').eq(1).invoke('attr', 'class').should("contain", "circle_changing").should("not.contain", "circle_small");

    cy.get('[data-testid="circle-removed"] .text_type_circle').should("contain", list.chars[index]);
    cy.get('[data-testid="circle-removed"] [data-testid="circle"]').invoke('attr', 'class').should("contain", "circle_changing").should("contain", "circle_small");


    list = { ...list, chars: [...list.chars.slice(list.head, index), ...list.chars.slice(index + 1, list.tail + 1)], tail: list.tail - 1 };

    //Проверка, что теперь удаляемый элемент с индексом подсвечивается зеленым
    cy.get('[data-testid="circle"]').eq(index).invoke('attr', 'class').should("contain", "circle_modified").should("not.contain", "circle_small");


    //Проверяем весь массив элементов
    cy.wait(1500)
    cy.get('[data-testid="string-result"] .text_type_circle').each((item, num) => {
      cy.wrap(item).invoke('text').should('contain', list.chars[num]);
    })
  });

})