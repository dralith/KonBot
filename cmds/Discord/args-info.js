module.exports = {
  name: 'args-info',
  description: 'Information about the arguments provided.',
  args: true,
  usage: '<args>',
  // guildOnly: true;
  // cooldown: 5;
  execute (channel, name, message, args) {
    if (args[0] === 'foo') {
      return 'bar'
    }

    return `Arguments: ${args}\nArguments length: ${args.length}`
  }
}
