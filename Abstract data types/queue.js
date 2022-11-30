class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  #length;
  constructor(initialValues = []) {
    this.#length = 0;
    this.head = null;

    for (const value of initialValues) {
      this.enqueue(value);
    }
  }

  get size() {
    return this.#length;
  }

  peekFirst() {
    return this.head?.value;
  }

  peekLast() {
    return this.tail?.value;
  }

  enqueue(data) {
    const node = new Node(data);

    if (this.head === null) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    return this;
  }

  dequeue() {
    if (this.head) {
      const value = this.head.value;
      this.head = this.head.next;

      if (this.head === null) {
        this.tail = null;
      }
      return value;
    }

    return null;
  }
}

module.exports = Queue;
