exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  let dbchannel = await client.db.fetch(`default_${message.guild.id}`);
  if(dbchannel !== null) {
    dbchannel = message.guild.channels.get(dbchannel);
    message.channel.send("Već si postavio/la zadani kanal, a to je "+dbchannel);
    return;
  }
  let channel = message.mentions.channels.first();
  if(!channel) return message.channel.send("Nisi označio/la kanal koji želiš učiniti zadanim za bota!");
  client.db.set(`default_${message.guild.id}`, channel.id)
  .then(() => {
    message.channel.send("Uspješno si postavio/la zadani kanal za bota! Test poruka je poslana u taj kanal!")
    channel.send("Test poruka!")
  })
  .catch(err => console.log(err));
}