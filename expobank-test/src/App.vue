<template>
  <div id="app">
    <el-menu mode="horizontal">
      <el-menu>
        <router-link to="/create"><el-menu-item index="1">Create Controllable Rectangle</el-menu-item></router-link>
        <router-link to="/scan"><el-menu-item index="2">Scan Rectangle</el-menu-item></router-link>
      </el-menu>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
