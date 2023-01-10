const GameBoyzColorClubTestFinal = require('./GameBoyzColorClubTestFinal.json');
const ethers = require("ethers");

const { Telegraf } = require('telegraf')
const bot = new Telegraf('5784113612:AAFZoQz7aBDYvNrdNL86mfRBtA-Ggo7e4p4')
const path = require('path')
const https = require('https');
const delay = ms => new Promise(res => setTimeout(res, ms));

async function main() {
  const address = "0x762C566e21B65E9377CC4FC45D91A24530308bd8";
  Value = 0;
  const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
  const contract = new ethers.Contract(address, GameBoyzColorClubTestFinal, provider);
  const hexToDecimal = hex => parseInt(hex, 16);
  //accorcia stringa
  function truncate(str, n) {
    return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
  };
  
  bot.use()
  chatId = "-1001868729774";

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
bot.command('owner',async(ctx) => {
  minted= await checkMinted();
  holders=[];
  indirizzi=[];
  output=[];
  for(i=1;i<minted;i++){
    holders[i]= contract.ownerOf(i);
  }

  console.log("Wait 10 sec");
  await delay(10000);

  for(i=1;i<minted;i++){
     output[i] = await holders[i].then((result) => indirizzi=result);
  }
 
 uniqueArray = output.filter(function(item, pos) {
  return output.indexOf(item) == pos;
  })

  console.log(uniqueArray);
  ctx.reply("📜Game Boyz Colors Club Owners: ".bold()+uniqueArray.length+"\n"
  
  , {
    reply_to_message_id: ctx.message.message_id,parse_mode: 'HTML', reply_markup: {
      inline_keyboard: [
        [
          { text: "Mint yours!", url: "https://gameboyzcolorclub.netlify.app" },
        ]

      ]
    }
  })

})

//Minted
bot.command('minted',async(ctx) => {
minted= await checkMinted();
  ctx.reply("Game Boyz Color Club Minted: ".bold()+minted
  
  , {
    reply_to_message_id: ctx.message.message_id,parse_mode: 'HTML', reply_markup: {
      inline_keyboard: [
        [
          { text: "Mint yours!", url: "https://gameboyzcolorclub.netlify.app" },
        ]

      ]
    }
  })
})


bot.command('links',(ctx) => {
  

  ctx.reply('🔗 \n'.bold()+"\n", {
    reply_to_message_id: ctx.message.message_id,parse_mode: 'HTML', reply_markup: {
      inline_keyboard: [
        [
          { text: "Twitter", url: "https://twitter.com/GBCCNFT" },
          { text: "Website", url: "https://gameboyzcolorclub.netlify.app" },
          { text: "Bscscan", url: "https://testnet.bscscan.com/address/0x762c566e21b65e9377cc4fc45d91a24530308bd8#writeContract" }
        ]

      ]
    }
  })
})

//Website
bot.command('website',(ctx) => {
  ctx.reply("🌐 \n".bold(), {
    reply_to_message_id: ctx.message.message_id,parse_mode: 'HTML', reply_markup: {
      inline_keyboard: [
        [
          { text: "GBCC Website", url: "https://gameboyzcolorclub.netlify.app" },
        ]

      ]
    }
  })
})

//Info
bot.command('info',(ctx) => {
  ctx.reply("Game Boyz Color Club is a private collection of 2222 NFTs-unique digital collectibles. The GameBoyz are stored as ERC-721 tokens on the Binance Smart Chain and hosted on IPFS.\n".bold()+"Each nft will grant you to partecipate in more than 10+ telegram and web-game everyday with lots of juicy prizes!".italics(), {
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
  ctx.reply("List of commands:\n\n".bold()
  +"/links: works!\n"
  +"/website: works!\n"
  +"/show {id}: works!\n"
  +"/info: works!\n"
  +"/holders: to do!\n"
  +"/minted: to do!\n"
  ,{reply_to_message_id: ctx.message.message_id,parse_mode: 'HTML'});
})





////////SHOW NFT//////
bot.command('show',(ctx) => {
  text= ctx.message.text;
  id_tmp = text.split(' ');
  id= id_tmp[1];
  console.log(id);
  
  filePath = "https://fra1.digitaloceanspaces.com/gbccdbtest/fake-token/public/metadata/"+id+".json";
  
  
    https.get(filePath, (res) => {

      console.log(filePath);
      ////////CHECK REVEAL/////
      promise = checkReveal();
      promise.then((bool) => {

        Reveal = bool
      
        //SHOW ONLY IF REVEAL AVVENUTO
        if (Reveal == true) {
            let body = "";

            res.on("data", (chunk) => {
              body += chunk;
            });
            res.on("end", async() => {
              try {
                let json = JSON.parse(body);
                console.log(body);
                
                  //info
                  let ArrayJson = body.split('"');
                  let ipfs = ArrayJson[11];
                  
                  owner = await contract.ownerOf(id);
                  
                  
                  dati = "👁‍🗨"+ArrayJson[3].bold()  + "\n\nOwner: ".bold() + owner.link('https://testnet.bscscan.com/address/' + owner) + "\n\n" + "Traits:\n".bold() +
                    "\nBackground: ".bold() + ArrayJson[29].italics() +
                    "\nBody: ".bold() + ArrayJson[37].italics() +
                    "\nEyes: ".bold() + ArrayJson[45].italics() +
                    "\nAccesories: ".bold() + ArrayJson[53].italics() +
                    "\nHand detail: ".bold() + ArrayJson[61].italics();
                  
                  
                    bot.telegram.sendPhoto(chatId, { url: ipfs }, {
                
                    caption: dati, parse_mode: 'HTML', reply_markup: {
                      inline_keyboard: [
                        [
                          { text: "Mint your GBCC HERE", url: "https://www.google.it" }
                        ]

                      ]
                    },reply_to_message_id: ctx.message.message_id
                  });
                

              } catch (error) {
                console.error(error.message);
              };
            });
            
        }
      })
    
    }).on("error", (error) => {
      console.error(error.message);
      });
  
})


  bot.launch()
  /////////////////////NOTIFICHE MINT/////////////////
  contract.on("Transfer", async (from, to, value, event) => {
    console.log("Wait 30 sec");
    await delay(30000);

    let info = {
      from: from,
      to: to,
      value: ethers.utils.formatUnits(value, 6),
      data: event,
    };
    console.log(info.value * 1000000);
    Value = (info.value * 1000000).toString();
    console.log(Value);
    hiddenMetadata = "";


    output = "";
    filePath = "https://fra1.digitaloceanspaces.com/gbccdbtest/fake-token/public/metadata/" + Value + ".json";

    https.get(filePath, (res) => {



      console.log(filePath);
      ////////CHECK REVEAL/////
      promise = checkReveal();

    promise.then((bool) => {

        Reveal = bool
      

      //NOTIFICA NO REVEAL
      if (Reveal == false) {
        try {
          if (from == "0x0000000000000000000000000000000000000000") {
          var bscScan = truncate(to, 20);

          bot.telegram.sendPhoto(chatId, { source: "./hidden.png" }, {
            caption:

            "🌏"+"GameBoyColor Club #".bold() + value + "\n" + "has been minted \n\n" + "Minter: ".bold() + bscScan.link('https://testnet.bscscan.com/address/' + to)
            , parse_mode: 'HTML', reply_markup: {
              inline_keyboard: [
                [
                  { text: "Website", url: "https://www.google.it" }
                ]

              ]
            }
          });
          
          }
        } catch (error) {
          console.error(error.message);
        };
      }
      //NOTIFICA REVEAL AVVENUTO
      if (Reveal == true) {
        

          let body = "";

          res.on("data", (chunk) => {
            body += chunk;
          });
          res.on("end", () => {
            try {
              let json = JSON.parse(body);
              console.log(body);

              if (from == "0x0000000000000000000000000000000000000000") {

                //info
                let ArrayJson = body.split('"');
                var bscScan = truncate(to, 20);
                dati = "🌏"+ArrayJson[3].bold() + "\n" + "has been minted \n\n" + "Minter: ".bold() + bscScan.link('https://testnet.bscscan.com/address/' + to) + "\n\n" + "Traits:\n".bold() +
                  "\nBackground: ".bold() + ArrayJson[29].italics() +
                  "\nBody: ".bold() + ArrayJson[37].italics() +
                  "\nEyes: ".bold() + ArrayJson[45].italics() +
                  "\nAccesories: ".bold() + ArrayJson[53].italics() +
                  "\nHand detail: ".bold() + ArrayJson[61].italics();

                ipfs = "https://fra1.digitaloceanspaces.com/gbccdbtest/fake-token/public/assets/" + value + ".png";

                bot.telegram.sendPhoto(chatId, { url: ipfs }, {
                  caption: dati, parse_mode: 'HTML', reply_markup: {
                    inline_keyboard: [
                      [
                        { text: "Mint your GBCC HERE", url: "https://gameboyzcolorclub.netlify.app" }
                      ]

                    ]
                  }
                });
                //}
              }

            } catch (error) {
              console.error(error.message);
            };
          });
          
      }
      
    })
    




  }).on("error", (error) => {
      console.error(error.message);
    });
    //


  });
  /////////////////////NOTIFICHE MINT: END/////////////////

}

main();