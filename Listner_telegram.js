const GameBoyzColorClubTestFinal = require('./GameBoyzColorClubTestFinal.json');
const ethers = require("ethers");

const { Telegraf } = require('telegraf')
const bot = new Telegraf('5784113612:AAFZoQz7aBDYvNrdNL86mfRBtA-Ggo7e4p4')
const path = require('path')
const https = require('https');
const delay = ms => new Promise(res => setTimeout(res, ms));

async function main() {
  const address = "";
  Value = 0;
  const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
  const contract = new ethers.Contract(address, GameBoyzColorClubTestFinal, provider);
  const hexToDecimal = hex => parseInt(hex, 16);
  //accorcia stringa
  function truncate(str, n) {
    return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
  };
  
  bot.use()
  chatId = "-1001785256396";

  Reveal = true;
  console.log("ok");

  async function checkReveal() {
    promise = await contract.viewRevealed();
    console.log(promise);
    return promise;
  }
  async function checkMinted() {
    minted_hex = await contract.totalSupply();
    minted_hex= minted_hex._hex;
    minted = hexToDecimal(minted_hex);
    console.log(minted);
    return minted;
  }

/////////INFO/////////
//Holders
bot.command('owners',(ctx) => {
  ctx.reply("📜Owners: 0".bold() +"\nMint not started yet! \n", {
    reply_to_message_id: ctx.message.message_id,parse_mode: 'HTML'
  })
})

//Minted
bot.command('minted',(ctx) => {
  ctx.reply("Mints: 0".bold() +"\nMint not started yet! \n", {
    reply_to_message_id: ctx.message.message_id,parse_mode: 'HTML'
  })
})




bot.command('links',(ctx) => {
  

  ctx.reply('🔗 \n'.bold()+
  
  'Twitter: '.bold()+ "https://twitter.com/GBCCNFT"+"\n"+
  
  'Website: '.bold()+ "Really Soon."+"\n"+
  'Contract: '.bold()+ "Not yet release!"+"\n"+
  'Marketplace: '.bold()+ "Not yet release!"+"\n"
  
  , {
    reply_to_message_id: ctx.message.message_id,parse_mode: 'HTML', reply_markup: {
      inline_keyboard: [
        [
          { text: "Follow us of Twitter", url: "https://twitter.com/GBCCNFT" },
        ]

      ]
    }
  })
})


//Game
bot.command('games',async(ctx) => {
    ctx.reply("There are no active game right now.".bold(), {
      reply_to_message_id: ctx.message.message_id,parse_mode: 'HTML', reply_markup: {
        inline_keyboard: [
          [
            { text: "Follow us of Twitter", url: "https://twitter.com/GBCCNFT" },
          ]
  
        ]
      }
    })
  })

//Info
bot.command('info',(ctx) => {
  ctx.reply("Game Boyz Color Club is a private collection of 2222 NFTs-unique digital collectibles. The GameBoyz are stored as ERC-721 tokens on the Binance Smart Chain. \n".bold()+"Each NFT will allow you to participate in our fantastic community, with access to special privileges such as games, reward systems, early access to future projects and collections from our ecosystem.".italics(), {
    reply_to_message_id: ctx.message.message_id,parse_mode: 'HTML', reply_markup: {
      inline_keyboard: [
        [
          { text: "Follow us of Twitter", url: "https://twitter.com/GBCCNFT" },
        ]

      ]
    }
  })
})

//Help
bot.command('help',(ctx) => {

  ctx.reply(
  //Base commands:
  "List of active commands:\n\n".bold()
  +"/info: Know more about the project.\n"
  +"/links: Shows GBCC official links.\n"
  +"/games: Shows ongoing games and contests.\n"
  //Advanced commands when mint starts
  +"/owners: Shows the number of owners.\n"
  +"/minted: Shows the number of GBCC minted.\n"
  ,{reply_to_message_id: ctx.message.message_id,parse_mode: 'HTML'});
})








  bot.launch()

}

main();