<template lang="pug">
  .raffle-container
    raffle-logo
    div.winner-container
      p UPAA Camarines Sur Chapter
      p.title E-Raffle Contest
    .controls 
      router-link.button.is-primary.is-large( to="/raffle" ) START
    settings-gear
</template>

<script>
import RaffleLogo from "../components/Logo.vue";
import SettingsGear from "../components/Gear.vue";
export default {
  components: { RaffleLogo, SettingsGear }
};
</script>

<style lang="scss" scoped>
p {
  line-height: 1;
  font-size: 3em;
}

.raffle-container {
  text-align: center;
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

.title {
  font-size: 5em;
  font-weight: bold;
}

.controls {
  padding: 2em;
  letter-spacing: 0.1ch;
}

.count {
  margin-top: 1em;
}
</style>
