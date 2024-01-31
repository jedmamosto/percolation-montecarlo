/* eslint-disable @typescript-eslint/space-before-function-paren */

import Percolation from './Percolation'

export default class PercolationStats {
  trials: number
  n: number
  fractions: number[]

  constructor(n: number, trials: number) {
    this.n = n
    this.trials = trials
    this.fractions = []

    for (let t = 0; t < trials; t++) {
      const percolation = new Percolation(n)
      while (!percolation.percolates()) {
        const row = Math.floor(Math.random() * n)
        const col = Math.floor(Math.random() * n)
        percolation.open(row, col)
      }

      if (percolation.percolates()) {
        percolation.printGrid()
        console.log('-------------------------------------------------')
      }

      this.fractions.push(percolation.getNumberOfOpenSites() / (n * n))
    }
  }

  mean(): number {
    let sum = 0
    for (const frac of this.fractions) {
      sum += frac
    }
    return sum / this.trials
  }

  stddev(): number {
    const mean = this.mean()
    let sum = 0
    for (const frac of this.fractions) {
      sum += (frac - mean) ** 2
    }
    return Math.sqrt(sum / this.trials)
  }

  confidenceLo(): number {
    return this.mean() - 1.96 * this.stddev() / Math.sqrt(this.trials)
  }

  confidenceHi(): number {
    return this.mean() + 1.96 * this.stddev() / Math.sqrt(this.trials)
  }
}
