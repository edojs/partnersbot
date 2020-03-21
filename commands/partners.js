exports.run = async (client, message, args) => {
  
    let partners = await client.db.startsWith(`partner_${message.guild.id}`)
    let content = "";

    for (let i = 0; i < partners.length; i++) {
        let server = client.guilds.get(partners[i].ID.split('_')[2])
        let partnerid = partners[i].ID.split('_')[2];
        let slot = await client.db.fetch(`partner_${message.guild.id}_${partnerid}`, { target: ".slot" });



        content += `${i+1}. ${server} (${slot}. slot)\n`

      }

    const embed = new client.Discord.RichEmbed()
    .setDescription(`**Lista partnera**\n\n${content}`)
    .setColor("#FFFFFF")

    message.channel.send(embed)

}
module.exports.help = {
  name:"partnership",
  aliases: ["partners"]
}