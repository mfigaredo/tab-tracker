<template>
  <v-toolbar fixed dark class="cyan">
    <v-toolbar-title class="mr-4">
      <router-link to="/">TabTracker</router-link>
      <!-- <v-btn flat dark @click="navigateTo({name: 'HelloWorld'})">
        TabTracker
      </v-btn> -->
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn flat dark @click="navigateTo({name: 'songs'})">
        Browse
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
        <!-- Signup -->
      <v-btn flat dark @click="navigateTo({name: 'login'})" v-if="!$store.state.isUserLoggedIn">
          Login
      </v-btn>
        <!-- Signup -->
      <v-btn flat dark @click="navigateTo({name: 'register'})" v-if="!$store.state.isUserLoggedIn">
        <!-- <router-link to="register"> -->
          Sign Up
        <!-- </router-link> -->
      </v-btn>

      <!-- Logout -->
      <v-btn flat dark @click="logout" v-if="$store.state.isUserLoggedIn">
        Log Out
      </v-btn>

    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: white;
}
</style>
