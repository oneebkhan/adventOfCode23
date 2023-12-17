// read file txt because it contains "\" that will not work in strings
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input2.txt')
const INPUT = fs.readFileSync(filePath, { encoding: 'utf8' })

function memo (func) {
  const cache = new Map()
  return function (...args) {
    const cacheKey = JSON.stringify(args)
    if (!cache.has(cacheKey)) {
      const value = func(...args)
      cache.set(cacheKey, value)
      return value
    }
    return cache.get(cacheKey)
  }
}

const rows = INPUT.split('\n').map(char => char.split(''))

const maxY = rows.length

const maxX = rows[0].length

let previouslyVisitedNodes = new Set()
let sumMap = new Set()

const nextDirectionMap = {
  '/': {
    up: ['right'],
    right: ['up'],
    down: ['left'],
    left: ['down']
  },
  '\\': {
    up: ['left'],
    right: ['down'],
    down: ['right'],
    left: ['up']
  },
  '-': {
    up: ['left', 'right'],
    right: ['right'],
    down: ['left', 'right'],
    left: ['left']
  },
  '|': {
    up: ['up'],
    right: ['up', 'down'],
    down: ['down'],
    left: ['up', 'down']
  },
  '.': {
    up: ['up'],
    right: ['right'],
    down: ['down'],
    left: ['left']
  }
}
let move = node => {
  let newNode = { ...node }

  if (
    previouslyVisitedNodes.has(`${newNode.y}.${newNode.x}.${newNode.direction}`)
  ) {
    return null
  }

  previouslyVisitedNodes.add(`${newNode.y}.${newNode.x}.${newNode.direction}`)

  switch (newNode.direction) {
    case 'up':
      newNode = { ...newNode, y: node.y - 1 }
      break
    case 'right':
      newNode = { ...newNode, x: node.x + 1 }
      break
    case 'down':
      newNode = { ...newNode, y: node.y + 1 }
      break
    case 'left':
      newNode = { ...newNode, x: node.x - 1 }
      break
  }

  if (
    newNode.x >= maxX ||
    newNode.y >= maxY ||
    newNode.x < 0 ||
    newNode.y < 0
  ) {
    return null
  }
  sumMap.add(`${newNode.y}-${newNode.x}`)

  return newNode
}

// move = memo(move)

let pathFind = node => {
  if (!node) return
  const newNode = move(node, node.direction)
  if (!newNode) return
  nextDirectionMap[rows[newNode.y][newNode.x]][newNode.direction].forEach(
    direction => pathFind({ ...newNode, direction })
  )
}

// pathFind = memo(pathFind)

let sum = 0
let uniqueSums = new Set()
rows.forEach((row, rowIndex) =>
  row.forEach((_, charIndex) => {
    if (
      rowIndex > 0 &&
      rowIndex < rows.length - 1 &&
      charIndex > 0 &&
      charIndex < row.length - 1
    )
      return

    console.time(rowIndex)
    if (rowIndex === 0 || rowIndex === rows.length - 1) {
      previouslyVisitedNodes.clear()
      sumMap.clear()
      pathFind({
        x: charIndex,
        y: rowIndex === 0 ? -1 : rowIndex + 1,
        direction: rowIndex === 0 ? 'down' : 'up'
      })
      sum = Math.max(sum, sumMap.size)
      uniqueSums.add(sum)
    }
    previouslyVisitedNodes.clear()
    sumMap.clear()
    pathFind({
      x: charIndex === 0 ? -1 : charIndex + 1,
      y: rowIndex,
      direction: charIndex === 0 ? 'right' : 'left'
    })
    sum = Math.max(sum, sumMap.size)
    uniqueSums.add(sum)

    console.timeEnd(rowIndex)
  })
)
// 7616
console.log('sum: ', sum)
