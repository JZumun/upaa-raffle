<template lang="pug">
  span.rolodex
    span(v-for="letter,i in displayValue", :class="{correct: !rollingLetters[i]}") {{ letter }}
</template>

<script>
import { setInterval, clearInterval, setTimeout, clearTimeout } from "timers";
const generateRandomString = chars => {
  return chars.charAt(Math.floor(Math.random() * chars.length));
};

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
export default {
  props: {
    value: {
      type: String,
      default: "??????????"
    },
    rolling: {
      type: Boolean,
      default: false
    },
    chars: {
      type: String,
      default: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    },
    forceStop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      displayValue: [...this.value],
      rollingIntervals: [],
      clearingTimeout: null,
      rollingLetters: [...this.value].map(() => this.rolling)
    };
  },
  watch: {
    forceStop(stop) {
      if (stop) {
        this.forceClear();
      }
    },
    rolling: {
      handler(isRolling) {
        if (isRolling) {
          clearInterval(this.rollingInterval);
          this.rollingIntervals = this.displayValue.map((v, i) =>
            setInterval(() => {
              this.$set(this.displayValue, i, generateRandomString(this.chars));
              this.$set(this.rollingLetters, i, true);
            }, 100)
          );
        } else {
          const num = this.rollingIntervals.length;
          const indices = shuffleArray([...Array(num).keys()]);
          const clear = i =>
            (this.clearingTimeout = setTimeout(() => {
              if (i >= num) {
                if (this.rollingIntervals.length > 0) {
                  this.rollingIntervals = [];
                  this.$emit("stop");
                }
              } else {
                const j = indices[i];
                clearInterval(this.rollingIntervals[j]);
                this.$set(this.displayValue, j, this.value[j]);
                this.$set(this.rollingLetters, j, false);
                clear(i + 1);
              }
            }, 1500 - (i * 1250) / (num - 1)));
          clear(0);
        }
      },
      immediate: true
    }
  },
  methods: {
    forceClear() {
      clearTimeout(this.clearingTimeout);
      this.rollingIntervals.forEach(clearInterval);
    }
  }
};
</script>

<style lang="scss" scoped>
.correct {
  font-weight: bold;
}
</style>
