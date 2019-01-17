module.exports = {
  name: 'savage',
  description: 'You\'ll figure it out',
  // validUsers: ['Dralith'],
  cooldown: 10,
  execute (channel, user, message, args, Bot) {
    let col1 = ['lazy', 'stupid', 'insecure', 'idiotic', 'slimy', 'slutty', 'smelly', 'pompous', 'communist', 'dicknose', 'pie-eating', 'elitist', 'white trash', 'drug-loving', 'butterface', 'tone deaf', 'ugly', 'creepy']
    let col2 = ['douche', 'ass', 'turd', 'rectum', 'butt', 'cock', 'shit', 'crotch', 'bitch', 'prick', 'slut', 'taint', 'fuck', 'dick', 'boner', 'shart', 'nut', 'sphincter']
    let col3 = ['pilot', 'canoe', 'captain', 'pirate', 'hammer', 'knob', 'box', 'jockey', 'waffle', 'goblin', 'blossum', 'biscuit', 'clown', 'socket', 'monster', 'hound', 'dragon', 'balloon']
    let insult = col1[Math.floor(Math.random() * (col1.length - 1))] + ' ' + col2[Math.floor(Math.random() * (col2.length - 1))] + ' ' + col3[Math.floor(Math.random() * (col3.length - 1))]
    let target = ''
    if (args.length >= 1) {
      target = args[0]
    } else {
      target = Bot.twitch.random_viewer()
    }
    if (this.target.startsWith('@')) {
      target = target.substring(1)
    }
    return user + ' thinks ' + target + ' is ' + getArticle(insult) + ' ' + insult
  }
}

function getArticle (str) {
  if (['a', 'e', 'i', 'o', 'u'].indexOf(str.substring(0, 1)) > -1) {
    return 'an'
  } else {
    return 'a'
  }
}
