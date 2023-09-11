import renderer  from 'react-test-renderer';

import { Button } from './button';

it('Корректная отрисовка кнопки с текстом', () => {
    const container = renderer.create(<Button text="Рассчитать" />).toJSON();
    expect(container).toMatchSnapshot();
}); 

it('Корректная отрисовка кнопки без текста', () => {
    const container = renderer.create(<Button />).toJSON();
    expect(container).toMatchSnapshot();
}); 

it('Корректная отрисовка заблокированной кнопки', () => {
    const container = renderer.create(<Button disabled />).toJSON();
    expect(container).toMatchSnapshot();
}); 

it('Корректная отрисовка кнопки с индикацией загрузки', () => {
    const container = renderer.create(<Button  isLoader = 'false' />).toJSON();
    expect(container).toMatchSnapshot();
}); 