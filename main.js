const Bot = () => {
  let fs = require('fs')
  /*                                            Load the configuration files  */
  let cfgFiles = fs.readdirSync('./etc/').filter(file => file.endsWith('.json'))
  Bot.loaded = new Map()
  Bot.loaded.config = new Map()
  for (let file of cfgFiles) {
    let filename = file.split('.')[0]
    Bot[filename] = require('./etc/' + file)
    Bot.loaded.config.set(filename, [file, Date.now()])
  }

  Bot.dbg = require('./sys/debug.js') /*        Load the debugger             */
  Bot.db = require('./sys/database.js') /*      Load the database             */
  Bot.twitch = require('./sys/twitch.js') /*    Load Twitch systems           */
  Bot.discord = require('./sys/discord.js') /*  Load Discord systems          */
  Bot.cli = require('./sys/commandline.js') /*  Load Commandline systems      */
  Bot.cmd = require('./sys/commands.js') /*     Load Command system           */

  Bot.db.create(Bot) /*                         Initialize the DB             */
  Bot.twitch.create(Bot) /*                     Initialize the Twitch Bot     */
  Bot.discord.create(Bot) /*                    Initialize the Discord Bot    */
  Bot.cli.create(Bot) /*                        Initialize the Commandline    */
  Bot.cmd.create(Bot) /*                        Initialize the Command system */
}

Bot() /*                                        Actually start the bot        */
Bot.StartTime = Date.now() /*                   Set the time the bot started  */
