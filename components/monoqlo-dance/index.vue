<template lang="pug">
.container
  #processing-render
</template>

<script>
export default {
  name: 'Monoqlo',
  mounted() {
    const scriptHoge = (p5) => { // eslint-disable-line
      p5.setup = () => {
        const canvas = p5.createCanvas(500, 500)
        canvas.parent('processing-render')
      }
    }
    const script = require('./js/sketch.js') // eslint-disable-line
    const P5 = require('p5')
    new P5(script.main)
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
