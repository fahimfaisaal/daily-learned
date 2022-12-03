class Heap extends Array {
  #map
  #length

  constructor(initialValues = []) {
    super()
    this.#map = new Map()
    this.#length = 0

    this.push(...initialValues)
  } 

  get size() {
    return this.#length
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
    [this[firstIndex], this[secondIndex]] = [this[secondIndex], this[firstIndex]]
  }

  #memoInsert(key, value) {
    if (this.#map.has(key)) {
      return this.#map.get(key).add(value)
    } 
  
    return this.#map.set(key, new Set([value]))
  }

  #memoUpdate(parent, child) {
    const parentValue = this[parent]
    const childValue = this[child]

    this.#map.get(parentValue).delete(parent)
    this.#memoInsert(parentValue, child)

    this.#map.get(childValue).delete(child)
    this.#memoInsert(childValue, parent)
  }

  #memoRemove(index) {
    const value = this[index];
    this.#map.get(value).delete(index)

    this.#map.get(value).size === 0 && this.#map.delete(value)
  }

  #bubbleUp(index) {
    const parent = this.parent(index)
    const parentValue = this[parent]
    const value = this[index]

    if (parentValue > value) {
      this.#memoUpdate(parent, index) 
      this.#swap(parent, index)

      return this.#bubbleUp(parent)
    }
  }

  #sinkDown(index) {
    const right = this.right(index)
    const left = this.left(index)

    const childMap = {
      [this[right] ?? '']: right,
      [this[left] ?? '']: left
    }
    const child = Object.keys(childMap).filter(Boolean)
    
    if (child.some((value) => value < this[index])) {
      const minIndex = childMap[Math.min(...child)]

      this.#memoUpdate(index, minIndex)
      this.#swap(index, minIndex)
      this.#sinkDown(minIndex)
    }
  }

  peek() {
    return this[0]
  }

  push(...elements) {
    for (const value of elements) {
      this.insert(value)
    }

    return this.length
  }

  insert(data) {
    super.push(data)
    this.#memoInsert(data, this.length - 1)
    this.#bubbleUp(this.length - 1)
    this.#length++

    return this
  }

  remove(data) {
    const index = this.#map.get(data)?.values().next().value

    ~index && this.removeAt(index)
  }

  removeAt(index = 0) {
    this.#memoRemove(index)
    this.#length--

    this.#map.get(this[this.length - 1]).delete(this.length - 1)
    this.#map.get(this[this.length - 1]).add(index)

    this.#swap(index, this.length - 1)
    super.pop()

    this.#sinkDown(index)

    return this
  }
}

const heap = new Heap([10, 20, 4])

heap.push(10, 5, 3, 29, 1, 0)

heap.removeAt()
heap.removeAt()
heap.removeAt()
heap.removeAt()
heap.insert(1)

console.log(heap)

module.exports = Heap