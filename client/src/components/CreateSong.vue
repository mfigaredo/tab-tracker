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

      <v-btn dark class="cyan" @click="create">
        Create Song
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
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
  components: {
    Panel
  },
  methods: {
    async create () {
      this.error = null
      const areAllFieldsFilledIn = Object.keys(this.song).every(key => !!this.song[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      // call API
      try {
        await SongsService.post(this.song)
        this.$router.push({
          name: 'songs'
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>
