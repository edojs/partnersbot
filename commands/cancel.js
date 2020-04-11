exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  
  let slot = args[0];
  if(!slot) return message.channel.send("Nisi napisao/la slot!");
  if(isNaN(slot) || slot < 1 || slot > 5) return message.channel.send("Nisi pravilno napisao/la slot!");
  
  let serverid = await client.db.fetch(`slot_${message.guild.id}_${slot}`);
  if(serverid === null) return message.channel.send("Na tom slotu nemaš zahtjev za partnerstvo!");
  
  
  let pending = await client.db.fetch(`partner_${message.guild.id}_${serverid}`, { target: ".pending" });
  if(!pending) return message.channel.send("Sa tim serverom već imaš uspostavljeno partnerstvo!");
  
  let i = 0;
  let server = client.guilds.get(serverid);
  if(server === undefined) i++;
  let channel = await client.db.fetch(`default_${serverid}`);
  if(channel === null) i++;
  channel = client.channels.get(channel);
  if(channel === undefined || channel === null) i++;
  
  client.db.delete(`slot_${message.guild.id}_${slot}`);
  client.db.delete(`partner_${message.guild.id}_${serverid}`)
  .then(() => {
    message.channel.send("Poništio/la si zahtjev za partnerstvo sa tim serverom!");
    if(i == 0) channel.send("Server **"+message.guild.name+"** je poništio zahtjev za partnerstvo!");
  });
}