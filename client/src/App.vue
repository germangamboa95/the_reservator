<template>
  <div id="nav">
    <router-link to="/reservations">Reservations</router-link>
    <router-link to="/availability">Availability</router-link>
  </div>
  <router-view />
</template>
 
<script lang="ts">
import Vue, { defineComponent } from "vue";
import { api } from "./api";

export default defineComponent({
  async mounted() {
    await api.login();
  }
});
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: auto 1rem;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.container {
  width: 80%;
  margin: auto;
}

.field-group {
  text-align: left;
  display: flex;
  flex-direction: column;
  margin: auto 1rem;
}

.availability-info,
.scheduling-info,
.contact-info {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 1rem 0;

  @media (min-width: 1000px) {
    flex-direction: row;
  }
}
</style> 
