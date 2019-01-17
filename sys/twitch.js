var Bot, tmi, client

exports.create = (bot) => {
  Bot = bot
  tmi = require('tmi.js')
  Bot.twitch.Viewers = new Map()

  let identity
  if (Bot.auth.twitch.username && Bot.auth.twitch.password) {
    identity = {
      username: Bot.auth.twitch.username,
      password: Bot.auth.twitch.password
    }
  }

  let options = {
    options: {
      debug: true
    },
    connection: {
      reconnect: true
    },
    identity,
    channels: process.argv.slice(2).splice(0, 2)
  }

  client = tmi.client(options)
  Bot.dbg.DeBug('info', 'DralithBot', 'Loaded Twitch object')

  client.connect().catch(err => {
    Bot.dbg.DeBug('ERROR', 'twitch', err.message)
  })

  client.on('join', function (channel, username, self) {
    if (self || Bot.bots.includes(username.toLowerCase())) return
    Bot.dbg.DeBug('info', channel, username + ' joined.')
    if (!Bot.twitch.Viewers.has(username)) {
      Bot.twitch.Viewers.set(username, {})
    }
  })

  client.on('leave', function (channel, username, self) {
    if (self || Bot.bots.includes(username.toLowerCase())) return
    Bot.dbg.DeBug('info', channel, username + ' left.')
    if (Bot.twitch.Viewers.has(username)) {
      Bot.twitch.Viewers.delete(username)
    }
  })

  client.on('chat', function (channel, user, message, self) {
    if (self || Bot.bots.includes(user.username.toLowerCase())) return
    Bot.cmd.process('twitch', message, channel, user, self)
    if (!Bot.twitch.Viewers.has(user.username.toLowerCase())) {
      Bot.twitch.Viewers.set(user.username.toLowerCase(), user)
    }
  })
}

exports._sendMessage = (channel, message) => {
  if (!message) { return }
  return client.say(channel, message).catch(err => {
    Bot.dbg.DeBug('ERROR', channel, err.message)
  })
}

exports.random_viewer = (map = Bot.twitch.Viewers) => {
  let viewerKeys = Array.from(map.keys())
  return viewerKeys[Math.floor(Math.random() * (viewerKeys.length - 1))]
}

exports.query_stream_info = (users) => {
  var userList = 'user_login=' + users.join('&user_login=')
  client.api({
    url: 'https://api.twitch.tv/helix/streams?' + userList,
    method: 'GET',
    headers: {
      'Client-ID': Bot.auth.twitch.clientID,
      'Authorization': Bot.auth.twitch.password
    }
  }, function (err, res, body) {
    if (err) {}
    console.log(body)
  })
}

exports.query_user_info = (users) => {
  var userList = 'login=' + users.join('&login=')
  client.api({
    url: 'https://api.twitch.tv/helix/users?' + userList,
    method: 'GET',
    headers: {
      'Client-ID': Bot.auth.twitch.clientID,
      'Authorization': Bot.auth.twitch.password
    }
  }, function (err, res, body) {
    if (err) {}
    console.log(body)
  })
}
