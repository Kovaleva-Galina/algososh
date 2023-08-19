import { Updated } from "./string";

export function reverseString(str: string, onChange?: (updated: Updated) => void): string[] {
  const chars = str.split('');
  let left = 0;
  let right = chars.length - 1;
  onChange?.({ chars: [...chars], left, right });
  while (left < right) {

    const temp = chars[left];
    chars[left] = chars[right];
    chars[right] = temp;

    left++;
    right--;
    onChange?.({ chars: [...chars], left, right });
  }
  return chars;
}
