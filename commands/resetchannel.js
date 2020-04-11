exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  let dbchannel = await client.db.fetch(`default_${message.guild.id}`);
  if(dbchannel === null) return message.channel.send("Nisi postavio/la zadani kanal za bota!");
  dbchannel = message.guild.channels.get(dbchannel);
  client.db.delete(`default_${message.guild.id}`);
  message.channel.send("Resetovao/la si zadani kanal ("+dbchannel+")!");
}