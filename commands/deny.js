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
  
  let pending = await client.db.fetch(`partner_${serverid}_${message.guild.id}`, { target: ".pending" });
  if(!pending) return message.channel.send("Već si partner sa tim serverom!");
  
  let slots = [1, 2, 3, 4, 5]
  slots.forEach(async (slot) => {
    let partners = await client.db.fetch(`slot_${serverid}_${slot}`);
    if(partners !== null && partners === message.guild.id) client.db.delete(`slot_${serverid}_${slot}`);
  });
  client.db.delete(`partner_${serverid}_${message.guild.id}`)
  .then(async() => {
    let channeldb = await client.db.fetch(`default_${serverid}`)
    if(channeldb === null) return message.channel.send("Odbio/la si zahtjev za partnerstvo sa tim serverom!\nVlasnik tog servera nije obaviješten jer je u međuvremenu resetovao zadani kanal!")
    channeldb = client.channels.get(channeldb)
    if(channeldb === undefined || channeldb === null) return message.channel.send("Odbio si zahtjev za partnerstvo! Taj server je obrisao zadani kanal!");
    message.channel.send("Odbio/la si zahtjev za partnerstvo sa tim serverom! Vlasnik je obaviješten!")
    channeldb.send("Server **"+message.guild.name+"** je odbio tvoj zahtjev za partnerstvo!")
  }).catch(err => console.log(err));
}