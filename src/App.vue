<template>
  <div id="app">
    <Header></Header>
    <main>
      <router-view name="main"></router-view>
    </main>
  </div>
</template>
<script>
  import Header from './components/Header'
  import PostList from './components/PostList'

  export default {
    name: 'App',
    components: {
      'Header': Header,
      'PostList': PostList
    }
  }
</script>
<style lang="scss">
  main {
    width: 90%;
    max-width: 1400px;
    margin: 0 auto;
    margin-top: 16px;
    margin-bottom: 30px;
  }
</style>
