const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./Config.json")
const request = require("request");
const db = require("quick.db")
const fs = require("fs")

require("./Channel-Guard/Channel-Guard.js");
require("./Member-Guard/Member-Guard.js");
require("./Role-Guard/Role-Guard.js");
require("./Server-Guard/Server-Guard.js");

require("./Main-2.js");
require("./Main-3.js");

client.on("ready",async () => {
    client.user.setPresence({ activity: { name: config.TümBotlarActivity }, status: config.status });
    client.channels.cache.get(config.voiceChannel).join()
    console.log(`[Guard I] Başarılı Bir Şekile Sese Giriş Yaptı`)
    });
  
  client.login(config.tokenI).then(() => console.log(`[Guard I] ${client.user.tag} olarak giriş yaptı!`)).catch(() => console.log(`[Guard I] Bot giriş yapamadı!`));