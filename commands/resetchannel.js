exports.run = async (client, message, args) => {
  if(message.author.id !== message.guild.ownerID) return message.channel.send("Nisi vlasnik ovog servera!");
  let dbchannel = await client.db.fetch(`default_${message.guild.id}`);
  if(dbchannel === null) return message.channel.send("Nisi postavio/la zadani kanal za bota!");
  dbchannel = message.guild.channels.get(dbchannel);
  client.db.delete(`default_${message.guild.id}`);
  message.channel.send("Resetovao/la si zadani kanal ("+dbchannel+")!");
}