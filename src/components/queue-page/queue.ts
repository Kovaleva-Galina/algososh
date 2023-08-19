interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
  public list: (T | null)[] = [];
  public head = 0;
  public tail = -1;
  private size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.reset(size);
  }

  reset(size: number) {
    this.size = size;
    this.list = new Array(size).fill(undefined);
    this.head = 0;
    this.tail = -1;
    this.length = 0;
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    } else {
      this.tail = (this.tail + 1) % this.size;
      this.list[this.tail] = item;
      this.length++;
    }
  };

  dequeue = () => {
    if (this.isEmpty) {
      throw new Error("No elements in the queue");
    } else {
      this.list[this.head] = null;
      this.length--;
      this.head = (this.head + 1) % this.size;
    }
  };

  peak = (): T | null => {
    if (this.isEmpty) {
      throw new Error("No elements in the queue");
    }
    if (this.list.length) {
      return this.list[this.head]
    } else {
      return null;
    }
  };

  get isEmpty() {
    return this.length === 0;
  }

  clear() {
    this.reset(this.size);
  }

  get isStartedState(): boolean {
    if (this.head === 0 && this.tail === -1 && this.length === 0) {
      return true;
    }
    return false;
  }
}