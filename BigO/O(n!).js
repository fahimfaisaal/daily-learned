//  this function will run O(n!) times
function factorialTime(n) {
  if (n === 1) {
    return
  }

  for (let i = 0; i < n; i++) {
    console.count('run')
    factorialTime(n - 1)
  }
}

factorialTime(5)
