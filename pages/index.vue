<template lang="pug">
.container
  p.click  Click
  monoqlo-dance
</template>

<script>
export default {
  mounted() {
    console.log('hi')
  },
}
</script>

<style lang="sass">

.click
  position: fixed
  top: 40px
  left: 40px
  cursor: pointer
  color: white
  mix-blend-mode: difference
  z-index: 999
</style>
