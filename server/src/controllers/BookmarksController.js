const { Bookmark, User, Song } = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      let songs = null
      const UserId = req.user.id
      const { SongId } = req.query
      console.log('query', SongId, UserId)
      where = {
        UserId: UserId
      }
      if (SongId) {
        where.SongId = SongId
      }
      const bookmarks = await Bookmark.findAll({
        where: where,
        include: [
          {
            model: Song
          }
        ]
      }).map( bookmark => bookmark.toJSON() )
        .map( bookmark => _.extend({
          bookmarkId: bookmark.id
        }, bookmark.Song ))
      res.send(bookmarks)
    } catch (err) {
      res.status(500).send({
        error: 'An error ocurred while fetching bookmark'
      })
    }
  },
  async post (req, res) {
    try {
      const UserId = req.user.id
      const { SongId } = req.body
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: SongId,
          UserId: UserId
        }
      })
      if (bookmark) {
        return res.status(400).send({
          error: 'you already have this set as a bookmark'
        })
      }

      const newBookmark = await Bookmark.create({
        SongId: SongId,
        UserId: UserId
      })
      res.send(newBookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error ocurred while creating bookmark'
      })
    }
  },
  async delete (req, res) {
    try {
      const userId = req.user.id
      const { bookmarkId } = req.params;
      console.log('bookmarkId', bookmarkId)
      // const bookmark = await Bookmark.findById(bookmarkId)
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId,
          UserId: userId
        }
      })
      if (!bookmark) {
        return res.status(403).send({
          error: 'you do not have access to this bookmark'
        })
      }
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error ocurred while deleting bookmark'
      })
    }
  }
}
