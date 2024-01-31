/* eslint-disable @typescript-eslint/space-before-function-paren */

import WeightedUF from './WeightedUF'

export default class Percolation {
  grid: string[][]
  weightedUF: WeightedUF
  numberOfOpenSites: number

  private createGrid(N: number): string[][] {
    const grid = new Array<string[]>(N)
    for (let i = 0; i < N; i += 1) {
      grid[i] = new Array<string>(N).fill('[x]')
    }
    return grid
  }

  constructor(N: number) {
    this.grid = this.createGrid(N)
    this.weightedUF = new WeightedUF(N * N + 2)
    this.numberOfOpenSites = 0
  }

  open(row: number, col: number): void {
    const wasOpen = this.isOpen(row, col)

    const isConnectedToTopNeighbor = row > 0 && this.isOpen(row - 1, col)
    const isConnectedToBotNeighbor = row < this.grid.length - 1 && this.isOpen(row + 1, col)
    const isConnectedToLeftNeighbor = col > 0 && this.isOpen(row, col - 1)
    const isConnectedToRightNeighbor = col < this.grid[0].length - 1 && this.isOpen(row, col + 1)

    const isConnectedToVirtualTop = row === 0
    const isConnectedToVirtualBot = row === this.grid.length - 1

    if (wasOpen) {
      return
    }

    if (this.percolates()) {
      return
    }

    if (isConnectedToVirtualTop) {
      this.weightedUF.union(0, row * this.grid[0].length + col)
    }

    if (isConnectedToVirtualBot) {
      this.weightedUF.union(this.grid.length * this.grid[0].length, row * this.grid[0].length + col)
    }

    if (isConnectedToTopNeighbor) {
      this.weightedUF.union(row * this.grid[0].length + col, (row - 1) * this.grid[0].length + col)
    }

    if (isConnectedToBotNeighbor) {
      this.weightedUF.union(row * this.grid[0].length + col, (row + 1) * this.grid[0].length + col)
    }

    if (isConnectedToLeftNeighbor) {
      this.weightedUF.union(row * this.grid[0].length + col, row * this.grid[0].length + col - 1)
    }

    if (isConnectedToRightNeighbor) {
      this.weightedUF.union(row * this.grid[0].length + col, row * this.grid[0].length + col + 1)
    }

    if (!wasOpen) {
      this.grid[row][col] = '[ ]'
      this.numberOfOpenSites += 1
    }
  }

  isOpen(row: number, col: number): boolean {
    return this.grid[row][col] === '[ ]'
  }

  getNumberOfOpenSites(): number {
    return this.numberOfOpenSites
  }

  percolates(): boolean {
    return this.weightedUF.connected(0, this.grid.length * this.grid[0].length)
  }

  printGrid(): void {
    for (const row of this.grid) {
      console.log(row.join(''))
    }
  }
}
