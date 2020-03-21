exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  
  let channel = await client.db.fetch(`default_${message.guild.id}`);
  if(channel === null) return message.channel.send("Nisi postavio/la zadani kanal za bota!");
  channel = message.guild.channels.get(channel);
  if(channel === undefined || channel === null) return message.channel.send("Nisi postavio/la zadani kanal za bota!");
  if(channel !== message.channel) return message.channel.send("Poruke moraš pisati u zadanom kanalu!");
  
  let slot = args[0];
  if(!slot) return message.channel.send("Nisi napisao/la slot preko kojeg želiš komunicirati!");
  if(isNaN(slot) || slot < 1 || slot > 5) return message.channel.send("Nisi pravilno napisao/la slot!");
  
  let serverdb = await client.db.fetch(`slot_${message.guild.id}_${slot}`);
  if(serverdb === null) return message.channel.send("Na tom slotu nemaš partnerstvo!");
  let server = client.guilds.get(serverdb);
  if(server === null) return message.channel.send("Partners Bot nije član tog servera!");
  let partner = await client.db.fetch(`partner_${message.guild.id}_${serverdb}`, { target: ".pending" });
  if(partner === true) return message.channel.send("Sa tim serverom nisi uspostavio/la partnerstvo!");
  let channeldb = await client.db.fetch(`default_${serverdb}`);
  
  if(channeldb === null) return message.channel.send("Taj server nije postavio zadani kanal!");
  channeldb = client.channels.get(channeldb);
  if(channeldb === undefined || channeldb === null) return message.channel.send("Taj server nije postavio zadani kanal!");
  
  let tekst = args.slice(1).join(" ");
  if(!tekst) return message.channel.send("Nisi napisao/la sadržaj poruke!");
  
  let pozicija = "admin";
  if(message.author.id === message.guild.ownerID) pozicija = "vlasnik";
  
  let embed = new client.Discord.RichEmbed()
  .setAuthor("SERVER: "+message.guild.name)
  .setDescription("AUTOR: "+message.author.username+" ("+pozicija+")");
  
  channeldb.send(tekst, embed);
}