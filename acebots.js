const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "7/24 AKTİF TUTMA İŞLEMİ BAŞARILI");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
/////////////////////////////////////////////////TAG ALANA ROL////////////////////////////////////////////////////

client.on("userUpdate", async (oldUser, newUser) => { //acebots 
  if (oldUser.username !== newUser.username) {
  //acebots
          let tag = ayarlar.tag
          let sunucu = ayarlar.sunucu
          let kanal = ayarlar.tagkanal//acebots //acebots 
          let rol = ayarlar.tagrol

          

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("#00ff51").setDescription(`<a:basarili:757851040346538084> ${newUser} \`${tag}\` Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);  
  }//acebots
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("#ff0000").setDescription(`<a:basarisiz:757851005483221022> ${newUser} \`${tag}\` Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);//acebots
  } //acebots 
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
} //acebots 
});
/////////////////////////////////////////////////TAG ALANA ROL////////////////////////////////////////////////////


client.on("guildMemberAdd", member => {
      let yetkili = ayarlar.yetkili
          let kayıtsohbet2 = ayarlar.kayıtsohbet //acebots 


  let guild = member.guild;

  const channel = member.guild.channels.cache.find(channel => channel.id === (kayıtsohbet2)); /// Kayıt Kanalı Adı
 let aylartoplam = {
    "01": "Ocak",
        "02": "Şubat",
        "03": "Mart",
        "04": "Nisan",
        "05": "Mayıs", //acebots 
        "06": "Haziran",
        "07": "Temmuz",
        "08": "Ağustos",//acebots
        "09": "Eylül", //acebots 
        "10": "Ekim",
        "11": "Kasım",
        "12": "Aralık"
  }
 let aylar = aylartoplam 

let user = client.users.cache.get(member.id);
require("moment-duration-format"); //acebots 

   const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment.duration(kurulus).format("D")   
   var kontrol = [];

if(gün < 7) {
 kontrol = '**Şüpheli**' 
} if(gün > 7) {//acebots
kontrol = '**Güvenilir**' 
} 
let kanal = ayarlar.kayıtsohbet //acebots 
 if(!kanal) return;
  
    const embed = new Discord.MessageEmbed()
    .setColor('36393F')
    .setThumbnail(user.avatarURL({ dynamic: true, format: 'gif', format: 'png', format: 'jpg', size: 2048}))
    .setDescription(`${member.user}, seninle beraber **${guild.memberCount}** kişi olduk! \n\nKaydının yapılması için  ve **İsim ve Yaş** yazmalısın. \n\nHesap Kuruluş: **${moment(user.createdAt).format('DD')} ${aylar[moment(user.createdAt).format('MM')]} ${moment(user.createdAt).format('YYYY HH:mm:ss')}** \n\nHesabın: ${kontrol} \n\nKayıt yetkilileri seninle ilgilenecektir.`)
    client.channels.cache.get(kanal).send(`<@&${yetkili}>, ${member.user}`) //acebots 
client.channels.cache.get(kanal).send(embed)


});

////////////////////////////////////////////////////////////BOTU ODAYA SOKAR////////////////////////////////////////////////////
client.on("ready", () => {
  let odayagir = ayarlar.odayagir
  client.channels.cache.get(odayagir).join();
  });    

//////////////////////////////////////////////////////////OTO ROL//////////////////////////////////////////////////////////////

client.on("guildMemberAdd", member => {
  let kayıtsızcık = ayarlar.kayıtsız //acebots 
    member.roles.add(kayıtsızcık); 
});

 //acebots 
/////////////////////////////////////////////////////////////////YASAKLI TAG//////////////////////////////////////////////////////////
client.on("guildMemberAdd", member => {
  let tag = ayarlar.yasaklıtag
  let kayıtsızcık = ayarlar.kayıtsız //acebots 
  let cezalıcık = ayarlar.cezalı

if(member.user.username.includes(tag)){ //acebots 
member.roles.add(cezalıcık)
member.roles.remove(kayıtsızcık)
member.send( ` \`${member.guild.name}\` adlı **sunucuda __yasaklı tag__ kullandığınız için __Cezalı__ rolünü aldınız!**`)
} //acebots
})

/////////////////////////////

client.on("guildMemberAdd", async member => { //acebots 
  let isim = db.fetch(`otoisim_${member.guild.id}`)
if (!isim) return; //acebots 
member.setNickname(isim)
});