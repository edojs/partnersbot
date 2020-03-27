exports.run = async (client, message, args) => {
  let gg = client.guilds.get("687782421793734689");
  message.channel.send(gg.name);
}