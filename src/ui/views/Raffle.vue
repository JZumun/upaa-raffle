<template lang="pug">
  .raffle-container
    raffle-logo
    div
      span.congrats.high(:class="{'is-hiding': !show.winner}") Congratulations!
      div.rolodex-container
        raffle-rolodex(:value="winner.id.slice(0,4)", :rolling="roll", chars="0123456789", :forceStop="error")
        span -
        raffle-rolodex(:value="winner.id.slice(5)", :rolling="roll", chars="0123456789", @stop="showWinner", :forceStop="error")
      span.congrats.low(:class="{'is-hiding': !show.winner}") &nbsp; {{ winner.name }}
    .controls
      button.button.is-primary.is-large(@click="raffle", :disabled="!show.button") Pick Winner
      div.count {{ count }} participants left
    settings-gear
</template>

<script lang="js">
import axios from "axios";
import RaffleLogo from "../components/Logo.vue";
import RaffleRolodex from "../components/Rolodex.vue";
import SettingsGear from "../components/Gear.vue";
export default {
  components: {
    RaffleLogo , RaffleRolodex,SettingsGear
  },
  async mounted() {
    const {success, result} =( await axios.get("/api/count")).data;
    if (success) {
      this.count = result;
    }
  },
  data() {
    return {
      winner: { id: "----------", name: "" },
      count: "??",
      roll: false,
      show: {
        winner: false,
        button: true
      },
      error: false
    };
  },
  methods: {
    async raffle() {
      if (!this.show.button) { return }
      this.show.button = false;
      this.error = false;
      this.roll = true;
      this.show.winner = false;
      try {
        const { success, result } = (await axios.post("/api/raffle")).data;
        if (success) {
          this.winner = result;
          this.count -= 1
        } else {
          this.error = true;
          this.$snackbar.open("Unable to find a winner")
          this.show.button = true;
        }
      } catch (err) {
        this.error = true;
        this.$snackbar.open("An error occured")
        this.show.button = true;
      }
      this.roll = false;
    },
    toggleRoll() {
      this.roll = !this.roll;
    },
    showWinner() {
      this.show.winner = true;
      this.show.button = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.rolodex-container {
  font-size: 5em;
  font-family: monospace;
}
.raffle-container {
  text-align: center;
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}
.congrats {
  font-size: 3em;
  transition: opacity 0.25s;
}
.high {
  font-size: 2em;
}

.is-hiding {
  opacity: 0;
}
.count {
  margin-top: 1em;
}
</style>
