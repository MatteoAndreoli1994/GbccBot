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

  //accorcia stringa
  function truncate(str, n) {
    return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
  };
  
  bot.use()
  chatId = "-1001821596289";

  Reveal = true;
  console.log("ok");

  async function checkReveal() {
    promise = await contract.viewRevealed();
    console.log(promise);
    return promise;
  }

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
                        { text: "Mint your GBCC HERE", url: "https://www.google.it" }
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