<template lang="pug" functional>
  router-link.settings-button(to="/settings")
    b-icon(icon="settings")
</template>

<style scoped>
.settings-button {
  position: absolute;
  top: 2em;
  right: 2em;
  color: inherit;
}
</style>
