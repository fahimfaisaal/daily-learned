class Heap {
  #heap
  #map

  constructor(initialValues = []) {
    this.#heap = []
    this.#map = new Map()

    for (const value of initialValues) {
      this.insert(value)
    }
  }

  get length() {
    return this.#heap.length
  }

  parent(childIndex) {
    return Math.floor((childIndex - 1) / 2)
  }

  left(parentIndex) {
    return 2 * parentIndex + 1
  }

  right(parentIndex) {
    return 2 * parentIndex + 2
  }

  #swap(firstIndex, secondIndex) {
    [this.#heap[firstIndex], this.#heap[secondIndex]] = [this.#heap[secondIndex], this.#heap[firstIndex]]
  }

  #insertMap(key, value) {
    if (this.#map.has(key)) {
      return this.#map.get(key).add(value)
    } 
  
    return this.#map.set(key, new Set([value]))
  }

  #updateMap(parent, child) {
    const parentValue = this.#heap.at(parent)
    const childValue = this.#heap.at(child)

    this.#map.get(parentValue).delete(parent)
    this.#insertMap(parentValue, child)

    this.#map.get(childValue).delete(child)
    this.#insertMap(childValue, parent)
  }

  #bubbleUp(index) {
    const parent = this.parent(index)
    const parentValue = this.#heap[parent]
    const value = this.#heap[index]

    if (parentValue > value) {
      this.#updateMap(parent, index) 
      this.#swap(parent, index)

      return this.#bubbleUp(parent)
    }
  }

  insert(data) {
    this.#heap.push(data)
    this.#insertMap(data, this.length - 1)
    this.#bubbleUp(this.length - 1)

    return this
  }

  toArray() {
    return structuredClone(this.#heap)
  }
}

const heap = new Heap([10, 20, 4])

heap.insert(10).insert(5).insert(3).insert(29).insert(1).insert(0)

console.log(heap.toArray())
module.exports = Heap