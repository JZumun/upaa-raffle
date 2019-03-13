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
      await new Promise((done)=>setInterval(done,1000))
      try {
        const { success, result } = (await axios.post("/api/raffle")).data;
        // const { success, result } = await Promise.resolve({ success: true, result: { id: "1234-56789", name: "Barbaros" } })
        if (success) {
          this.winner = result;
          this.count -= 1
        } else {
          this.logError("Unable to find a winner");
        }
      } catch (err) {
        this.logError("An error occured");
        this.show.winner = false;
      }
      this.roll = false;
    },
    toggleRoll() {
      this.roll = !this.roll;
    },
    showWinner() {
      this.show.winner = true;
      this.show.button = true;
    },
    logError(message) {
        this.error = true;
        this.$snackbar.open(message)
        this.show.button = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.rolodex-container {
  font-size: 4em;
  font-family: monospace;
  line-height: 3;
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
  line-height: 0.75;
  font-size: 5em;
  transition: opacity 0.25s;
}
.high {
  font-size: 3em;
}
.low {
  font-weight: bold;
}

.is-hiding {
  opacity: 0;
}
.count {
  margin-top: 1em;
}
</style>
