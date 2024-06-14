<template>
  <!-- <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div> -->
  <div>
    <!-- <element-view></element-view>
    <emp-view></emp-view> -->
    <!-- <im-view></im-view> -->
    <!-- <im></im> -->
    <!-- <emp-view></emp-view> -->
    <router-view></router-view>

  </div>
</template>

<script>
  // import EmpView from './views/tilas/EmpView.vue'

  // import EmpView from './views/tilas/EmpView.vue'

  // import Im from './views/myEle/Im.vue'

  export default{
    components:{},
    data(){
      return{

      }
    },
    methods:{

    }

  }
</script>

<style>

</style>

<!-- <style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style> -->
