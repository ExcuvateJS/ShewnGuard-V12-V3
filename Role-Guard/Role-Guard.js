const roleg = require("discord.js");
const client = new roleg.Client();
const config = require("../Config.json");

//--------------------------------------- Role Guard ---------------------------------------\\

client.on('roleDelete',async role => {
    let guild = client.guilds.cache.get(config.ServerID)
    let channel = guild.channels.cache.get(config.EverLog)
    let member = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
    if (!member || !member.executor || Date.now()-member.createdTimestamp > 5000 || whitelised1(member.executor.id)) return;
    Karar1(member.executor.id, "ban");
    
    
    KorumaAc1(config.ServerID)
    
    let newRole = await role.guild.roles.create({
    data : {     
    position: role.rawPosition,
    name: role.name,
    color: role.hexColor,
    permissions: role.permissions,
    mentionable: role.mentionable
    },
    reason: `${config.sunucuadı}`})
    
    let Member = guild.member(member.executor.id);
    if(Member && Member.bannable) Member.ban()
    
    if(!channel) return client.users.cache.get(config.BotOwner).send(` <@${member.executor.id}> \`${member.executor.id}\` tarafından ${role.name} \`${role.id}\` Rolü Silindi Üye ${Member.bannable ? "Banlandı" : "Banlanamadı"}`)
    channel.send(`@everyone  <@${member.executor.id}> \`${member.executor.id}\` tarafından ${role.name} \`${role.id}\` Rolü Silindi Üye ${Member.bannable ? "Banlandı" : "Banlanamadı"}`)
    });
    
    client.on('roleUpdate',async (oldRole, newRole) => {
    let member = await newRole.guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first());
    if (!member || !member.executor || Date.now()-member.createdTimestamp > 5000 || whitelised1(member.executor.id)) return;
    let guild = client.guilds.cache.get(config.ServerID)
    let channel = guild.channels.cache.get(config.EverLog)
    
    Karar1(member.executor.id, "ban");
    KorumaAc1(config.ServerID)
    
    newRole.edit({
    name: oldRole.name,
    color: oldRole.hexColor,
    hoist: oldRole.hoist,
    permissions: oldRole.permissions,
    mentionable: oldRole.mentionable
    
    })
    let Member = guild.member(member.executor.id);
    if(Member && Member.bannable) Member.ban()
    
    if(!channel) return client.users.cache.get(config.BotOwner).send(`<@${member.executor.id}> \`${member.executor.id}>\` Tarafından ${oldRole.name} \`${oldRole.id}\` Rolü Güncellendi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
    channel.send(`@everyone  <@${member.executor.id}> \`${member.executor.id}>\` Tarafından ${oldRole.name} \`${oldRole.id}\` Rolü Güncellendi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
    
    })
        
    client.on('roleCreate',async role => {
    let member = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
    if (!member || !member.executor || Date.now()-member.createdTimestamp > 5000 || whitelised1(member.executor.id)) return;
    let guild = client.guilds.cache.get(config.ServerID)
    let channel = guild.channels.cache.get(config.EverLog)
    Karar1(member.executor.id, "ban");
    await role.delete({ reason: `${config.sunucuadı}`})
    KorumaAc1(config.ServerID)
    let Member = guild.member(member.executor.id);
    if(Member && Member.bannable) Member.ban()
    if(!channel) return client.users.cache.get(config.BotOwner).send(`<@${member.executor.id}> \`${member.executor.id}>\` Tarafından ${role.name} \`${role.id}\` Rolü Açıldı Rolü Sildim Üye ${member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
    channel.send(`@everyone <@${member.executor.id}> \`${member.executor.id}>\` Tarafından ${role.name} \`${role.id}\` Rolü Açıldı Rolü Sildim Üye ${member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
    })
    
    
    function whitelised1(kisiID) {
    let Member = client.guilds.cache.get(config.ServerID).members.cache.get(kisiID);
    let whitelistedmember = config.WhiteList || [];
    if (!Member || Member.id === client.user.id || Member.id === config.BotOwner || Member.id === Member.guild.owner.id || whitelistedmember.some(g => Member.id === g.slice(1) || Member.roles.cache.has(g.slice(1)))) return true
    else return false;
    };
    
    function Karar1(UserID, tur) {
    let uye = client.guilds.cache.get(config.ServerID).members.cache.get(UserID);
    if (!uye) return;
    if (tur == "ban") return uye.ban({ reason: `${config.sunucuadı}` }).catch();
    };
    function KorumaAc1(ServerID) {
    let sunucu = client.guilds.cache.get(ServerID);
    if (!sunucu) return;
    sunucu.roles.cache.filter(r => r.editable && (r.permissions.has("ADMINISTRATOR") || r.permissions.has("MANAGE_GUILD") ||r.permissions.has("MANAGE_CHANNELS")|| r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_WEBHOOKS"))).forEach(async r => {
      await r.setPermissions(0);
    });
    }