class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList<T> {
  head: ListNode<T> | null;
  tail: ListNode<T> | null;

  constructor(list: T[]) {
    this.head = null;
    this.tail = null;
    list.forEach((item) => {
      this.append(item)
    })
  }

  isEmpty(): boolean {
    return this.head === null;
  }

  append(value: T): void {
    const newNode = new ListNode(value);

    if (this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  prepend(value: T): void {
    const newNode = new ListNode(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  delete(index: number, cb?: (index: number) => void): void {
    if (index < 0 || this.head === null) {
      return;
    }

    if (index === 0) {
      this.head = this.head.next;
      if (this.head === null) {
        this.tail = null;
      }
      return;
    }

    let current = this.head;
    let currentIndex = 0;
    cb?.(currentIndex);
    while (current.next !== null && currentIndex < index - 1) {
      current = current.next;
      currentIndex++;
      cb?.(currentIndex);
    }

    if (current.next !== null) {
      current.next = current.next.next;
      if (current.next === null) {
        this.tail = current;
      }
      cb?.(++currentIndex);
    }
  }

  addAtIndex(index: number, value: T, cb?: (index: number) => void): void {
    if (index < 0) {
      return;
    }
    const newNode = new ListNode(value);

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
      if (this.tail === null) {
        this.tail = newNode;
      }
      return;
    }

    let current = this.head;
    let currentIndex = 0;
    cb?.(currentIndex);
    while (current !== null && currentIndex < index - 1) {
      current = current.next;
      currentIndex++;
      cb?.(currentIndex);
    }

    if (current !== null) {
      newNode.next = current.next;
      current.next = newNode;
      if (newNode.next === null) {
        this.tail = newNode;
      }
      cb?.(++currentIndex);
    }
  }

  list(): T[] {
    const arr: T[] = [];
    let current = this.head;
    if (current?.value) {
      arr.push(current.value);
    }
    while (current !== null) {
      current = current.next;
      if (current?.value) {
        arr.push(current.value);
      }
    }
    return arr;
  }
}
