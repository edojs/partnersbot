exports.run = (client, message, args) => {
  var helpEmbed = new client.Discord.RichEmbed() // Creates a new rich embed (see https://discord.js.org/#/docs/main/stable/class/RichEmbed) 
    .setAuthor("Zdravo, "+message.author.username+"#"+message.author.discriminator, message.author.displayAvatarURL) 
    .setDescription("**Napomena**: ukoliko je potreban unos dodatnih varijabli u komandu, one su označene sa `[]` i `()` u listi komandi.") 
    .addField("🤝 Komande za partnerstvo!", // Sets the title of the field 
              "**"+client.config.prefix+"setchannel [ID kanala]** - postavljanje zadanog kanala za bota!\n"+
              "**"+client.config.prefix+"resetchannel** - resetovanje zadanog kanala!\n"+
              "**"+client.config.prefix+"partners** - lista partnera!\n"+
              "**"+client.config.prefix+"addpartner [ID servera] [slot (1-5)]** - uspostavljanje partnerstva (max. 5)!\n"+ 
              "**"+client.config.prefix+"removepartner [slot (1-5)]** - raskidanje partnerstva!\n"+ 
              "**"+client.config.prefix+"t [slot]** - pričanje sa partnerom (u zadanom kanalu)!\n"+
              "**"+client.config.prefix+"off** - isključivanje zahtjeva za partnerstvo (u fazi kodiranja)!\n"+
              "**"+client.config.prefix+"on** - uključivanje zahtjeva za partnerstvo (u fazi kodiranja)!\n"+
              "**"+client.config.prefix+"invite** - invite link od Partners Bota (poslan u DM)!" ) 
    .setColor(client.config.embed.color) // Sets the color of the embed 
    .setFooter(client.config.embed.footer) // Sets the footer of the embed 
    .setTimestamp(); 
    message.channel.send(helpEmbed);
}