const Stack = require('../Abstract data types/stack.js')

const strings = [
  '[]{}()',
  '{{[()]}}',
  '[]{{}}([)]'
]

/**
 * initialize a Stack & Map with key left bracket & value right bracket
 * traverse each bracket of the brackets
 * check is it exist in map or not
 * if exist push it in the stack (cause it's left bracket) 
 * if not exist then check is this bracket is equal to last left bracket on the stack
 * if match then remove it from the stack
 * if not match then return false
 */
const isValidBrackets = (brackets) => { 
  const stack = new Stack()
  const bracketMap = {
    '(': ')',
    '{': '}',
    '[': ']'
  }

  for (const curBracket of brackets) {
    if (curBracket in bracketMap) {
      stack.push(curBracket)
    } else {
      const rightBracket = bracketMap[stack.top()]
      if (curBracket === rightBracket) {
        stack.pop() 
      } else {
        return false
      }
    }
  }

  return true
}

const solutions = strings.reduce((acc, cur) => {
  acc[cur] = isValidBrackets(cur)
  return acc
}, {})


console.log(solutions)