<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <panel title="Login">
        <v-text-field type="email" label="Email" name="email" v-model="email" />
        <br/>
        <v-text-field type="password" label="Password" name="password" v-model="password"/>
        <br/>
        <div class="danger-alert" v-html="error"></div>
        <v-btn class="cyan" dark @click="login">Login</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        // console.log(this.$store)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'songs'
        })
      } catch (error) {
        // console.log(error)
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>

</style>
