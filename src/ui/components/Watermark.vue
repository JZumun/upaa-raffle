<template lang="pug" functional>
  a.watermark(href="https://www.jzumun.ph")
    img(src="@ui/assets/jzumun.png")
    span Created by Rein Bulaong
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
  width: 2em;
}

.watermark span {
  transition: opacity 0.5s, transform 0.5s;
}

.watermark:not(:hover) span {
  opacity: 0;
  transform: translateX(-10%);
}
</style>
