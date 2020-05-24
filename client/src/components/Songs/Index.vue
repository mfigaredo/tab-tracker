<template>
  <v-layout>
    <v-flex xs6 v-if="isUserLoggedIn">
      <songs-bookmarks></songs-bookmarks>
      <recently-viewed-songs class="mt-2"></recently-viewed-songs>
    </v-flex>
    <v-flex :class="{
        xs12: !isUserLoggedIn,
        xs6: isUserLoggedIn
      }" class="ml-2">
      <songs-search-panel></songs-search-panel>
      <br>
      <songs-panel :add_icon="isUserLoggedIn"></songs-panel>
    </v-flex>
  </v-layout>
</template>

<script>
import SongsPanel from './SongsPanel'
import SongsSearchPanel from './SongsSearchPanel'
import SongsBookmarks from './SongsBookmarks'
import RecentlyViewedSongs from './RecentlyViewedSongs'
// import SongsService from '@/services/SongsService'
import { mapState } from 'vuex' 

export default {
  components: {
    SongsPanel,
    SongsSearchPanel,
    SongsBookmarks,
    RecentlyViewedSongs
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  // data () {
  //   return {
  //     songs: null
  //   }
  // },
  // async mounted () {
  //   this.songs = (await SongsService.index()).data
  //   // console.log(this.songs)
  // },
}
</script>

<style scoped>

</style>
