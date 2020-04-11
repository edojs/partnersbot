module.exports = (err) => {
  if(err === 50013) return "Greška!\nNedovoljno permisija za izvršenje te akcije ("+err+").\nProbaj popraviti permisije bota ili kanala u kome je akcija pokrenuta!";
  else return "Greška!\nKod greške: "+err;
}