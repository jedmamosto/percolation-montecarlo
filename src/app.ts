import PercolationStats from '../classes/PercolationStats'
import * as readline from 'readline-sync'

const app = (): void => {
  const gridBase = readline.questionInt('Input a number for the grid base size: ')
  const trials = readline.questionInt('Input a number for how many trials to perform: ')

  const stats = new PercolationStats(gridBase, trials)
  console.log('Mean Percolation Threshold: ', stats.mean())
  console.log('Standard Deviation: ', stats.stddev())
  console.log('95% Confidence Interval: [', stats.confidenceLo(), ', ', stats.confidenceHi(), ']')
}

app()
