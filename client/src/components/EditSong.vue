<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Song Metadata">
        <v-text-field label="Title" type="text" v-model="song.title" required :rules="[rules.required]"></v-text-field>
        <v-text-field label="Artist" type="text" v-model="song.artist" required :rules="[rules.required]"></v-text-field>
        <v-text-field label="Genre" type="text" v-model="song.genre" required :rules="[rules.required]"></v-text-field>
        <v-text-field label="Album" type="text" v-model="song.album" required :rules="[rules.required]"></v-text-field>
        <v-text-field label="Album Image URL" type="text" v-model="song.albumImageUrl" required :rules="[rules.required]"></v-text-field>
        <v-text-field label="YouTube ID" type="text" v-model="song.youtubeId" required :rules="[rules.required]"></v-text-field>
      </panel>
    </v-flex>
    <v-flex xs8>
      <panel title="Song Structure" class="ml-2">
        <v-textarea label="Tab" v-model="song.tab" required :rules="[rules.required]"></v-textarea>
        <v-textarea label="Lyrics" v-model="song.lyrics" required :rules="[rules.required]"></v-textarea>
      </panel>

      <div class="danger-alert" v-if="error">
        {{ error }}
      </div>

      <v-btn dark class="cyan" @click="save">
        Save Song
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'

export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        album: null,
        genre: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      rules: {
        required: (value) => !!value || 'Required.'
      },
      error: null
    }
  },
  methods: {
    async save () {
      this.error = null
      const areAllFieldsFilledIn = Object.keys(this.song).every(key => !!this.song[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      // call API
      const songId = this.$store.state.route.params.songId
      try {
        await SongsService.put(this.song)
        this.$router.push({
          name: 'song',
          params: {
            songId: songId
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    try {
      const songId = this.$store.state.route.params.songId
      this.song = (await SongsService.show(songId)).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style>

</style>
