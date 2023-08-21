export const randomArr = (minLen: number = 3, maxLen: number = 17, max = 100, min = 0) => {
  const chars: number[] = [];
  const arrLength = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
  for (let i = 0; i < arrLength; i++) {
    chars.push(Math.floor(Math.random() * (max - min + 1)) + min)
  }
  return chars
}