interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | null;
  }
  
  export class Queue<T> implements IQueue<T> {
    public list: (T | null)[] = [];
    public head = 0;
    public tail = 0;
    private size: number = 0;
    private length: number = 0;
  
    constructor(size: number) {
      this.reset(size);
    }

    reset(size: number) {
      this.size = size;
      this.list = new Array(size).fill(undefined);
      this.head = 0;
      this.tail = 0;
      this.length = 0;
    }
  
    enqueue = (item: T) => {
      if (this.length >= this.size) {
        throw new Error("Maximum length exceeded");
      } else {
        this.list[this.tail] = item;
        this.length++;
        this.tail = (this.tail + 1) % this.size;
      }
    };
  
    dequeue = () => {
      if (this.isEmpty()) {
        throw new Error("No elements in the queue");
      }  else {
        this.list[this.head] = null;
        this.length--;
        this.head = (this.head + 1) % this.size;
      }
    };
  
    peak = (): T | null => {
      if (this.isEmpty()) {
        throw new Error("No elements in the queue");
      }
      if (this.list.length) {
        return this.list[this.head] 
      } else {
        return null;
      }
    };
  
    isEmpty = () => this.length === 0;

    clear() {
      this.reset(this.size);
    }
  }