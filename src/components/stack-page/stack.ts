interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
}

export class Stack<T> implements IStack<T> {
  public list: T[] = [];

  push = (item: T): void => {
    this.list.push(item)
  };

  pop = (): void => {
    this.list.pop()
  };

  peak = (): T | null => {
    if (this.list.length) {
      return this.list[this.list.length - 1]
    } else {
      return null;
    }
  };

  getSize = () => this.list.length;

  clear() {
    this.list = [];
  }
}