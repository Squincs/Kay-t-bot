const Discord = require("discord.js");
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');


exports.run = async (client, message, args, guild) => {//acebots
    
    let d = ayarlar.prefix
    let erkekrolcuk = ayarlar.erkekrol
    let erkekrolcuk2 = ayarlar.erkekrol2
    let yetkili = ayarlar.yetkili
    let kayıtsız = ayarlar.kayıtsız
    let kayıtsayı = db.fetch(`kayıtsayı_${message.author.id}`)
    let genelsohbet1 = ayarlar.genelsohbet
    let kayıtsohbet2 = ayarlar.kayıtsohbet

    if(message.channel.id !== (kayıtsohbet2))//acebots
  return message.channel.send(new Discord.MessageEmbed().setDescription(`Bu Komudu Sadece **<#${kayıtsohbet2}>** Adlı Kanalda Kullanabilirsin ! `)).setColor('#ff0000')



  
  let acebots = new Discord.MessageEmbed()
 .setDescription(`**Bu komudu kullanabilmek için** <@&${yetkili}>  **yetkisine sahip olmalısın!**`).setColor('#ff0000')
 if (!message.member.roles.cache.get(yetkili)) return message.channel.send(acebots) //acebots  
//acebots
let member = message.mentions.members.first();
  if (!member) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`Erkek Olarak Kaydedeceğin Kullanıcıyı Belirtmelisin! \n\n **Örnek Kullanım:** ${d}erkek @kullanıcı `))


   member.roles.remove(kayıtsız)
   member.roles.add(erkekrolcuk) //acebots 
   member.roles.add(erkekrolcuk2)
//acebots
  //acebots
const qmicik = new Discord.MessageEmbed()
  .setDescription(`${member.user} adlı üyenin <@&${kayıtsız}> rolünü alıp <@&${erkekrolcuk}> ,<@&${erkekrolcuk2}> rollerini verdim.`)
  .setFooter(`Toplam Kayıt Sayın: ${kayıtsayı ? `${kayıtsayı}` : "0"}`, message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
  .setColor('#b2fae6')
db.add(`kayıtsayı_${message.author.id}`, 1) //acebots 
message.channel.send(qmicik)
  //acebots
const qmi = new Discord.MessageEmbed()
   .setDescription(`${member.user} adlı üye sunucumuza kayıt oldu. Aramıza Hoşgeldin :) `).setColor('#0e3bfa')
   client.channels.cache.get(genelsohbet1).send(qmi)}; //acebots 
//acebots
exports.conf = {
enabled: true,
guildOnly: true,
aliases: ['e'],
permLevel: 0
};
exports.help = {
name: "erkek",
description: "Erkek Kayıt", //acebots 
usage: "prefix!erkek"
};