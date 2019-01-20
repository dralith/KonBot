var Bot, prefix
var cooldowns = new Map()

function dispatch (type, channel, message) {
  if (type === 'twitch') Bot.twitch._sendMessage(channel, message)
  if (type === 'discord') Bot.discord.createMessage(channel.id, message)
}

exports.create = (bot) => {
  if (!bot) return
  Bot = bot
  prefix = Bot.cfg.cmd_prefix

  Bot.twitch.commands = new Map()
  Bot.discord.commands = new Map()

  let cmddir = ['Discord', 'Twitch', 'Shared']
  let fs = require('fs')
  for (const dir of cmddir) {
    let cmdFiles = fs.readdirSync('./cmds/' + dir).filter(file => file.endsWith('.js'))
    for (let file of cmdFiles) {
      const command = require('../cmds/' + dir + '/' + file)
      if (dir === 'Shared' || dir === 'Twitch') Bot.twitch.commands.set(command.name, command)
      if (dir === 'Shared' || dir === 'Discord') Bot.discord.commands.set(command.name, command)
    }
  }

  Bot.dbg.DeBug('info', 'KonBot', 'Init Command object')
}

exports.destruct = () => {
  Bot.twitch.commands = null
  Bot.discord.commands = null
}

exports.process = (type, message, channel, user, self) => {
  let msg = (type === 'discord' ? message.content : message)
  let cname = (type === 'discord' ? channel.name : channel)
  let args = msg.slice(prefix.length).split(/ +/)
  let commandName = args.shift().toLowerCase()
  let uname = (type === 'discord' ? (message.member.nick ? message.member.nick : user.username) : user['display-name'])
  let userid = (type === 'discord' ? user.id : user['user-id'])

  if (type === 'discord') {
    Bot.dbg.DeBug('', message.member.guild.name, uname + ' <' + cname + '> ' + msg)
  }
  if (!msg.startsWith(prefix) || !user) return

  let tyBot = (type === 'discord' ? Bot.discord : Bot.twitch)
  let aliased

  tyBot.commands.forEach(
    function (v, k, m) {
      if (v.aliases && v.aliases.includes(commandName)) {
        aliased = k
      }
    }
  )

  let command = tyBot.commands.get(aliased || commandName)

  if (!command) return

  if (type === 'discord' && command.guildOnly && message.channel.type !== 0) {
    return dispatch(type, channel, 'I can\'t execute that command inside DMs!')
  }

  if (command.validUsers && command.validUsers.indexOf(uname) === -1) {
    Bot.dbg.DeBug('info', cname, 'Can\'t use that command.')
    return
  }

  if (command.args && !args.length) {
    let reply = 'You didn\'t provide any arguments, ' + message.author + '!'
    if (command.usage) {
      reply += '\nUsage: ' + prefix + '' + command.name + ' ' + command.usage
    }
    return dispatch(type, channel, reply)
  }

  if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Map())
  let now = Date.now()
  let timestamps = cooldowns.get(command.name)
  let cooldownAmount = (command.cooldown || 3) * 1000

  if (timestamps.has(userid)) {
    let expirationTime = timestamps.get(userid) + cooldownAmount

    if (now < expirationTime) {
      let timeLeft = (expirationTime - now) / 1000
      return dispatch(type, channel, 'please wait ' + timeLeft.toFixed(0) + ' more second(s) before reusing the \'' + command.name + '\' command.')
    }
  }
  timestamps.set(userid, now)
  setTimeout(() => timestamps.delete(userid), cooldownAmount)

  try {
    var mesg = command.execute(channel, uname, message, args, Bot)
  } catch (error) {
    Bot.dbg.DeBug('ERROR', cname, error)
  }

  dispatch(type, channel, mesg)
}
