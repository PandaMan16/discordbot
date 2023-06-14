const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { execute } = require('./Portfolio');
const { Commande_Channel } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('vous reponds avec la list des commande'),
    async execute(interaction,client) {
            let helpEmbed = new EmbedBuilder()
                .setColor(0x00AA00)
                .setTitle('List des Commande')
                .setTimestamp()
                .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() });
            console.log(client.commands.size)
            client.commands.forEach((cmd) => {
                // console.log(cmd.data.name,cmd.data.description);
                helpEmbed.addFields({ name: "/"+cmd.data.name, value: cmd.data.description,inline: false });
            });
            const channel = client.channels.cache.find(channel => channel.id == Commande_Channel);
            channel.send({ embeds: [helpEmbed] })
                .then(sentMessage => {
                    interaction.reply({
                        content: `Voici la liste des commande ${sentMessage.url}`,
                    });
            });
            setTimeout(() => interaction.deleteReply(), 10000);
        }
}