const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('alertmodal'),
    async execute(interaction,client) {
        const alertEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
            .setTitle(interaction.fields.getTextInputValue('title'))
            .setDescription("<@here>"+interaction.fields.getTextInputValue('content'))
            .setTimestamp()
            .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() });
        const channel = client.channels.cache.find(channel => channel.id == "1116647246235176982");
        channel.send({ embeds: [alertEmbed] })
            .then(sentMessage => {
                interaction.reply({
                    content: `alert envoyé -> ${sentMessage.url}`,
                });
        });
    },
}