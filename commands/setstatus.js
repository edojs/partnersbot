exports.run = async (client, message, args) => {
  if(message.author.id !== client.config.dev.id) return;
  let status = args.join(" ");
  if(!status) return message.channel.send("Napiši koji status želiš postaviti!");
  
  if(status === "on") {
    client.user.setStatus('online')
    .then(async() => {
      message.channel.send("Stavio si status bota na online!")
      let fetch = await message.channel.fetchMessages({ limit: 2 })
      setTimeout(() => message.channel.bulkDelete(fetch), 3000)
    })
    .catch(err => console.log(err));
  }
          
  else if(status === "idle") {
    client.user.setStatus('idle')
    .then(async() => {
      message.channel.send("Stavio si status bota na idle!")
      let fetch = await message.channel.fetchMessages({ limit: 2 })
      setTimeout(() => message.channel.bulkDelete(fetch), 3000)
    })
    .catch(err => console.log(err));
  }
    
  else if(status === "dnd") {
    client.user.setStatus('dnd')
    .then(async() => {
      message.channel.send("Stavio si status bota na do not disturb!")
      let fetch = await message.channel.fetchMessages({ limit: 2 })
      setTimeout(() => message.channel.bulkDelete(fetch), 3000)
    })
    .catch(err => console.log(err));
  }
    
  else if(status === "off") {
    client.user.setStatus('invisible')
    .then(async() => {
      message.channel.send("Stavio si status bota na offline!")
      let fetch = await message.channel.fetchMessages({ limit: 2 })
      setTimeout(() => message.channel.bulkDelete(fetch), 3000)
    })
    .catch(err => console.log(err));
  }
    
  else {
    message.channel.send("Nisi napisao pravilan status!")
    .then(async() => {
      let fetch = await message.channel.fetchMessages({ limit: 2 })
      setTimeout(() => message.channel.bulkDelete(fetch), 3000)
    })
    .catch(err => console.log(err));
  }
}