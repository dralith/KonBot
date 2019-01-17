exports.create = (Bot) => {
  var Discord = require('eris')
  Bot.discord.client = new Discord(Bot.auth.discord.token)
  Bot.discord.client.connect()

  Bot.discord.client.on('ready', function (evt) {
    Bot.dbg.DeBug('info', 'discord', 'Logged in as: ' + Bot.discord.client.user.username + ' - (' + Bot.discord.client.user.id + ')')
    // You can set the activity to any of the following:
    // 0 PLAYING, 1 STREAMING, 2 LISTENING, 3 WATCHING
    Bot.discord.client.editStatus('online', { 'name': 'with bugs', 'type': 0 })
  })
  Bot.discord.client.on('messageCreate', message => { Bot.cmd.process('discord', message, message.channel, message.author) })

  Bot.dbg.DeBug('info', 'DralithBot', 'Loaded Discord object')
}
