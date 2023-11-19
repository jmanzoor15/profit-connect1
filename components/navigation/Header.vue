<template>
  <header class="nav-header w-100">
    <div
      class="container d-flex justify-content-between align-items-center h-100 mx-auto"
    >
      <NavigationMenu />
      <div class="d-flex">
        <NavigationUserDropdown />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.nav-header {
  transition: 300ms;
  height: 86px;
  background: $main-dark-blue;
}
</style>
