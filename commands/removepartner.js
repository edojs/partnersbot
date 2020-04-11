exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  let slot = args[0];
  if(!slot) return message.channel.send("Nisi napisao/la slot!");
  if(isNaN(slot) || slot < 1 || slot > 5) return message.channel.send("Nisi pravilno napisao/la slot!");
  
  let serverid = await client.db.fetch(`slot_${message.guild.id}_${slot}`);
  if(serverid === null) return message.channel.send("Na tom slotu nemaš partnerstvo!");
  
  let pending = await client.db.fetch(`partner_${serverid}_${message.guild.id}`, { target: ".pending" });
  if(pending) return message.channel.send("Taj server nije postigao partnerstvo sa tobom!");
  
  let partnerslot = await client.db.fetch(`partner_${serverid}_${message.guild.id}`, { target: ".slot" });
  let partnerid = await client.db.fetch(`slot_${serverid}_${partnerslot}`);
  if(partnerslot === null || partnerslot !== null && partnerid !== message.guild.id) return message.channel.send("Nisi partner sa tim serverom!");
  
  let i = 0;
  let partnerchannel = await client.db.fetch(`default_${serverid}`);
  if(partnerchannel === null) i++;
  partnerchannel = client.channels.get(partnerchannel);
  if(partnerchannel === undefined || partnerchannel === null) i++;
  
  client.db.delete(`slot_${serverid}_${partnerslot}`).catch(err => console.log(err));
  client.db.delete(`partner_${serverid}_${message.guild.id}`).catch(err => console.log(err));
  client.db.delete(`slot_${message.guild.id}_${slot}`).catch(err => console.log(err));
  client.db.delete(`partner_${message.guild.id}_${serverid}`)
  .then(() => {
    message.channel.send("Prekinuo/la si partnerstvo sa tim serverom!")
    if(i == 0) partnerchannel.send("Server **"+message.guild.name+"** je prekinuo partnerstvo sa tobom!");
  }).catch(err => console.log(err));
}