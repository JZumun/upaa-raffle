<template lang="pug">
  .app
    transition(name="fade")
      router-view
    water-mark
</template>

<script>
import WaterMark from "@ui/components/Watermark.vue";
export default {
  components: { WaterMark }
};
</script>

<style lang="scss">
body {
  height: 100vh;
  width: 100vw;
  background: url("./assets/background-2.png");
  background-size: cover;
  background-position: top;
  background-attachment: fixed;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.app {
  position: relative;
}
</style>
