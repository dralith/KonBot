const Bot = () => {}

Bot.loaded = new Map()
Bot.loaded.config = new Map()

Bot.hotBoot = function () {
  let fs = require('fs')
  if (Bot.dbg) { Bot.dbg.destruct() }
  Bot.dbg = require('./sys/debug.js') /*        Load the debugger             */
  if (Bot.db) { Bot.db.destruct() }
  Bot.db = require('./sys/database.js') /*      Load the database             */
  if (Bot.twitch) { Bot.twitch.destruct() }
  Bot.twitch = require('./sys/twitch.js') /*    Load Twitch systems           */
  if (Bot.discord) { Bot.discord.destruct() }
  Bot.discord = require('./sys/discord.js') /*  Load Discord systems          */
  if (Bot.cli) { Bot.cli.destruct() }
  Bot.cli = require('./sys/commandline.js') /*  Load Commandline systems      */
  if (Bot.cmd) { Bot.cmd.destruct() }
  Bot.cmd = require('./sys/commands.js') /*     Load Command system           */
  Bot.dbg.DeBug('info', 'KonBot', 'Loaded all system objects')

  /*                                            Load the configuration files  */
  let cfgFiles = fs.readdirSync('./etc/').filter(file => file.endsWith('.json'))
  for (let file of cfgFiles) {
    let out
    let filename = file.split('.')[0]
    if (filename.startsWith('default-')) {
      let nfile = filename.substring(8)
      if (cfgFiles.indexOf(nfile + '.json') > -1) {
        continue // Custom configuration found
      }
    }

    if (Bot.loaded.config.has(filename)) {
      if (Bot.loaded.config.get(filename)[1] < Date.now() - 10000) {
        out = 'Reloading' // Reload if >10 seconds has passed
      } else {
        out = 'Ignoring' // Don't reload if <10 seconds has passed
      }
    } else {
      out = 'Loading' // Load if it's never been loaded
    }
    Bot.dbg.DeBug('info', 'KonBot', out + ' config from ' + filename)
    if (out !== 'Ignoring') {
      Bot[filename] = require('./etc/' + file)
      Bot.loaded.config.set(filename, [file, Date.now()])
    }
  }

  Bot.db.create(Bot) /*                         Initialize the DB             */
  Bot.twitch.create(Bot) /*                     Initialize the Twitch Bot     */
  Bot.discord.create(Bot) /*                    Initialize the Discord Bot    */
  Bot.cli.create(Bot) /*                        Initialize the Commandline    */
  Bot.cmd.create(Bot) /*                        Initialize the Command system */
}

Bot.hotBoot() /*                                Actually start the bot        */
Bot.StartTime = Date.now() /*                   Set the time the bot started  */
Bot.dbg.DeBug('info', 'KonBot', 'Connecting to Twitch and/or Discord')
