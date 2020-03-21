exports.run = (client, message, args) => {
  if (message.author.id !== "495897264108339200") return;
    message.channel.send("Bot je restartovan!").then(() => {
      process.exit(1);
    });
}