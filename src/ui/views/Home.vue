<template lang="pug">
  div
    .winner-section
      img.logo(src="@ui/assets/logo.png")
      div.winner-container(v-if="winner")
        p.congratulations Congratulations!
        p.winner {{winner}}
      div(v-else)
        p.congratulations UPAA Camarines Sur Chapter
        p.winner E-Raffle Contest
      .controls 
        button.button( @click.prevent="raffle" ) Select Next Winner
        p.count {{count}} entries remaining.
      a.settings-button(href="/settings")
        b-icon(icon="settings")
</template>

<script lang="js">
import axios from "axios";
export default {
  async mounted() {
    const {success, result} =( await axios.get("/api/count")).data;
    if (success) {
      this.count = result;
    }
  },
  data() {
    return {
      winner: undefined,
      count: "??"
    };
  },
  methods: {
    async raffle() {
      const { success, result } = (await axios.post("/api/raffle")).data;
      if (success) {
        this.winner = result.name;
        this.count -= 1
      } else {
        this.$snackbar.open("An error occured")
      }
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  line-height: 1;
}

.winner-section {
  text-align: center;
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100vh;
}

.congratulations {
  font-size: 3em;
}

.winner {
  font-size: 5em;
  font-weight: bold;
}

.logo {
  display: block;
  margin: 1em auto;
  width: 8em;
  height: auto;
}

.title {
  font-size: 5em;
}

.winner-container {
  margin-bottom: auto;
}

.controls {
  margin-top: auto;
  padding: 2em;
}

.count {
  margin-top: 1em;
}

.settings-button {
  position: absolute;
  top: 2em;
  right: 2em;
  color: inherit;
}
</style>
