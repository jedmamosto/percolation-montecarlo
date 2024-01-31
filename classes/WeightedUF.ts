/* eslint-disable @typescript-eslint/space-before-function-paren */

export default class WeightedUF {
  ids: number[]
  sz: number[]

  constructor(N: number) {
    this.ids = []
    this.sz = []

    for (let i = 0; i < N; i += 1) {
      this.ids.push(i)
      this.sz.push(1)
    }
  }

  root(i: number): number {
    while (i !== this.ids[i]) {
      this.ids[i] = this.ids[this.ids[i]]
      i = this.ids[i]
    }
    return i
  }

  connected(p: number, q: number): boolean {
    return this.root(p) === this.root(q)
  }

  union(p: number, q: number): void {
    const i = this.root(p)
    const j = this.root(q)

    if (i === j) return

    if (this.sz[i] < this.sz[j]) {
      this.ids[i] = j
      this.sz[j] += this.sz[i]
    } else {
      this.ids[j] = i
      this.sz[i] += this.sz[j]
    }
  }
}
