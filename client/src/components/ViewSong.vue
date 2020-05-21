<template>
  <div>
    Song ID: {{ songId }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      songId: null
    }
  },
  mounted () {
    console.log(this.$route)
    this.songId = this.$route.params.songId
  }
}
</script>

<style>

</style>
