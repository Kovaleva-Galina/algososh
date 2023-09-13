import { selectionSort, bubbleSort } from "./sort";

describe('sort', () => {
    it('Корректно сортирует выбором пустой массив', () => {
        expect(selectionSort([])).toEqual([]);
    });

    it('Корректно сортирует выбором массив из одного элемента', () => {
        expect(selectionSort([1])).toEqual([1]);
    });

    it('Корректно сортирует выбором массив из нескольких элементов', () => {
        expect(selectionSort([1, 5, 6, 2])).toEqual([1, 2, 5, 6]);
    });

    it('Корректно сортирует пузырьком пустой массив', () => {
        expect(bubbleSort([])).toEqual([]);
    });

    it('Корректно сортирует пузырьком массив из одного элемента', () => {
        expect(bubbleSort([1])).toEqual([1]);
    });

    it('Корректно сортирует пузырьком массив из нескольких элементов', () => {
        expect(bubbleSort([1, 5, 6, 2])).toEqual([1, 2, 5, 6]);
    });
});