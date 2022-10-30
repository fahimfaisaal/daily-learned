class DArray {
  #length;
  #arr;
  #cap;
  constructor(cap = 1 << 3) {
    if (cap < 0) {
      throw new Error(`Illegal capaicy ${cap}`);
    }

    this.#arr = new Array(cap);
    this.#length = 0;
    this.#cap = cap;
  }

  get size() {
    return this.#length;
  }

  get capaticy() {
    return this.#cap;
  }

  set capaticy(cap) {
    if (cap < 0) {
      throw new Error(`Illegal capaity ${cap}`);
    }
    if (cap === 0) {
      this.#arr = new Array();
      this.#length = 0;
      this.#cap = 0;
      return this;
    }

    if (cap < this.#len) {
      const newArr = new Array();
      for (let i = 0; i < cap; i++) {
        newArr[i] = this.#arr[i];
      }

      this.#arr = newArr;
      this.#length = cap;
      this.#cap = cap;
    }
  }

  isEmpty() {
    return this.#length === 0;
  }

  get(index) {
    if (index >= this.#cap) {
      throw new Error(`Illegal index ${index}`);
    }

    return this.#arr[index];
  }

  set(index, item) {
    if (index >= this.#cap) {
      throw new Error(`Illegal index ${index}`);
    }

    this.#arr[index] = item;
    this.#length++;
    return this;
  }

  add(item) {
    if (this.#length === this.#cap) {
      if (this.#cap === 0) {
        this.#cap = 1;
      }
      this.#cap *= 2;
      const newArr = new Array(this.#cap);

      for (const index in this.#arr) {
        newArr[index] = this.#arr[index];
      }
      this.#arr = newArr;
    }

    this.#arr[this.#length] = item;

    this.#length++;

    return this;
  }

  removeAt(index) {
    if (index >= this.#length) {
      throw new Error("Illegal index ${index}");
    }

    const newArr = new Array(this.#cap);
    for (let i = 0, j = 0; i < this.#length; i++, j++) {
      if (j !== index) {
        newArr[j] = this.#arr[j];
      }
    }

    this.#length--;
  }

  reverse() {
    for (let i = 0; i < this.#length >> 1; i++) {
       [this.#arr[i], this.#arr[this.#length - i + 1]] = [
        this.#arr[this.#length - i + 1],
        this.#arr[i],
      ];
    }
  }
}
