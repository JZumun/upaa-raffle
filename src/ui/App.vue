<template lang="pug">
  transition(name="fade")
    router-view
</template>

<style lang="scss">
body {
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
</style>
