class Node {
  constructor(value) {
    this.value = value
    this.next = null
    this.prev = null
  }
}

class DoublyLinkedList {
  #length

  constructor() {
    this.#length = 0
    this.head = null
    this.tail = null
  }

  get size() {
    return this.#length
  }

  push(value) {
    this.#length++
    const node = new Node(value)

    if (this.head) {
      this.tail.next = node
      node.prev = this.tail
      this.tail = node

      return this
    }

    this.head = this.tail = node

    return this
  }
  
  pop() {
    if (this.tail) {
      this.#length--
      const value = this.tail.value
      const lstNode = this.tail.prev
      
      if (!lstNode) {
        this.clear()
      } else {
        this.tail.prev.next = null
        this.tail = lstNode
      }

      return value
    }

    return null
  }
  
  unshift(value) {
    this.#length++
    const node = new Node(value)

    if (this.head) {
      this.head.prev = node
      node.next = this.head

      this.head = node
      return this
    }

    this.head = this.tail = node

    return this
  }

  shift() { 
    if (this.head) {
      this.#length--
      
      const value = this.head.value
      this.head = this.head.next

      if (this.head) {
        this.head.prev = null
      } else {
        this.clear()
      }

      return value
    }

    return null
  }

  clear() {
    this.head = this.tail = null
    this.#length = 0

    return this
  }
}

const dll = new DoublyLinkedList()

dll.push(1).push(2).push(3)

console.log(dll.unshift(dll.pop()))
console.log(dll.unshift(dll.pop()))
console.log(dll.unshift(dll.pop()))

console.log(dll.shift())
console.log(dll.shift())
console.log(dll.shift())
