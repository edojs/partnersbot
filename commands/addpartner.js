exports.run = async (client, message, args) => {
  if(message.author.id !== message.guild.ownerID) return message.channel.send("Nisi vlasnik ovog servera!");
  
  let dbchannel = await client.db.fetch(`default_${message.guild.id}`);
  if(dbchannel === null) return message.channel.send("Nisi postavio/la zadani kanal za bota!");
  
  let serverid = args[0];
  if(!serverid) return message.channel.send("Nisi napisao/la ID servera!");
  if(isNaN(serverid)) return message.channel.send("Napisao/la si nepravilan ID servera!");
  if(serverid === message.guild.id) return message.channel.send("Ne možeš sebi poslati zahtjev za partnerstvo!");
  
  let server = client.guilds.get(serverid);
  if(server === undefined) return message.channel.send("Partners Bot se ne nalazi na tom serveru!");
  
  let partner = await client.db.fetch(`default_${serverid}`);
  if(partner === null) return message.channel.send("Taj server nije postavio zadani kanal!");
  partner = client.channels.get(partner);
  if(partner === undefined) return message.channel.send("Taj server nije postavio zadani kanal!");
  
  let pending = await client.db.fetch(`partner_${message.guild.id}_${serverid}`, { target: ".pending" });
  if(pending) return message.channel.send("Već si poslao/la zahtjev za partnerstvo tom serveru!");
  
  let serverdb = await client.db.fetch(`partner_${message.guild.id}_${serverid}`);
  if(serverdb !== null) return message.channel.send("Sa tim serverom imaš već uspostavljeno partnerstvo!");
  
  let slot = args[1];
  if(!slot) return message.channel.send("Nisi napisao/la slot za partnerstvo!");
  if(isNaN(slot)|| slot < 1 || slot > 5) return message.channel.send("Slot ne može biti manji od 1 ili veći od 5!");
  
  let slotdb = await client.db.fetch(`slot_${message.guild.id}_${slot}`);
  if(slotdb !== null || isNaN(slotdb)) return message.channel.send("Na tom slotu već imaš partnerstvo!");
  
  client.db.set(`slot_${message.guild.id}_${slot}`, serverid);
  client.db.set(`partner_${message.guild.id}_${serverid}`, { slot: slot, pending: true })
  .then(() => {
    let partnerEmbed = new client.Discord.RichEmbed()
    .setDescription("`"+message.guild.id+"`")
    message.channel.send("Poslao/la si zahtjev za partnerstvo na taj server!")
    partner.send("Server **"+message.guild.name+"** traži partnerstvo!\nDa ga prihvatiš napiši "+client.config.prefix+"accept [ID servera] [slot], \na da ga odbiješ napiši "+client.config.prefix+"deny [ID servera]", partnerEmbed)
  });
}