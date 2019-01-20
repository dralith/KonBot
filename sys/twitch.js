var Bot, tmi, client

function twitchJoin (channel, username, self) {
  twitchJoLeCh(channel, username, self, 'joined')
}

function twitchLeave (channel, username, self) {
  twitchJoLeCh(channel, username, self, 'left')
}

function twitchChat (channel, user, message, self) {
  twitchJoLeCh(channel, user, self, 'chat', message)
}

function twitchJoLeCh (channel, username, self, t, message) {
  if (self || Bot.bots.includes(username.toLowerCase())) return
  if (t !== 'chat') { Bot.dbg.DeBug('info', channel, username + ' ' + t + '.') }
  if (Bot.twitch.Viewers.has(username.toLowerCase()) && t === 'left') {
    Bot.twitch.Viewers.delete(username.toLowerCase())
  } else if (!Bot.twitch.Viewers.has(username.toLowerCase()) && t === 'joined') {
    Bot.twitch.Viewers.set(username.toLowerCase(), {})
  } else if (t === 'chat') {
    if (!Bot.twitch.Viewers.has(username['username'].toLowerCase())) {
      Bot.twitch.Viewers.set(username['username'].toLowerCase(), username)
    }
    Bot.cmd.process('twitch', message, channel, username, self)
  }
}

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
  Bot.dbg.DeBug('info', 'KonBot', 'Init Twitch object')

  client.connect().catch(err => {
    Bot.dbg.DeBug('ERROR', 'twitch', err.message)
  })

  client.on('join', twitchJoin)
  client.on('leave', twitchLeave)
  client.on('chat', twitchChat)
}

exports.destruct = () => {
  Bot.twitch.Viewers = null
  client.removeListener('join', twitchJoin)
  client.removeListener('leave', twitchLeave)
  client.removeListener('chat', twitchChat)
  client.disconnect()
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
