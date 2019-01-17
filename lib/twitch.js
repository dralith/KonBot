const got = require('got')
const conf = require('../etc/config.json')

exports.getUser = {
  id: function (name) {
    return got.get(`https://api.twitch.tv/kraken/users?login=${name}`, {
      json: true,
      headers: {
        Accept: 'application/vnd.twitchtv.v5+json',
        'client-id': conf.clientID || ''
      }
    }).then(res => {
      return res.body.users[0]._id
    }).catch(err => {
      console.error(`Could not get id for '${name}'`)
      return err
    })
  },
  data: function (id) {
    return got.get(`https://api.twitch.tv/kraken/streams/${id}`, {
      json: true,
      headers: {
        Accept: 'application/vnd.twitchtv.v5+json',
        'client-id': conf.clientID || ''
      }
    }).then(res => {
      return res.body
    }).catch(err => {
      console.error(`Could not get date for '${id}'`)
      return err
    })
  }
}
