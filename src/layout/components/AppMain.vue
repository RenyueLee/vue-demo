<template>
  <section class="app-main container">
    <router-view :key="key" />
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  background-color: #FFFFFF;
}
.fixed-header+.app-main {
  padding-top: 50px;
}

@media (min-width: 768px){
  .container {
      width: 746px;
  }
}

@media (min-width: 992px){
  .container {
      width: 966px;
  }
}

@media (min-width: 1200px){
  .container {
      width: 1166px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
