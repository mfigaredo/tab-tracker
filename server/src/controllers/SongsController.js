const {Song} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const songs = await Song.findAll({
        limit: 10
      })
      res.send(songs)
    } catch (err) {
      res.status(500).send({
        error: 'An error has ocurred trying to get songs'
      })
    }
  },
  async post (req, res) {
    try {
      // console.log(req.body)
      const song = await Song.create(req.body)
      res.send(song)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occured trying to save song',
        details: err
      })
    }
  }
}
