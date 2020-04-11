exports.run = (client, message, args) => {
  if (message.author.id !== client.config.dev.id) return;
    message.channel.send("Bot je restartovan!").then(() => {
      process.exit(1);
    });
}