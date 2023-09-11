import React from 'react'; 
import renderer  from 'react-test-renderer';
import { ElementStates } from '../../../types/element-states';

import { Circle } from './circle';

it('Корректная отрисовка элемента без буквы', () => {
    const container = renderer.create(<Circle />).toJSON();
    expect(container).toMatchSnapshot();
}); 

it('Корректная отрисовка элемента с буквами', () => {
    const container = renderer.create(<Circle letter='Буквы'/>).toJSON();
    expect(container).toMatchSnapshot();
}); 

it('Корректная отрисовка элемента с head', () => {
    const container = renderer.create(<Circle head='true'/>).toJSON();
    expect(container).toMatchSnapshot();
}); 

it('Корректная отрисовка элемента с react-элементом в head', () => {
    const container = renderer.create(<Circle head={React.ReactElement}/>).toJSON();
    expect(container).toMatchSnapshot();
}); 

it('Корректная отрисовка элемента с tail', () => {
    const container = renderer.create(<Circle tail='true'/>).toJSON();
    expect(container).toMatchSnapshot();
}); 

it('Корректная отрисовка элемента с react-элементом в tail', () => {
    const container = renderer.create(<Circle tail={React.ReactElement}/>).toJSON();
    expect(container).toMatchSnapshot();
}); 

it('Корректная отрисовка элемента с index', () => {
    const container = renderer.create(<Circle index='1'/>).toJSON();
    expect(container).toMatchSnapshot();
}); 

it('Корректная отрисовка элемента с пропом isSmall ===  true', () => {
    const container = renderer.create(<Circle isSmall = 'true'/>).toJSON();
    expect(container).toMatchSnapshot();
});

it('Корректная отрисовка элемента в состоянии default', () => {
    const container = renderer.create(<Circle state = {ElementStates.Default}/>).toJSON();
    expect(container).toMatchSnapshot();
});

it('Корректная отрисовка элемента в состоянии changing', () => {
    const container = renderer.create(<Circle state = {ElementStates.Changing}/>).toJSON();
    expect(container).toMatchSnapshot();
});

it('Корректная отрисовка элемента в состоянии modified', () => {
    const container = renderer.create(<Circle state = {ElementStates.Modified}/>).toJSON();
    expect(container).toMatchSnapshot();
});