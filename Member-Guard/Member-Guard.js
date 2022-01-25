const memberg = require("discord.js");
const client = new memberg.Client();
const config = require("../Config.json");

//--------------------------------------- Member Guard ---------------------------------------\\

client.on("guildMemberAdd", async member => {
    let guild = client.guilds.cache.get(config.ServerID)
    let logger = guild.channels.cache.get(config.EverLog) 
    let yapan = await member.guild.fetchAuditLogs({type: 'BOT_ADD'}).then(audit => audit.entries.first());
    if (!member.user.bot || !yapan || !yapan.executor || Date.now()-yapan.createdTimestamp > 5000 || whitelised4(yapan.executor.id)) return;
    Karar4(yapan.executor.id, "ban");
    KorumaAc4(config.ServerID);
    Karar4(member.id, "ban");
    let Member = guild.member(yapan.executor.id);
    if(Member && Member.bannable) Member.ban()  
    if(!logger) return client.users.cache.get(config.BotOwner).send(`<@${yapan.executor.id}> \`${yapan.executor.id}\` Tarafından <@${member.id}> \`${member.id}\` Botu Sunucuya Eklendi! Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
    logger.send(`@everyone <@${yapan.executor.id}> \`${yapan.executor.id}\` Tarafından <@${member.id}> \`${member.id}\` Botu Sunucuya Eklendi! Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
    })
    
    client.on('guildMemberRemove',async member => {
    let guild = client.guilds.cache.get(config.ServerID)
    let logger = guild.channels.cache.get(config.EverLog)
    let yapan = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first());
    if (!yapan || !yapan.executor || Date.now()-yapan.createdTimestamp > 5000 || whitelised4(yapan.executor.id)) return;
    Karar4(yapan.executor.id, "ban" )
    KorumaAc4(config.ServerID);
    let Member = guild.member(yapan.executor.id);
    if(Member && Member.bannable) Member.ban()  
    if(!logger) return client.users.cache.get(config.BotOwner).send(`<@${yapan.executor.id}> \`${yapan.executor.id}> Tarafından <@${member.id}> \`${member.id}\` Üyesi Sağ Tık Kicklendi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
    logger.send(`@here <@${yapan.executor.id}> \`${yapan.executor.id}>\` Tarafından <@${member.id}> \`${member.id}\` Üyesi Sağ Tık Kicklendi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
    })
    
    client.on('guildBanAdd',async member => {
    let guild = client.guilds.cache.get(config.ServerID)
    let logger = guild.channels.cache.get(config.EverLog) 
    let yapan = await member.guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());
    if (!yapan || !yapan.executor || Date.now()-yapan.createdTimestamp > 5000 || whitelised4(yapan.executor.id)) return; 
    Karar4(yapan.executor.id, 'ban');
    KorumaAc4(config.ServerID);
    member.guilds.unban(member.id, `${config.sunucuadı}`)
    let Member = guild.member(yapan.executor.id);
    if(Member && Member.bannable) Member.ban()  
    if(!logger) return client.users.cache.get(config.BotOwner).send(`<@${yapan.executor.id}> \`${yapan.executor.id}\` Tarafından <@${member.id}> \`${member.id}\` Üyesi Sağ Tık Banlandı Yapan ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
    logger.send(`@here <@${yapan.executor.id}> \`${yapan.executor.id}\` Tarafından <@${member.id}> \`${member.id}\` Üyesi Sağ Tık Banlandı Yapan ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
    })
    
    client.on("webhookUpdate", async channel => {
      let guild = client.guilds.cache.get(config.ServerID)
      let logger = guild.channels.cache.get(config.EverLog) 
      let yapan = await channel.guild.fetchAuditLogs({type: 'WEBHOOK_DELETE'}).then(audit => audit.entries.first());
      if (!yapan || !yapan.executor || Date.now()-yapan.createdTimestamp > 5000 || whitelised4(yapan.executor.id)) return; 
    Karar4(yapan.executor.id, 'ban');
    KorumaAc4(config.ServerID);
    const webhooks = await channel.fetchWebhooks()
    await webhooks.array().forEach(x=>x.delete({reason:"webhookacildi"}).catch())
    let Member = guild.member(yapan.executor.id);
    if(Member && Member.bannable) Member.ban()  
    if(!logger) return client.users.cache.get(config.BotOwner).send(`<@${yapan.executor.id}> \`${yapan.executor.id}\` Tarafından Webhook Silindi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
    logger.send(`@here <@${yapan.executor.id}> \`${yapan.executor.id}\` Tarafından Webhook Silindi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)   
    });
    
    
    
    client.on("webhookUpdate", async channel => {
      let guild = client.guilds.cache.get(config.ServerID)
      let logger = guild.channels.cache.get(config.EverLog) 
      let yapan = await channel.guild.fetchAuditLogs({type: 'WEBHOOK_CREATE'}).then(audit => audit.entries.first());
      if (!yapan || !yapan.executor || Date.now()-yapan.createdTimestamp > 5000 || whitelised4(yapan.executor.id)) return; 
    const webhook = yapan.target;
    Karar4(yapan.executor.id, 'ban').catch(err => { });
    await webhook.delete()  
    Karar4(yapan.executor.id, 'ban').catch(err => { });
    KorumaAc4(config.ServerID);
    let Member = guild.member(yapan.executor.id);
    if(Member && Member.bannable) Member.ban()  
    if(!logger) return client.users.cache.get(config.BotOwner).send(`<@${yapan.executor.id}> \`${yapan.executor.id}\` Tarafından Webhook Açıldı Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
    logger.send(`@here <@${yapan.executor.id}> \`${yapan.executor.id}\` Tarafından Webhook Açıldı Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)   
    });
    
    client.on("emojiDelete", async emoji => {
    const yapan = await emoji.guild.fetchAuditLogs({ type: "EMOJI_DELETE" }).then(audit => audit.entries.first());
    if (!yapan || !yapan.executor || Date.now()-yapan.createdTimestamp > 5000 || whitelised4(yapan.executor.id)) return; 
    let guild = client.guilds.cache.get(config.ServerID)
    let logger = guild.channels.cache.get(config.EverLog) 
    Karar4(yapan.executor.id, 'ban');
    KorumaAc4(config.ServerID)
    emoji.guild.emojis.create(`${emoji.url}`, `${emoji.name}`).catch(console.error);
    let Member = guild.member(yapan.executor.id);
    if(Member && Member.bannable) Member.ban()  
    if(!logger) return client.users.cache.get(config.BotOwner).send(`<@${yapan.executor.id}> \`${yapan.executor.id}\` Tarafından ${emoji.name} Emojisi Silindi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
    logger.send(`@here <@${yapan.executor.id}> \`${yapan.executor.id}\` Tarafından ${emoji.name} Emojisi Silindi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
    })
              
    function whitelised4(kisiID) {
    let Member = client.guilds.cache.get(config.ServerID).members.cache.get(kisiID);
    let whitelistedmember = config.WhiteList || [];
    if (!Member || Member.id === client.user.id || Member.id === config.BotOwner || Member.id === Member.guild.owner.id || whitelistedmember.some(g => Member.id === g.slice(1) || Member.roles.cache.has(g.slice(1)))) return true
    else return false;
    };      
    function Karar4(UserID, tur) {
    let uye = client.guilds.cache.get(config.ServerID).members.cache.get(UserID);
    if (!uye) return;
    if (tur == "ban") return uye.ban({ reason: `${config.sunucuadı}` }).catch();
    };
    
    function KorumaAc4(ServerID) {
    let sunucu = client.guilds.cache.get(ServerID);
    let logger = client.guild.cache.get(config.MemberGuardLog)
    if (!sunucu) return;
    sunucu.roles.cache.filter(r => r.editable && (r.permissions.has("ADMINISTRATOR")||r.permissions.has("MANAGE_CHANNELS") || r.permissions.has("MANAGE_GUILD") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_WEBHOOKS"))).forEach(async r => {
    await r.setPermissions(0);
    });
    }