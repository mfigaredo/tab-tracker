<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <panel title="Register">
        <form name="tab-tracker-form" autocomplete="off">
          <v-text-field type="email" label="Email" name="email" v-model="email" />
          <br/>
          <v-text-field type="password" label="Password" name="password" v-model="password" autocomplete="new-password"/>
          <br/>
          <div class="danger-alert" v-html="error"></div>
          <v-btn class="cyan" dark @click="register">Register</v-btn>
        </form>
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
  // watch: {
  //   email(value) {
  //     console.log('email has changed', value)
  //   }
  // },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        // console.log('register button was clicked', this.email, this.password)
        // console.log(response.data)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'songs'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
  // ,
  // components: {
  //   Panel
  // }
  // mounted() {
  //   setTimeout( () => {
  //     this.email ='hello world!'
  //   }, 2000)
  // }
}
</script>

<style scoped>

</style>
