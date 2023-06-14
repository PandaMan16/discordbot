const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { Commande_Channel } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('alert')
		.setDescription('créé un message generel alert'),
    async execute(interaction,client) {
        const modal = new ModalBuilder()
            .setTitle('Créé une alert')
            .setCustomId('alertmodal')
            .setComponents(
                new ActionRowBuilder().setComponents(
                    new TextInputBuilder()
                        .setLabel('Titre')
                        .setCustomId('title')
                        .setStyle(TextInputStyle.Short)
                        .setPlaceholder("exemple: IMPORTANT")
                ),
                new ActionRowBuilder().setComponents(
                    new TextInputBuilder()
                        .setLabel('Contenue')
                        .setCustomId('content')
                        .setStyle(TextInputStyle.Paragraph)
                        .setPlaceholder("")
                ),
            );
        interaction.showModal(modal);
    }
}