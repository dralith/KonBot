var msgArr

module.exports = {
  name: 'special',
  description: 'Tell someone how special they really are',
  validUsers: ['Dralith'],
  ids: [],
  execute (channel, user, message, args, Bot) {
    let target
    if (args.length >= 1) {
      target = args[0]
    } else {
      target = Bot.twitch.random_viewer()
    }
    if (target.startsWith('@')) {
      target = target.substring(1)
    }

    msgArr = ['@' + target + ', you are GREAT!', '..you\'re so FUCKING GREAT', 'what a wonderful motherfucker you are <3',
      'Fuck, I am so proud of you', 'I mean do you have any idea how goddamn special you are?', 'SHIT']

    for (var i = 0; i < msgArr.length; i++) {
      this.ids.push(setTimeout(function (msg) { Bot.twitch.client.say(channel, msg) }, ((i + 1) * 2000), msgArr[i]))
    }
  }
}
