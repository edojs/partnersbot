module.exports = async (client, guild) => {
  console.log(
    `Novi server se pridruzio: ${guild.name} (id: ${guild.id}). Ovaj server ima ${guild.memberCount} clan/a/ova!`
  );
  
}