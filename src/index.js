module.exports = function solveSudoku(matrix) {
  class Sudoku {
    constructor(matrix) {
      this.matrix = matrix
      this.rowCount = matrix[0].length
      this.columnCount = matrix.length
      this.boxRowCount = Math.floor(this.rowCount/3)
      this.boxColumnCount = Math.floor(this.columnCount/3)
    }

    isNumberInRow(number, row) {
      for (let index = 0; index < this.columnCount; index++) {
        if (this.matrix[row][index] == number) {
          return true
        }
      }
      return false
    }

    isNumberInColumn(number, column) {
      for (let index = 0; index < this.rowCount; index++) {
        if (this.matrix[index][column] == number) {
          return true
        }
      }
      return false
    }

    isNumberInBox(number, origin) {
      for (let rowIndex = 0; rowIndex < this.boxRowCount; rowIndex++) {
        for (let columnIndex = 0; columnIndex < this.boxColumnCount; columnIndex++) {
          if (this.matrix[origin.row + rowIndex][origin.column + columnIndex] == number) {
            return true
          }
        }
      }
      return false
    }

    isEmptyValueExist() {
      for (let rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
        for (let columnIndex = 0; columnIndex < this.columnCount; columnIndex++) {
          const element = this.matrix[rowIndex][columnIndex]
           if (element == 0) {       
             return {exist: true, row: rowIndex, column: columnIndex}
           }
        }
      }
      return {exist: false, row: undefined, column: undefined}
    }

    calculate() {
      const value = this.isEmptyValueExist()
      if (!value.exist) {
        return true
      }

      for (let index = 1; index <= 9; index++) {
        const origin = {row: value.row - (value.row%this.boxRowCount), 
                        column: value.column - (value.column%this.boxColumnCount)}
        if (!this.isNumberInRow(index, value.row) && 
            !this.isNumberInColumn(index, value.column) && 
            !this.isNumberInBox(index, origin)) {
          this.matrix[value.row][value.column] = index
          if (this.calculate()) { return true } 
          this.matrix[value.row][value.column] = 0
        }
      }

      return false
    }
  }
     
  const sudoku = new Sudoku(matrix)
  sudoku.calculate()

  return sudoku.matrix
}

