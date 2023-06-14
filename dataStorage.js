const { ThreadChannel } = require('discord.js');
const fs = require('fs');

// Fonction pour sauvegarder les données dans un fichier
function saveData(data) {
  fs.writeFileSync("./botvars.json", JSON.stringify(data));
}

// Fonction pour charger les données depuis un fichier
function loadData() {
  if (fs.existsSync("./botvars.json")) {
    const data = fs.readFileSync("./botvars.json", 'utf8');
    return JSON.parse(data);
  }
  return {};
}

function thread(channel,name,raison,archive,type,user){
  channel.threads.create({
    name: name,
    autoArchiveDuration: archive,
	  type: type,
    raison: raison,
  })
  .then(ThreadChannel => {
    for (const key in user) {
      ThreadChannel.members.add(user[key]);
    }
    ThreadChannel.send('<@here> fils privé');
  });
  
}
// Exporter les fonctions pour une utilisation dans d'autres fichiers
module.exports = {
  saveData,
  loadData,
  thread
};