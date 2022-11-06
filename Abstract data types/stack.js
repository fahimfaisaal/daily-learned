class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class Stack {
  #length;
  constructor(initialValues = []) {
    this.#length = 0
    this.head = null

    for (const value of initialValues) {
      this.push(value)
    }
  }

  get size() {
    return this.#length
  }

  top() {
    return this.head.value
  }

  push(value) {
    this.#length++
    const node = new Node(value)
    node.next = this.head
    this.head = node

    return this
  }

  pop() {
    if (this.#length) {
      this.#length--

      const node = this.head
      this.head = this.head.next

      return node.value
    }

    return null
  }
}

module.exports = Stack