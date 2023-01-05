const GameBoyzColorClubTestFinal = require('./GameBoyzColorClubTestFinal.json');
const ethers = require("ethers");

const { Telegraf } = require('telegraf')
const bot = new Telegraf('5616960766:AAGcx-JZNpUyQr3kIYhHL1WQaF9u9bW7Jwk')
const path = require('path')
const https = require('https');
const delay = ms => new Promise(res => setTimeout(res, ms));

async function main() {
  const address = "0xfee743f7421be57004f3f95792f627b60ed73392";
  Value = 0;
  const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
  const contract = new ethers.Contract(address, GameBoyzColorClubTestFinal, provider);

  //accorcia stringa
  function truncate(str, n) {
    return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
  };
  //



  bot.use()
  chatId = "-674969472";

  Reveal = true;
  console.log("ok");

  async function checkReveal() {
    promise = await contract.viewRevealed();
    console.log(promise);
    return promise;
  }



  bot.command('Photo', async (ctx) => {
    promise = checkReveal();
    promise.then((bool) => {

      Reveal = bool;

      // L'if deve essere dentro il then perchè così li fa in serie e non in parallelo!
      if (Reveal == false) {
        bot.telegram.sendMessage(chatId, "è falso");
      }
      if (Reveal == true) {
        bot.telegram.sendMessage(chatId, "è vero");
      }
    })




  })


  bot.start((ctx) => {

    https.get(filePath, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        try {
          let json = JSON.parse(body);
          console.log(body);
          console.log(Reveal);
          let ArrayJson = body.split('"');
          ipfs = "https://gateway.pinata.cloud/ipfs/QmbESzkHKXPtiFoQXxVGKAmPog5wc95FZcCSCKU2iyxTQj/1.png";
          bot.telegram.sendPhoto(chatId, { url: ipfs }, {
            caption:
              "ciao".link("https://www.google.it"),

            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [
                [
                  { text: "Mint your GBCC HERE", url: "https://www.google.it" }
                ]

              ]
            }
          });

        } catch (error) {
          console.error(error.message);
        };
      });

    }).on("error", (error) => {
      console.error(error.message);
    });
  })
  bot.launch()

  contract.on("Transfer", async (from, to, value, event) => {
    console.log("Wait 40 sec");
    await delay(40000);

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

    https.get(filePath, async (res) => {



      console.log(filePath);
      ////////CHECK REVEAL/////
      promise = checkReveal();

      promise.then((bool) => {

        Reveal = bool;

        // L'if deve essere dentro il then perchè così li fa in serie e non in parallelo!
        if (Reveal == false) {

          var bscScan = truncate(to, 20);
          //NOTIFICA
          bot.telegram.sendPhoto(chatId, { source: "./hidden.png" }, {
            caption:

              "GameBoyzColor Club #".bold() + Value.bold() + "\n" + "has been minted \n\n" + "Minter: ".bold() + bscScan.link('https://testnet.bscscan.com/address/' + to)
            , parse_mode: 'HTML', reply_markup: {
              inline_keyboard: [
                [
                  { text: "Website", url: "https://www.google.it" }
                ]

              ]
            }
          });
        }
        if (Reveal == true) {
          //NOTIFICA MINT TRUE//

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
                dati = ArrayJson[3].bold() + "\n" + "has been minted \n\n" + "Minter: ".bold() + bscScan.link('https://testnet.bscscan.com/address/' + to) + "\n\n" + "Traits:\n".bold() +
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


              //bot.telegram.sendMessage(chatId, output);
            } catch (error) {
              console.error(error.message);
            };
          });
          //FINE NOTIFICA MINT
        }

      })
      //




    }).on("error", (error) => {
      console.error(error.message);
    });



  });
  
}

main();