<template>
  <panel title="Youtube Video">
    <!-- youtube embedded -->
    <youtube
      :video-id="youtubeId"
      :player-width="600"
      :player-height="280"
      :player-vars="{ origin : 'http://localhost:8080' }"
      >
    </youtube>
  </panel>
</template>

<script>
// if (!window['YTConfig']) { var YTConfig = { 'host': 'http://www.youtube.com' } }
export default {
  props: [
    'youtubeId'
  ]
}
</script>

<style scoped>

</style>
