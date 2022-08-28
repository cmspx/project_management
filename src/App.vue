<template>
  <div id="app">
    <!-- 引入对应的router展示的内容，引入router组件 -->
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App'
}
</script>

<style>
html,body {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
}
</style>
