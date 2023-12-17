// read file txt because it contains "\" that will not work in strings
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input1.txt')
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

let tempRows = structuredClone(rows)

const maxY = rows.length

const maxX = rows[0].length

const initialNode = {
  x: 0,
  y: 0,
  direction: 'right'
}

const previouslyVisitedNodes = new Set()

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
  },
}

let move = (node, direction = 'right') => {
  let newNode = { ...node }

  previouslyVisitedNodes.add(`${node.y}.${node.x}.${node.direction}`)

  switch (direction) {
    case 'up':
      newNode = { ...newNode, y: node.y - 1, direction }
      break;
    case 'right':
      newNode = { ...newNode, x: node.x + 1, direction }
      break;
    case 'down':
      newNode = { ...newNode, y: node.y + 1, direction }
      break;
    case 'left':
      newNode = { ...newNode, x: node.x - 1, direction }
      break;
  }

  if (
    newNode.x >= maxX ||
    newNode.y >= maxY ||
    newNode.x < 0 ||
    newNode.y < 0
  )
  {
    return null
  }

  if (
    previouslyVisitedNodes.has(
      `${newNode.y}.${newNode.x}.${newNode.direction}`
    )
  ) {
    return null
  }

  tempRows[newNode.y][newNode.x] = '#'

  return newNode
}

move = memo(move)

let pathFind = node => {
  if (!node) return

  const directions = nextDirectionMap[rows[node.y][node.x]][node.direction]

  directions.forEach(direction => {
    pathFind(move(node, direction))
  })
}

pathFind = memo(pathFind)


pathFind(initialNode)
const sum = tempRows.map(r => r.filter(c => c === '#').length).reduce((acc, curr) => acc + curr, 0) +1
console.log('sum: ', sum);