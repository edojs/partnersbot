module.exports = async (client, guild) => {
  console.log(`Obrisan sam sa servera ${guild.name} (id: ${guild.id})`);
  let channeldb = await client.db.fetch(`default_${guild.id}`);
  if(channeldb !== null) client.db.delete(`default_${guild.id}`);
  let servers = await client.db.startsWith(`partner_${guild.id}`);
  for(let i = 0; i < servers.length; i++) {
    let pid = servers[i].ID.split("_")[2];
    let slot = await client.db.fetch(`partner_${guild.id}_${pid}`, { target: ".slot" });
    let pslot = await client.db.fetch(`partner_${pid}_${guild.id}`, { target: ".slot" });
    let partner = await client.db.fetch(`slot_${pid}_${pslot}`);
    // BRISANJE
    client.db.delete(`partner_${guild.id}_${pid}`);
    client.db.delete(`slot_${guild.id}_${slot}`);
    client.db.delete(`partner_${pid}_${guild.id}`);
    client.db.delete(`slot_${pid}_${pslot}`);
  }
}