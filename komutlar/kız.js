const Discord = require("discord.js");
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');


exports.run = async (client, message, args,guild) => {
    let d = ayarlar.prefix
    let kizrolcik = ayarlar.kizrol
    let kizrol2cik = ayarlar.kizrol2 //acebots 
    let yetkili = ayarlar.yetkili
    let kayıtsız = ayarlar.kayıtsız
    let kayıtsayı = db.fetch(`kayıtsayı_${message.author.id}`)
    let genelsohbet1 = ayarlar.genelsohbet
    let kayıtsohbet2 = ayarlar.kayıtsohbet //acebots 

 //acebots 
    if(message.channel.id !== (kayıtsohbet2))
  return message.channel.send(new Discord.MessageEmbed().setDescription(`Bu Komudu Sadece **<#${kayıtsohbet2}>** Adlı Kanalda Kullanabilirsin ! `))

 //acebots 
  
  let acebots = new Discord.MessageEmbed() //acebots 
 .setDescription(`**Bu komudu kullanabilmek için** <@&${yetkili}>  **yetkisine sahip olmalısın!**`)
 .setColor('#ff0000')
 
if (!message.member.roles.cache.get(yetkili))
  return message.channel.send(acebots)  //acebots 

let member = message.mentions.members.first();
  if (!member) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`Kız Olarak Kaydedeceğin Kullanıcıyı Belirtmelisin! \n\n **Örnek Kullanım:** ${d}kız @kullanıcı `))


   member.roles.remove(kayıtsız)
   member.roles.add(kizrolcik)  //acebots 
   member.roles.add(kizrol2cik)
 //acebots 
  
const hypercik = new Discord.MessageEmbed()
  .setDescription(`${member.user} adlı üyenin <@&${kayıtsız}> rolünü alıp <@&${kizrolcik}> ,<@&${kizrol2cik}> rollerini verdim.`)
  .setFooter(`Toplam Kayıt Sayın: ${kayıtsayı ? `${kayıtsayı}` : "0"}`, message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
  .setColor('#b2fae6')
db.add(`kayıtsayı_${message.author.id}`, 1) //acebots 
message.channel.send(hypercik)
  
const hyper = new Discord.MessageEmbed() //acebots 
   .setDescription(`${member.user} adlı üye sunucumuza kayıt oldu. Aramıza Hoşgeldin :) `)  .setColor('#ef61f7')
   client.channels.cache.get(genelsohbet1).send(hyper)};
 //acebots 
exports.conf = {
enabled: true,
guildOnly: true,
aliases: ['k'],
permLevel: 0 //acebots 
};
exports.help = {
name: "kız",
description: "Kız Kayıt",
usage: "prefixkız"
};