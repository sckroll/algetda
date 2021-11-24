<template>
  <div id="app">
    <header class="header-bar">
      <div class="left">
        <div class="drawer-icon"></div>
        <div class="logo">Algetda</div>
        <div class="curr-algorithm"></div>
      </div>
      <div class="right">
        <div class="gear-icon"></div>
        <div class="home-icon"></div>
        <div class="github-icon"></div>
      </div>
    </header>
    <router-view />
  </div>
</template>

<style lang="scss">
header.header-bar {
  height: 64px;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $color-grey-4;

  .left,
  .right {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
.logo {
  font-size: 1.5em;
}
.drawer-icon,
.gear-icon,
.home-icon,
.github-icon {
  width: 32px;
  height: 32px;
  background-color: $color-grey-3;
}
</style>
