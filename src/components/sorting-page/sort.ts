import { Updated } from "./sorting-page";

const swap = (chars: number[], firstIndex: number, secondIndex: number): void => {
  const temp = chars[firstIndex];
  chars[firstIndex] = chars[secondIndex];
  chars[secondIndex] = temp;
};

export const selectionSort = (chars: number[], isUp = true, onChange?: (updated: Updated) => void) => {
  const { length } = chars;
  const modified: number[] = [];
  for (let i = 0; i < length; i++) {
    for (let j = i; j < length; j++) {
      if (isUp ? chars[i] > chars[j] : chars[i] < chars[j]) {
        swap(chars, j, i);
        onChange?.({ chars: [...chars], changing: [i, j], modified: [...modified] });
      }
    }
    modified.push(i);
  }
  modified.push(length - 1);
  onChange?.({ chars: [...chars], changing: [], modified: [...modified] });
  return chars;
};

export const bubbleSort = (chars: number[], isUp = true, onChange?: (updated: Updated) => void) => {
  const { length } = chars;
  const modified: number[] = [];
  let modifiedIndex = length - 1;
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < chars.length - 1 - i; j++) {
      onChange?.({ chars: [...chars], changing: [j, j + 1], modified: [...modified] });
      if (isUp ? chars[j] > chars[j + 1] : chars[j + 1] > chars[j]) { // сортируем элементы по возрастанию
        swap(chars, j, j + 1);
      }
    }
    modified.push(modifiedIndex);
    modifiedIndex -= 1;
  }
  modified.push(modifiedIndex);
  onChange?.({ chars: [...chars], changing: [], modified: [...modified] });
}