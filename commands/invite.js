exports.run = (client, message, args) => {
  let inviteEmbed = new client.Discord.RichEmbed()
  .setColor("#000000")
  .setAuthor("Partners Bot - invite link!", client.user.displayAvatarURL)
  .setDescription("[INVITE](https://discordapp.com/oauth2/authorize?&client_id=689958988867174401&scope=bot&permissions=67624000)")
  .setFooter(client.config.embed.footer)
  .setTimestamp();
  message.author.send(inviteEmbed).then(() => {
    message.channel.send("Invite link od Partners Bota ti je poslan u DM!")
    .then(async() => {
      let fetch = await message.channel.fetchMessages({ limit: 2 })
      setTimeout(() => message.channel.bulkDelete(fetch), 5000)
    })
  }).catch(err => {
    console.log(err)
    message.channel.send("Nisam ti mogao poslati link u DM. Provjeri da li je tvoj DM otključan!")
    .then(msg => msg.delete(5000))
  });
}