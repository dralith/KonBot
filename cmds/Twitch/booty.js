module.exports = {
  name: 'booty',
  description: 'Spread the love, grab that booty!',
  verbs: ['slaps', 'touches', 'grabs', 'pokes', 'smacks'],
  execute (channel, user, message, args, Bot) {
    this.randVerb = this.verbs[Math.floor(Math.random() * this.verbs.length - 1)]
    this.idx = Bot.twitch.random_viewer()
    this.viewer = this.idx
    if (this.idx.length) {
      if (this.idx['display-name']) {
        this.viewer = this.idx['display-name']
      }
    }
    return `@${user} ${this.randVerb} @${this.viewer}'s booty! (つ ◕_◕ )つ (‿ˠ‿)`
  }
}
