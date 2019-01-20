var Bot
var stdin

function checkCommand (d) { // note:  d is an object
  let input = d.toString().trim()
  if (input.startsWith('/')) {
    Bot.cli.processCommand(input)
  }
}

exports.create = (bot) => {
  Bot = bot
  stdin = process.openStdin() // Initialize CommandLine Input
  stdin.addListener('data', checkCommand)

  Bot.dbg.DeBug('info', 'KonBot', 'Init CommandLine object')
}

exports.destruct = () => {
  Bot = null
  stdin.removeListener('data', checkCommand)
}

exports.processCommand = (arg) => {
  var command
  var args = arg.split(' ')

  command = args[0]
  command = command.substring(1)

  if (args.length > 1) {
    args = args.slice(1)
  }

  if (command === 'config') {
    switch (args[0]) {
      case 'show': // config show [cfg_name]                                     Show a list or specific config data
        // config names: Array.from(Bot.loaded.config.keys())
        break
      case 'load': // config load <cfg_name>                                     Load a config into memory
        break
      case 'reload': // config reload                                              Reload all loaded configs
        break
      default:
        break
    }
  }
  if (command === 'reload') {
    console.log('Hotbooting in 5 seconds!!')
    setTimeout(function () { Bot.hotBoot() }, 5000)
  }
}
