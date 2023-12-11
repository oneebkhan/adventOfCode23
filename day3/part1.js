const INPUT = ``

const EXAMPLE = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

let numMap = {
  numbers: {},
  symbols: {}
}

const getRange = (start, end) => {
    if (start > end) {
        [start, end] = [end, start];
    }
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

const arrayOfNums = EXAMPLE.split('\n')

arrayOfNums.forEach((nums, numsIndex) => {
  const numbers = nums.match(/(?:\d+\.)?\d+/g)
  const symbols = nums.match(/[!@#$%^&*()_+{}\[\]:;<>,?/~`\\|-]/g)

  if (!numMap.numbers[numsIndex]) numMap.numbers[numsIndex] = {}

  if (numbers && numbers.length) {
    numbers.forEach(number => {
      const index = nums.indexOf(number)
      getRange(index, number.length - 1).forEach(num => {
        numMap.numbers[numsIndex][num] = number 
      })
    })
  }

  // if (symbols && symbols.length) {
  //   symbols.forEach(symbol => {
  //     const index = symbols.indexOf(symbol)
  //     numMap.symbols[numsIndex][index] = symbol
  //   })
  // }

  if (symbols && symbols.length) {
    nums.split('').forEach((num, numIndex) => {

      if (numsIndex !== 0) {

      }
      
      if (numsIndex !== arrayOfNums.length - 1) {
      }
    })
  }

  console.log('d: ', d);
  console.log('c: ', c);
})
