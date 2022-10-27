const pow = (number, exponent) => {
  console.count('run')

  if (exponent === 1) {
    return number
  }

  if (exponent & 1) {
    return number * number * pow(number, exponent - 2)
  }

  return number * pow(number, exponent - 1)
}

console.log(pow(2, 9))