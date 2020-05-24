<template>
  <v-toolbar fixed dark class="cyan">
    <v-toolbar-title class="mr-4">
      <router-link class="home"
        tag="a"
        :to="{name: 'songs'}">
        TabTracker
      </router-link>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn dark flat
        :to="{name: 'songs'}">
        Browse
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
        <!-- Signup -->
      <v-btn flat dark :to="{name: 'login'}" v-if="!$store.state.isUserLoggedIn">
          Login
      </v-btn>
        <!-- Signup -->
      <v-btn flat dark :to="{name: 'register'}" v-if="!$store.state.isUserLoggedIn">
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
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'songs'
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
