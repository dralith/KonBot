module.exports = {
  name: 'hug',
  description: 'Spread the love, hug someone!',
  execute (channel, user, message, args) {
    if (args[0]) {
      if (/^[a-zA-Z0-9_]{1,25}$/.test(args[0])) {
        return `${user} hugs ${args[0]} <3`
      } else {
        return `${user}, that is not a valid username ariW`
      }
    }
  }
}
