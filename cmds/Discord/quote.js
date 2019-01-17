module.exports = {
  name: 'quote',
  description: 'Quote database.',
  args: false,
  usage: '[#]',
  guildOnly: true,
  cooldown: 5,
  execute (channel, name, message, args) {
    const quoteList = [
      { 'quote': 'Fuck Uranus', 'by': 'DralithM', 'date': '04/22/2017', 'playing': '' },
      { 'quote': 'and that is why we teabag your frame when playing with you', 'by': 'Skarecrowmoto via Discord', 'date': '04/27/2017', 'playing': '' },
      { 'quote': 'Just the tip eh? Keepo', 'by': 'DralithM via Discord', 'date': '04/27/2017', 'playing': '' },
      { 'quote': 'I found the hole', 'by': 'PenguinTat', 'date': '04/27/2017', 'playing': '' },
      { 'quote': 'I enjoy being fisted to death.', 'by': 'PenguinTat', 'date': '04/27/2017', 'playing': '' },
      { 'quote': 'STOP sucking soooo much', 'by': 'DraltihM to StrawberryTat', 'date': '04/27/2017', 'playing': '' },
      { 'quote': 'it feels weird to call you tatty, because its too close to titty.', 'by': 'Got_woo', 'date': '05/21/2017', 'playing': '' },
      { 'quote': 'If Mcree says it\'s high noon when he ults, does that mean Mesa says it\'s tenno-clock when she uses peacekeeper?', 'by': 'NegativeZer00', 'date': '06/04/2017', 'playing': '' },
      { 'quote': 'Our father who art in random. Entropic be thy name, thy random come, thy generation be done. In warframe as it is in crypto. Give us this day our daily grinds. And forgive those who scam against u, and lead us not into low entropy, but deliver us loot. For thine is random, the grind the rotations, forever. GabeN.', 'by': 'NegativeZer00 via Discord', 'date': '05/16/2017', 'playing': '' },
      { 'quote': 'oh no, are we gonna talk about garnishing my taco LUL', 'by': 'aLlamaReigns', 'date': '06/06/2017', 'playing': 'Taco Tuesday' },
      { 'quote': 'I got an achievement for getting you up', 'by': 'PenguinTat', 'date': '06/09/2017', 'playing': 'Diablo III: Reaper of Souls' },
      { 'quote': 'Oh I found a prism for my dong MiniK', 'by': 'NegativeZer00', 'date': '06/09/2017', 'playing': '' },
      { 'quote': 'Oh looks SlapStickLogic finally got off', 'by': 'Dralith via Discord VC', 'date': '06/18/2017', 'playing': '' },
      { 'quote': '!dongrequest', 'by': 'adelfos_selene', 'date': '07/27/2017', 'playing': 'Warframe' },
      { 'quote': 'I\'ll be back.. I just need to shove meat in my face hole >.>', 'by': 'Dralith', 'date': '08/04/2017', 'playing': '' },
      { 'quote': 'Lephantis and BlAcKsTrIK sitting in a tree.. R.I.P.P.I.N.G.', 'by': 'Dralith', 'date': '08/06/2017', 'playing': 'Warframe' },
      { 'quote': 'Why does it refuse to get smaller!!', 'by': 'mamajojo via Amyra', 'date': '', 'playing': '' },
      { 'quote': 'I Like Holes Being In Places', 'by': 'PenguinTat', 'date': '', 'playing': '' },
      { 'quote': 'Cause I know, secretly you love my anus.', 'by': 'PenguinTat', 'date': '09/02/2017', 'playing': 'Warframe' },
      { 'quote': 'damnit Demo.. Dral already did me... do someone else lol', 'by': 'PenguinTat via Woxli\'s Chat]', 'date': '09/09/2017', 'playing': '' },
      { 'quote': 'Go down? I like going down!', 'by': 'PenguinTat', 'date': '09/14/2017', 'playing': 'Ori and the Blind Forest' },
      { 'quote': 'How deep does this go', 'by': 'Demogarose', 'date': '10/11/2017', 'playing': 'Diablo III: Reaper of Souls' },
      { 'quote': 'The dead bodies are WORTH IT!', 'by': 'PenguinTat', 'date': '11/16/2017', 'playing': 'Diablo III: Reaper of Souls' },
      { 'quote': 'When in doubt, go down on everything!', 'by': 'Ralmet', 'date': '12/03/2017', 'playing': 'The Elder Scrolls Online' },
      { 'quote': 'you\'ll have your turn with my wife', 'by': 'ShadowFox7471', 'date': '12/04/2017', 'playing': 'Chair Stream' },
      { 'quote': 'I love me some iron fist', 'by': 'WoxLi', 'date': '12/29/2017', 'playing': 'Diablo III: Reaper of Souls' },
      { 'quote': 'I fisted all of yall', 'by': 'FrosticNite', 'date': '02/06/2018', 'playing': 'Brawlhalla' },
      { 'quote': 'I like my coffee like I like my men... White................ and weak', 'by': 'PenguinTat', 'date': '2/11/2018', 'playing': '' },
      { 'quote': 'My bush, Best bush!', 'by': 'PenguinTat', 'date': '03/17/2019', 'playing': 'Fortnite' },
      { 'quote': 'oh, yeah. gimme dat ass.', 'by': 'WistfulWriter26', 'date': '04/29/2018', 'playing': '' },
      { 'quote': 'Alex u cant be smacking me when I\'m whipping ppl to submission', 'by': 'FrosticNite', 'date': '04/29/2018', 'playing': '' },
      { 'quote': 'More chest. My mind said boobs', 'by': 'WistfulWriter26', 'date': '05/13/2018', 'playing': '' },
      { 'quote': 'I could do a load more on Uranus', 'by': 'Alex', 'date': '05/15/2018', 'playing': 'Warframe' },
      { 'quote': 'Yep, you heard it here folks.. Jojo got stuck in Uranus', 'by': 'Dralith', 'date': '05/15/2018', 'playing': 'Warframe' },
      { 'quote': 'Don\'t quote me please.', 'by': 'PenguinTat', 'date': '05/16/2018', 'playing': 'Warframe' },
      { 'quote': 'Sherpa keeps everyone up.. he\'s the viagra of twitch', 'by': 'Dralith', 'date': '05/16/2018', 'playing': 'Warframe' },
      { 'quote': 'I get stuck in every hole.', 'by': 'BlackStrik', 'date': '05/21/2018', 'playing': 'Destiny 2' },
      { 'quote': 'Were all gona talk about the fact he has raw nuts in his mouth', 'by': 'penguintat', 'date': '05/21/2018', 'playing': 'Destiny 2' },
      { 'quote': 'Nice tip of the beef you got there', 'by': 'WistfulWriter26', 'date': '05/21/2018', 'playing': 'Destiny 2' },
      { 'quote': 'Why is my butt so exciting?', 'by': 'WistfulWriter26', 'date': '05/26/2018', 'playing': 'Destiny 2' },
      { 'quote': 'Let me get inside you', 'by': 'penguintat', 'date': '05/31/2018', 'playing': 'Dauntless' },
      { 'quote': 'Does justice rain from your ass?', 'by': 'Dralith', 'date': '05/31/2018', 'playing': 'Dauntless' },
      { 'quote': 'you seem off to a rocky start', 'by': 'WistfulWriter26', 'date': '05/31/2018', 'playing': 'Dauntless' },
      { 'quote': 'I went for a 3 hour ride and came back panting', 'by': 'AlexTheGrate98 via VC', 'date': '06/05/2018', 'playing': 'Stardew Valley' },
      { 'quote': '8+++++++++++++++++++++++++++++++================================================D My dick starts at my spine', 'by': 'ariamisake', 'date': '06/17/2018', 'playing': 'Borderlands 2' },
      { 'quote': 'Just pull it out in front of everyone!', 'by': 'penguintat', 'date': '', 'playing': '' },
      { 'quote': 'For fun? I heard you liked a good hammerin', 'by': 'Dralith', 'date': '07/05/2018', 'playing': 'World of Warcraft' },
      { 'quote': 'Son of a Dick!', 'by': 'penguintat', 'date': '07/06/2018', 'playing': 'Warframe' },
      { 'quote': 'I just don\'t make him come enough, I\'m sorry', 'by': 'penguintat', 'date': '07/08/2018', 'playing': 'Warframe' },
      { 'quote': 'phone sex doesn\'t satisfy anyone anymore.. phones are too small', 'by': 'Dralith', 'date': '07/10/2018', 'playing': 'Warframe' },
      { 'quote': 'Curse you! Go in the hole!', 'by': 'penguintat', 'date': '07/13/2018', 'playing': 'Warframe' },
      { 'quote': 'I Flashed them both so well they decided not to leave.', 'by': 'penguintat', 'date': '08/26/2018', 'playing': 'Monster Hunter World' },
      { 'quote': 'I\'m still working my way around the hole.', 'by': 'penguintat', 'date': '09/10/2018', 'playing': 'Marbles on Stream' },
      { 'quote': 'I\'ll play with anyone\'s balls', 'by': 'ShadowFox7471', 'date': '10/09/2018', 'playing': 'Marbles on Stream' },
      { 'quote': 'Going deep is fun', 'by': 'WistfulWriter26', 'date': '10/14/2018', 'playing': 'Marbles on Stream' },
      { 'quote': 'I prefer naked everything.', 'by': 'penguintat', 'date': '10/15/2018', 'playing': 'MapleStory 2' },
      { 'quote': 'It was white, in my mouth and I can\'t swallow it', 'by': 'penguintat', 'date': '11/20/2018', 'playing': 'Destiny 2' },
      { 'quote': 'Wisty is a dessert I would eat all night long', 'by': 'penguintat via Discord', 'date': '12/20/2018', 'playing': '' },
      { 'quote': 'I\'m an adult!', 'by': 'penguintat', 'date': '12/25/2018', 'playing': 'Makers & Crafting' }
    ]
    let qid = Math.floor((Math.random() * quoteList.length))
    let quoteob = ''
    if (args.length < 1) {
      quoteob = quoteList[qid]
    } else if ((qid = parseInt(args[0])) < quoteList.length) {
      quoteob = quoteList[parseInt(args[0])]
    }
    // console.log(quoteob);
    return 'Quote #' + qid + ': ' + quoteob.quote + ' -' + quoteob.by + ' [' + quoteob.playing + '] [' + quoteob.date + ']'
  }
}
