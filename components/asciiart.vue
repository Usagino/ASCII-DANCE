<template lang="pug">
.container
  #processing-render
</template>

<script>
export default {
  mounted() {
    const script = require('@/assets/js/asciiart.js')
    const P5 = require('p5')
    console.log(P5)
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
