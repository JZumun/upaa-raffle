<template lang="pug" functional>
  a.watermark(href="https://www.jzumun.ph")
    img(src="@ui/assets/jzumun.png")
    span Created by #[strong Rein Bulaong]
</template>

<style lang="scss" scoped>
.watermark {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1em;
  align-items: center;
  position: absolute;
  bottom: 2em;
  left: 2em;
}
.watermark img {
  width: 3em;
  padding: 0.25em;
  border: 0.25em solid #aaa;
}

.watermark span {
  transition: opacity 0.5s, transform 0.5s;
}

.watermark:not(:hover) span {
  opacity: 0;
  transform: translateX(-10%);
}
.watermark:hover img {
  animation-name: wiggle;
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
}

@keyframes wiggle {
  0% {
    transform: rotate(5deg);
  }
  25% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(10deg);
  }
  75% {
    transform: rotate(-2.5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
