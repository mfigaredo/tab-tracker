<template>
  <div>
    <v-layout class="mb-2">
      <v-flex xs6>
        <song-metadata :song="song"></song-metadata>
      </v-flex>

      <v-flex xs6 class="ml-2">
        <you-tube :youtubeId="song.youtubeId"></you-tube>
      </v-flex>

    </v-layout>
    <v-layout>
      <v-flex xs6>
        <tab :song="song"></tab>
      </v-flex>
      <v-flex xs6 class="ml-2">
        <lyrics :song="song"></lyrics>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import SongsService from '@/services/SongsService'
import SongMetadata from './SongMetadata'
import YouTube from './YouTube'
import Lyrics from './Lyrics'
import Tab from './Tab'
import SongHistoryService from '@/services/SongHistoryService'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      song: {}
    }
  },
  computed: {
    ...mapState([
      'user',
      'isUserLoggedIn',
      'route'
    ])
  },
  async mounted () {
    const songId = this.route.params.songId
    this.song = (await SongsService.show(songId)).data
    console.log('user logged', this.isUserLoggedIn)
    if (this.isUserLoggedIn) {
      SongHistoryService.post({
        SongId: songId
      })
    }
  },
  components: {
    SongMetadata,
    YouTube,
    Lyrics,
    Tab
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

textarea {
  width: 100%;
  font-family: monospace;
  border: none;
  height: 600px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 20px;
  font-size: 12px;
}
</style>
