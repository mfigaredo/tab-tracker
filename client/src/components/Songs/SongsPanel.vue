<template>
  <panel title="Songs">
    <!-- <router-link :to="{name: 'songs-create'}" slot="action" > -->
      <v-btn class="cyan accent-2" light small fab absolute right middle :to="{name: 'songs-create'}" slot="action" v-if="add_icon">
        <v-icon>add</v-icon>
      </v-btn>
    <!-- </router-link> -->
    <div v-for="song in songs" :key="song.id" class="song">
      <v-layout>
        <v-flex xs6>
          <div class="song-title">
            {{song.title}}
          </div>
          <div class="song-artist">
            {{song.artist}}
          </div>
          <div class="song-genre">
            {{song.genre}}
          </div>
          <v-btn dark class="cyan"
            :to="{
              name: 'song',
              params: {
                songId: song.id
              }
            }">
            View
          </v-btn>
        </v-flex>

        <v-flex xs6>
          <img class="album-image" :src="song.albumImageUrl"/>

        </v-flex>
      </v-layout>

    </div>
  </panel>
</template>

<script>
import SongsService from '@/services/SongsService'
export default {
  props: [
    'add_icon'
  ],
  data () {
    return {
      songs: null
    }
  },
  // async mounted () {
  //   this.songs = (await SongsService.index()).data
  // },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songs = (await SongsService.index(value)).data
      }
    }
  }
}
</script>

<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.song-title {
  font-size: 30px;
}
.song-artist {
  font-size: 24px;
}
.song-genre {
  font-size: 18px;
}

.album-image {
  width: 70%;
  margin: 10px auto;
}
</style>
