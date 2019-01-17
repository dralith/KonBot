module.exports = {
  name: 'say',
  description: 'Simon says!',
  execute (channel, user, message, args) {
    return args.join(' ')
  }
}
