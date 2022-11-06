const Stack = require('../Abstract data types/stack.js')

const strings = [
  '[]{}()',
  '{{[()]}}',
  '[]{{}}([)]'
]

/**
 * initialize a Stack & Map with key left bracket & value right bracket
 * traverse each bracket of the braces
 * check is it exist in map or not
 * if exist push it in the stack (cause it's left bracket) 
 * if not exist then check is this bracket is equal to last left bracket on the stack
 * if match then remove it from the stack
 * if not match then return false
 */
const isValidString = (braces) => { 
  const stack = new Stack()
  const bracketMap = {
    '(': ')',
    '{': '}',
    '[': ']'
  }

  for (const bracket of braces) {
    if (bracket in bracketMap) {
      stack.push(bracket)
    } else {
      if (bracket === bracketMap[stack.top()]) {
        stack.pop() 
      } else {
        return false
      }
    }
  }

  return true
}

const solutions = strings.reduce((acc, cur) => {
  acc[cur] = isValidString(cur)
  return acc
}, {})


console.log(solutions)