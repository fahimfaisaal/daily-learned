class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}


class SinglyLinkedList {
  #length
  constructor() {
    this.#length = 0
    this.head = null
    this.tail = null
  }

  get size() {
    return this.#length
  }

 /**
  * @complexity O(1)
 */
  push(value) {
    const node = new Node(value)
    this.#length++

    if (this.tail === null) {
      this.head = this.tail = node
      return this
    }

    this.tail.next = node
    this.tail = node
    return this
  }

  /**
  * @complexity O(1)
  */
  shift() {
    if (this.head) {
      this.#length--
      const value = this.head.value
      this.head = this.head.next

      return value
    }

    return null
  }

  /**
  * @complexity O(1)
  */
  unshift(value) {
    const node = new Node(value)
    this.#length++

    if (this.head === null) {
      this.head = this.tail = node

      return this
    }

    node.next = this.head

    this.head = node
    return this
  }

  /**
   * @complexity O(n)
   */
  pop() {
    if (this.tail) {
      this.#length--
      if (this.head === this.tail) {
        const value = this.head.value

        this.clear()
        return value
      }

      let t1 = this.head
      let t2 = this.head.next

      while (t2 = t2.next) {
        t1 = t1.next
      }

      const lastValue = t1.next.value
      t1.next = null
      this.tail = t1

      return lastValue
    }

    return null
  }

  addAt(index, value) {
    if (index > this.#length) {
      throw new Error(`Illegal index ${index}`)
    }

    this.#length++

    if (index === this.#length - 1) {
      return this.push(value)
    }

    if (index === 0) {
      return this.unshift(value)
    }

    let t1 = this.head
    let t2 = this.head.next

    for (let i = 1; i < index; i++) {
      t1 = t1.next
      t2 = t2.next
    }

    const node = new Node(value)
    t1.next = node
    node.next = t2
  }

 /**
 * @complexity O(1)
 */
  clear() {
    this.head = this.tail = null
    this.#length = 0
  }

  toString() {
    return JSON.stringify(this, null, 2)
  }
}

const ll = new SinglyLinkedList()

ll.push(1).push(3).push(4).unshift(0)
console.log(ll.size)
ll.addAt(2, 2)
console.log(ll.toString())
console.log(ll.shift())
console.log(ll.pop())
console.log(ll.pop())

console.log(ll, ll.size)