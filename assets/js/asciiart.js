let p5

export function main(_p5) {
  p5 = _p5
  let img // eslint-disable-line
  let alphabets = [] // eslint-disable-line
  const font = '"Menlo", "Monaco", "Consolas", monospace' // eslint-disable-line]
  let str = "<>?,./;:'{}[]¥|=+-_0123456789!@#$%^&*() "
  const fullSize = {
    width: 500,
    height: 500,
  }
  let movie

  p5.preload = () => {}

  p5.setup = () => {
    const canvas = p5.createCanvas(fullSize.width, fullSize.height)
    canvas.parent('processing-render')
    movie = p5.createVideo(['./movie/barret.mp4']) // eslint-disable-line
    movie.hide()
    movie.loop()
    movie.size(fullSize.width, fullSize.height)
    for (let i = 0; i < str.length; i++) {
      alphabets.push(new Alphabet(str.substr(i, 1)))
    }
    alphabets.sort(function (a, b) {
      if (a.v > b.v) {
        return 1
      } else {
        return -1
      }
    })
  }

  p5.draw = () => {
    p5.background(0)
    const img = movie.get()
    const cols = fullSize.width / 10
    const rows = fullSize.width / 10
    const d = p5.width / p5.max(cols, rows)
    p5.fill(255)
    p5.textSize(d)
    p5.textFont('monospace', 8)
    p5.textAlign(p5.CENTER, p5.CENTER)

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const x = p5.map(i, 0, cols, 0, p5.width)
        const y = p5.map(j, 0, rows, 0, p5.height)
        const cx = x + d / 2
        const cy = y + d / 2
        const c = img.get(cx, cy)
        const b = p5.sq(p5.brightness(c) / 100)
        str = alphabets[p5.int(p5.map(b, 1, 0, 0, alphabets.length - 1))].s
        // fill(c);
        p5.text(str, cx, cy)
      }
    }
  }

  class Alphabet {
    constructor(str) {
      this.s = str
      this.v = 0
      this.g = p5.createGraphics(10, 10)
      this.g.textFont(font)
      this.g.textAlign(p5.CENTER, p5.CENTER)
      this.g.text(this.s, this.g.width / 2, this.g.height / 2)
      for (let j = 0; j < this.g.height; j++) {
        for (let i = 0; i < this.g.width; i++) {
          const a = p5.alpha(this.g.get(i, j))
          this.v += a
        }
      }
    }
  }
}
