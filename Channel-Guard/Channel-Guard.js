const channelg = require("discord.js");
const client = new channelg.Client();
const config = require("../Config.json");

//--------------------------------------- Channel Guard ---------------------------------------\\
 
client.on('channelCreate',async channel => {
    let guild = client.guilds.cache.get(config.ServerID)
    let logger = guild.channels.cache.get(config.EverLog)  
    let member = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
  if (!member || !member.executor || Date.now()-member.createdTimestamp > 5000 || whitelised2(member.executor.id)) return;
  
   Karar2(member.executor.id, "ban");
  
   await channel.delete({reason: `${config.sunucuadı}`}).catch();
  KorumaAc2(config.ServerID);
  
  let Member = guild.member(member.executor.id);
  if(Member && Member.bannable) Member.ban()  
  if(!logger) return client.users.cache.get(config.BotOwner).send(`<@${member.executor.id}> \`${member.executor.id}\` Tarafından ${channel.name} \`${channel.id}\` Kanalı Açıldı Üye ${member.bannable ? 'Banlandı': 'Banlanamadı'}`)
  logger.send(`@everyone <@${member.executor.id}> \`${member.executor.id}\` Tarafından ${channel.name} \`${channel.id}\` Kanalı Açıldı Üye ${member.bannable ? 'Banlandı': 'Banlanamadı'}`)
  })
  
  
  
  client.on('channelUpdate',async (oldChannel , newChannel) => {
  let member = await newChannel.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first());
  if (!member || !member.executor || Date.now()-member.createdTimestamp > 5000 || whitelised2(member.executor.id)) return;
  let guild = client.guilds.cache.get(config.ServerID)
  let logger = guild.channels.cache.get(config.EverLog) 
   Karar2(member.executor.id, "ban");
  KorumaAc2(config.ServerID);
  
  if (newChannel.type !== "category" && newChannel.parentID !== oldChannel.parentID) newChannel.setParent(oldChannel.parentID);
  if (newChannel.type === "category") {
  newChannel.edit({
  name: oldChannel.name,});
  } else if (newChannel.type === "voice") {
  newChannel.edit({
  name: oldChannel.name,
  userLimit: oldChannel.userLimit,
  bitrate: oldChannel.bitrate,
  });
  } else if (newChannel.type === "text") {
  newChannel.edit({
  name: oldChannel.name,
  rateLimitPerUser: oldChannel.rateLimitPerUser,
  nsfw: oldChannel.nsfw,
  topic: oldChannel.topic,
  }); 
  };
  oldChannel.permissionOverwrites.forEach(perm => {
  let thisPermOverwrites = {};
  perm.allow.toArray().forEach(p => {
  thisPermOverwrites[p] = true;
  });
  perm.deny.toArray().forEach(p => {
  thisPermOverwrites[p] = false;
  });
  newChannel.createOverwrite(perm.id, thisPermOverwrites);
  
  let Member = guild.member(member.executor.id);
  if(Member && Member.bannable) Member.ban()  
  if(!logger) return client.users.cache.get(config.BotOwner).send(`<@${member.executor.id}> \`${member.executor.id}\` Tarafından ${newChannel.name} \`${oldChannel.id}\` Kanalı Güncellendi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
  logger.send(`@everyone <@${member.executor.id}> \`${member.executor.id}\` Tarafından ${newChannel.name} \`${oldChannel.id}\` Kanalı Güncellendi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
  });
  })
  
  
  client.on('channelDelete',async channel => {
  let member = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
  if (!member || !member.executor || Date.now()-member.createdTimestamp > 5000 || whitelised2(member.executor.id)) return;
  let guild = client.guilds.cache.get(config.ServerID)
  let logger = guild.channels.cache.get(config.EverLog) 
   Karar2(member.executor.id, "ban");
  await channel.clone({reason: `${config.sunucuadı}`})
  KorumaAc2(config.ServerID);
  
   let Member = guild.member(member.executor.id);
  if(Member && Member.bannable) Member.ban()  
  if(logger) return client.users.cache.get(config.BotOwner).send(`<@${member.executor.id}> \`${member.executor.id}\` Tarafından ${channel.name} \`${channel.id}\` Kanalı Silindi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
  logger.send(`@everyone <@${member.executor.id}> \`${member.executor.id}\` Tarafından ${channel.name} \`${channel.id}\` Kanalı Silindi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
  })
      
      
  function whitelised2(kisiID) {
  let Member = client.guilds.cache.get(config.ServerID).members.cache.get(kisiID);
  let whitelistedmember = config.WhiteList || [];
  if (!Member || Member.id === client.user.id || Member.id === config.BotOwner || Member.id === Member.guild.owner.id || whitelistedmember.some(g => Member.id === g.slice(1) || Member.roles.cache.has(g.slice(1)))) return true
  else return false;
  };
      
  function Karar2(UserID, tur) {
  let uye = client.guilds.cache.get(config.ServerID).members.cache.get(UserID);
  if (!uye) return;
  if (tur == "ban") return uye.ban({ reason: `${config.sunucuadı}` }).catch();
  };
      
  
  function KorumaAc2(ServerID) {
    let sunucu = client.guilds.cache.get(ServerID);
    if (!sunucu) return;
    sunucu.roles.cache.filter(r => r.editable && (r.permissions.has("ADMINISTRATOR") || r.permissions.has("MANAGE_GUILD")|| r.permissions.has("MANAGE_CHANNELS") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_WEBHOOKS"))).forEach(async r => {
      await r.setPermissions(0);
  
    });
  }
    