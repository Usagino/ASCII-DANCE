<template lang="pug">
.container
  client-only
    vue-p5(
      @setup="setup"
      @draw="draw"
      )
</template>

<script>
import VueP5 from 'vue-p5'

export default {
  data() {
    return {
      img: '',
      alphabets: [],
      font: '"Menlo", "Monaco", "Consolas", monospace',
      str: "<>?,./;:'{}[]¥|=+-_0123456789!@#$%^&*() ",
      fullSize: {
        width: 500,
        height: 500,
      },
      movie: '',
    }
  },

  methods: {
    setup(p5) {
      const canvas = p5.createCanvas(this.fullSize.width, this.fullSize.height)
      canvas.parent(this.$refs.p5)
      movie = p5.createVideo(['./movie/barret.mp4']) // eslint-disable-line
      this.movie.hide()
      this.movie.loop()
      this.movie.size(this.fullSize.width, this.fullSize.height)
      for (let i = 0; i < this.str.length; i++) {
        this.alphabets.push(this.Alphabet(this.str.substr(i, 1), p5))
      }
      this.alphabets.sort(function (a, b) {
        if (a.v > b.v) {
          return 1
        } else {
          return -1
        }
      })
    },
    draw(p5) {
      p5.background(0)
      const img = this.movie.get()
      const cols = this.fullSize.width / 10
      const rows = this.fullSize.width / 10
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
          this.str = this.alphabets[
            p5.int(p5.map(b, 1, 0, 0, this.alphabets.length - 1))
          ].s
          // fill(c);
          p5.text(this.str, cx, cy)
        }
      }
    },
    Alphabet(str, p5) {
      this.s = str
      this.v = 0
      this.g = p5.createGraphics(10, 10)
      this.g.textFont(this.font)
      this.g.textAlign(p5.CENTER, p5.CENTER)
      this.g.text(this.s, this.g.width / 2, this.g.height / 2)
      for (let j = 0; j < this.g.height; j++) {
        for (let i = 0; i < this.g.width; i++) {
          const a = p5.alpha(this.g.get(i, j))
          this.v += a
        }
      }
    },
  },
  render(h) {
    return h(VueP5, { on: this })
  },
}
</script>

<style lang="sass">
.container
  background: rgb(0, 0, 0)
  width: 100vw
  height: 100vh
  display: grid
  place-items: center
</style>
