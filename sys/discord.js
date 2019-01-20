var Bot

function discordReady (evt) {
  Bot.dbg.DeBug('info', 'discord', 'Logged in as: ' + Bot.discord.user.username + ' - (' + Bot.discord.user.id + ')')
  // You can set the activity to any of the following:
  // 0 PLAYING, 1 STREAMING, 2 LISTENING, 3 WATCHING
  Bot.discord.editStatus('online', { 'name': 'with bugs', 'type': 0 })
}

exports.create = (bot) => {
  Bot = bot
  var Discord = require('eris')
  Bot.discord = new Discord(Bot.auth.discord.token)
  Bot.discord.connect()

  Bot.discord.on('ready', discordReady)
  Bot.discord.on('messageCreate', message => { Bot.cmd.process('discord', message, message.channel, message.author) })

  Bot.discord.destruct = () => {
    Bot.discord.disconnect()
    Bot.discord.removeListener('ready', discordReady)
    Bot.discord.removeListener('messageCreate', message => {})
    Bot.discord = null
  }

  Bot.dbg.DeBug('info', 'KonBot', 'Init Discord object')
}
