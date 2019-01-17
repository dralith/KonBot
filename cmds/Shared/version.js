module.exports = {
  name: 'version',
  description: 'What version is this!',
  aliases: ['v', 'ver'],
  execute (channel, user, message, args, Bot) {
    const keepo = require('../../package.json')
    const lib = require('../../lib/lib.js')
    return `${keepo.name} running at v${keepo.version} for ${lib.msToTimeString(parseInt(Date.now() - Bot.StartTime))}`
  }
}
