<template>
  <router-link to="/" class="logo">Algetda</router-link>
</template>

<style lang="scss" scoped>
.logo {
  font-family: 'Poppins';
  font-size: 1.5em;
  font-weight: 500;
  border-bottom: none;

  &:hover,
  &:active,
  &.router-link-exact-active {
    color: black;
    border-bottom: none;
  }
}
</style>
