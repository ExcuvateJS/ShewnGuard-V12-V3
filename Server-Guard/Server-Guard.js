const request = require("request");
const serverg = require("discord.js");
const client = new serverg.Client();
const config = require("../Config.json");

//--------------------------------------- Server Guard ---------------------------------------\\

client.on('guildUpdate',async (oldGuild , newGuild) => {
    let guild = client.guilds.cache.get(config.ServerID)
    let logger = guild.channels.cache.get(config.EverLog) 
    let member = await oldGuild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
    if (!member || !member.executor || Date.now()-member.createdTimestamp > 5000 || whitelised3(member.executor.id)) return;
    if(newGuild.name !== oldGuild.name) newGuild.setName(oldGuild.name);
    Karar3(member.executor.id, 'ban');
     KorumaAc3(config.ServerID);
    let Member = guild.member(member.executor.id);
    if(Member && Member.bannable) Member.ban()  
    newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048}));
    if(!logger) return client.users.cache.get(config.BotOwner).send(`<@${member.executor.id}> \`${member.executor.id}\` Tarafından Sunucu Güncellendi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
    logger.send(`@everyone <@${member.executor.id}> \`${member.executor.id}\` Tarafından Sunucu Güncellendi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
    })
    
    client.on('guildUpdate', async (oldGuild, newGuild) => {
    let guild = client.guilds.cache.get(config.ServerID)
    let logger = guild.channels.cache.get(config.EverLog) 
    let member = await oldGuild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
    if (!member || !member.executor || Date.now()-member.createdTimestamp > 5000 || whitelised3(member.executor.id)) return;
    if(newGuild.vanityURLCode === null) return;
    if(oldGuild.vanityURLCode === newGuild.vanityURLCode) return;  
     Karar3(member.executor.id, 'ban');
    KorumaAc3(config.ServerID);
    
    let Member = guild.member(member.executor.id);
    if(Member && Member.bannable) Member.ban()  
    if(!logger) return client.users.cache.get(config.BotOwner).send(`<@${member.executor.id}> \`${member.executor.id}\` Tarafından ${config.ServerURL} Olan Sunucu URL si Değişti Üye ${Member.bannable ? 'Banlandı': 'Banlanamadı'}`)
    logger.send(`@everyone <@${member.executor.id}> \`${member.executor.id}\` Tarafından ${config.ServerURL} Olan Sunucu URL si Değişti Üye ${Member.bannable ? 'Banlandı': 'Banlanamadı'}`)
      
    request({  
    method: 'PATCH',
    url: `https://discord.com/api/v8/guilds/${newGuild.id}/vanity-url`,
    body: {
    code: config.ServerURL},
    json: true,
    headers: {
    "Authorization": `Bot ${config.ServerToken}`}
    }, 
    (err) => {
    if (err) {
    return console.log(err);
    }
    });
    });
        
    function whitelised3(kisiID) {
    let Member = client.guilds.cache.get(config.ServerID).members.cache.get(kisiID);
    let whitelistedmember = config.WhiteList || [];
    if (!Member || Member.id === client.user.id || Member.id === config.BotOwner || Member.id === Member.guild.owner.id || whitelistedmember.some(g => Member.id === g.slice(1) || Member.roles.cache.has(g.slice(1)))) return true
    else return false;
    };
        
    function Karar3(UserID, tur) {
    let uye = client.guilds.cache.get(config.ServerID).members.cache.get(UserID);
    if (!uye) return;
    if (tur == "ban") return uye.ban({ reason: `${config.sunucuadı}` }).catch();
    };
    
    function KorumaAc3(ServerID) {
    let sunucu = client.guilds.cache.get(ServerID);
    if (!sunucu) return;
    sunucu.roles.cache.filter(r => r.editable && (r.permissions.has("ADMINISTRATOR") ||r.permissions.has("MANAGE_CHANNELS")|| r.permissions.has("MANAGE_GUILD") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_WEBHOOKS"))).forEach(async r => {
    await r.setPermissions(0);
    
    });
    }