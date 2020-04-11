exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  
  let serverid = args[0];
  if(!serverid) return message.channel.send("Nisi napisao/la ID servera!");
  if(isNaN(serverid)) return message.channel.send("ID servera ne smije sadržiti znakove!");
  if(serverid === message.guild.id) return message.channel.send("Ne možeš koristiti ID svog servera!");
  
  let server = client.guilds.get(serverid);
  if(server === undefined) return message.channel.send("Partners Bot nije član tog servera!");
  
  let serverdb = await client.db.fetch(`partner_${serverid}_${message.guild.id}`);
  if(serverdb === null) return message.channel.send("Taj server nije tražio partnerstvo sa tobom!");
  
  let slot = args[1];
  if(!slot) return message.channel.send("Nisi napisao/la na kojem slotu želiš partnerstvo!");
  if(isNaN(slot) || slot < 1 || slot > 5) return message.channel.send("Nisi pravilno napisao/la slot!");
  
  let slotdb = await client.db.fetch(`slot_${message.guild.id}_${slot}`);
  if(slotdb !== null) return message.channel.send("Na tom slotu već imaš partnerstvo!");
  
  let channeldb = await client.db.fetch(`default_${serverid}`);
  if(channeldb === null) return message.channel.send("Taj server nije postavio zadani kanal!");
  channeldb = client.channels.get(channeldb);
  if(channeldb === undefined) return message.channel.send("Taj server nije postavio zadani kanal!");
  
  client.db.set(`partner_${serverid}_${message.guild.id}`, false, { target: ".pending" });
  client.db.set(`slot_${message.guild.id}_${slot}`, serverid);
  client.db.set(`partner_${message.guild.id}_${serverid}`, { slot: slot, pending: false })
  .then(async() => {
    message.channel.send("Prihvatio/la si zahtjev za partnerstvo sa tim serverom! Sada možete komunicirati komandom "+client.config.prefix+"t [slot].")
    channeldb.send("Server **"+message.guild.name+"** je prihvatio tvoj zahtjev za partnerstvo!\nSada možete komunicirati komandom "+client.config.prefix+"t [slot].")
  }).catch(err => console.log(err));
}