const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('alertmodal'),
    async execute(interaction, client) {
        const alertEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle(interaction.fields.getTextInputValue('title'))
            .setDescription("@everyone\n" + interaction.fields.getTextInputValue('content'))
            .setTimestamp()
            .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() });

        const datetimeValue = interaction.fields.getTextInputValue('datetime');

        if (datetimeValue) {
            const [day, month, year, hour, minute] = datetimeValue.split(/[/\s:]/).map(Number);
            const targetDate = new Date(year, month - 1, day, hour, minute);
            const now = new Date();

            if (targetDate > now) {
                // Si la date et l'heure sont dans le futur, programmez l'envoi du message
                const delay = targetDate.getTime() - now.getTime();
                setTimeout(() => {
                    sendAlertMessage(interaction, alertEmbed);
                }, delay);
                interaction.reply({ content: `Alerte programmée pour le ${day}/${month}/${year} à ${hour}:${minute}.` });
            } else {
                interaction.reply({ content: "La date et l'heure fournies sont déjà passées. Veuillez fournir une date et une heure futures." });
            }
        } else {
            // Si aucune date et heure n'est fournie, envoyez le message immédiatement
            alertEmbed.setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() });
            sendAlertMessage(interaction, alertEmbed);
        }
    }
}

function sendAlertMessage(interaction, embed) {
    const channel = interaction.client.channels.cache.find(channel => channel.id == "1116647246235176982");
    channel.send({ embeds: [embed] })
        .then(sentMessage => {
            interaction.reply({
                content: `Alerte envoyée -> ${sentMessage.url}`,
            });
    });
}
