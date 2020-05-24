const { History, User, Song } = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      // const { UserId } = req.query
      const UserId = req.user.id
      const histories = await History.findAll({
        where: {
          UserId: UserId
        },
        include: [
          {
            model: Song
          }
        ]
      }).map( history => history.toJSON() )
        .map( history => _.extend({
          historyId: history.id,
          historyCreatedAt: history.createdAt,
          songId: history.Song.id
        }, history.Song ))
      res.send(_.uniqBy(histories, history => history.songId))
    } catch (err) {
      res.status(500).send({
        error: 'An error ocurred while fetching history'
      })
    }
  },
  async post (req, res) {
    try {
      const UserId = req.user.id
      const { SongId } = req.body
      const newHistory = await History.create({
        SongId: SongId,
        UserId: UserId
      })
      res.send(newHistory)
    } catch (err) {
      res.status(500).send({
        error: 'An error ocurred while creating history'
      })
    }
  }
}
