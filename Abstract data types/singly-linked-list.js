class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class SinglyLinkedList {
  #length
  constructor(initValues) {
    this.#length = 0
    this.head = null
    this.tail = null

    initValues.forEach(value => this.addLast(value))

    return Object.seal(this)
  }

  get size() {
    return this.#length
  }

  isEmpty() {
    return this.#length === 0
  }

 /**
  * @complexity O(1)
 */
  addLast(value) {
    const node = new Node(value)
    this.#length++

    if (this.tail === null) {
      this.head = this.tail = node
    } else {
      this.tail.next = node
      this.tail = node
    }

    return this
  }

  /**
  * @complexity O(1)
  */
  removeFirst() {
    if (this.head) {
      this.#length--
      const value = this.head.value
      this.head = this.head.next

      if (!this.head) {
        this.tail = null
      }

      return value
    }

    return null
  }

  /**
  * @complexity O(1)
  */
  addFirst(value) {
    const node = new Node(value)
    this.#length++

    if (this.isEmpty()) {
      this.head = this.tail = node
    } else {
      node.next = this.head

      this.head = node
    }
    return this
  }

  /**
   * @complexity O(n)
   */
  removeLast() {
    if (this.tail) {
      this.#length--

      if (this.head === this.tail) {
        const value = this.head.value

        this.clear()
        return value
      }

      let t1 = this.head
      let t2 = this.head?.next

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

  /**
* @complexity O(n)
*/
  includes(value) {
    let node = this.head

    while (node) {
      if (node.value === value) {
        return true
      }
      
      node = node.next
    }

    return false
  }

  /**
* @complexity O(n)
*/
  indexOf(value) {
    let i = 0
    let node = this.head

    while (node) {
      if (node.value === value) {
        return i
      }

      i++
      node = node.next
    }

    return -1
  }

  /**
* @complexity O(n)
*/
  addAt(index, value) {
    if (index < 0 || index > this.#length) {
      throw new RangeError(`Out of Range index ${index}`)
    }

    this.#length++

    if (index === this.#length - 1) {
      return this.addLast(value)
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

    return this
  }

  /**
* @complexity O(n)
*/
  removeAt(index) {
    if (index < 0 || index >= this.#length) {
      throw new RangeError(`Out of Range index ${index}`)
    }

    this.#length--

    if (index === 0) {
      return this.shift()
    }

    if (index === this.#length) {
      return this.pop()
    }

    let t1 = this.head
    let t2 = this.head.next

    for (let i = 1; i < index; i++) {
      t1 = t1.next
      t2 = t2.next
    }

    t1.next = t2.next

    return t2.value
  }

  at(index) {
    if (index < 0 || index >= this.#length) {
      throw new RangeError(`Out of Range index ${index}`)
    }

    let i = 0;
    let node = this.head

    while (node) {
      if (index === i++) {
        break
      }

      node = node.next
    }

    return {
      node,
      value: node.value
    }
  }

  /**
* @complexity O(n)
*/
  reverse() {
    const reverseLL = new SinglyLinkedList()

    while (this.head) {
      reverseLL.addFirst(this.removeFirst())
    }

    while (reverseLL.head) {
      this.addLast(reverseLL.removeFirst())
    }

    return this
  }

  /**
* @complexity O(n)
*/
  forEach(cb) {
    let i = 0;
    let head = this.head

    while (head) {
      cb(head.value, i++, this)
      head = head.next
    }
  }

  /**
  * @complexity O(n)
  */
  map(cb) {
    const mapLinkedList = new SinglyLinkedList()

    this.forEach((value, index) => {
      mapLinkedList.addLast(cb(value, index, this))
    })

    return mapLinkedList
  }

  /**
* @complexity O(n)
*/
  filter(cb) {
    const filteredList = new SinglyLinkedList()

    this.forEach((value, index) => {
      if (cb(value, index, this)) {
        filteredList.addLast(value)
      }
    })

    return filteredList
  }

  /**
* @complexity O(n)
*/
  reduce(reducer, initialAcc) {
    let node = this.head
    let index = 0

    if ([undefined, null, NaN].includes(initialAcc)) {
      index = 1
      initialAcc = node?.value
      node = node?.next
    }

    while (node) {
      initialAcc = reducer(initialAcc, node.value, index, this)
      node = node.next
    }

    return initialAcc
  }

  mid() {
    const mid = this.#length >> 1
    return this.at(mid)
  }

  /**
* @complexity O(n)
*/
  values() {
    let node = this.head

    const generator = function* () {
      while (node) {
        yield node.value

        node = node.next
      }
    }

    return generator()
  }

 /**
 * @complexity O(1)
 */
  clear() {
    this.head = this.tail = null
    this.#length = 0

    return this
  }

  toString(indent = 2) {
    return JSON.stringify(this, null, indent)
  }

  log() {
    console.log(this.toString())
  }
}

const ll = new SinglyLinkedList(new Set([1, 2, 3, 4]))

console.log(ll)


modules.exports = SinglyLinkedList