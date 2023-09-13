import { reverseString } from './reverseString';

describe('reverseString', () => {
    it('Корректно разворачивает строку с чётным количеством символов', () => {
        expect(reverseString('values')).toEqual(['s', 'e', 'u', 'l', 'a', 'v']);
    });

    it('Корректно разворачивает строку с нечетным количеством символов', () => {
        expect(reverseString('message')).toEqual(['e', 'g', 'a', 's', 's', 'e', 'm']);
    });

    it('Корректно разворачивает строку с одним символом', () => {
        expect(reverseString('a')).toEqual(['a']);
    });

    it('Корректно разворачивает пустую строку', () => {
        expect(reverseString('')).toEqual([]);
    });
});