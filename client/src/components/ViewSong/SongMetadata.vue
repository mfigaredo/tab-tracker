<template>
  <panel title="Song Meta data">
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

        <v-btn
          dark
          class="cyan"
          :to="{name: 'song-edit',
            params () {
              return {
                songId: song.id
              }
            }
          }">
          Edit Song
        </v-btn>

        <v-btn dark class="cyan"
          v-if="isUserLoggedIn && !bookmark"
          @click="setAsBookmark">
          Set as Bookmark
        </v-btn>

        <v-btn dark class="cyan"
          v-if="isUserLoggedIn && bookmark"
          @click="unsetAsBookmark">
          Unset as Bookmark
        </v-btn>

      </v-flex>

      <v-flex xs6>
        <img class="album-image" :src="song.albumImageUrl"/>
        <br>
        {{ song.album }}
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import { mapState } from 'vuex'
import BookmarksService from '@/services/BookmarksService'

export default {
  props: [
    'song'
  ],
  data () {
    return {
      bookmark: null
    }
  },
  methods: {
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          SongId: this.song.id
        })).data
        this.bookmark.bookmarkId = this.bookmark.id
        console.log('bookmarked')
      } catch (err) {
        console.log(err)
      }
    },
    async unsetAsBookmark () {
      try {
        await BookmarksService.delete(this.bookmark.bookmarkId)
        this.bookmark = null
        console.log('unbookmarked')
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  watch: {
    async song () {
      if (!this.isUserLoggedIn) {
        return
      }
      console.log('montaje... song', this.song)
      try {
        const bookmarks = (await BookmarksService.index({
          SongId: this.song.id
        })).data
        if (bookmarks.length) {
          this.bookmark = bookmarks[0]
        }
        // this.isBookmarked = !!bookmark
        console.log('song user: ', this.song.id, this.user.id || 0)
        console.log('bookmark', this.bookmark)
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
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
