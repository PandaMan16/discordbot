const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
		.setName('code')
		.setDescription('cree une zone de text formaté pour le code'),
    async execute(interaction,client) {
        const modal = new ModalBuilder()
            .setTitle('affiché du code')
            .setCustomId('codemodal')
            .setComponents(
                new ActionRowBuilder().setComponents(
                    new TextInputBuilder()
                        .setLabel('langue informatique')
                        .setCustomId('language')
                        .setStyle(TextInputStyle.Short)
                        .setPlaceholder("exemple: js")
                ),
                new ActionRowBuilder().setComponents(
                    new TextInputBuilder()
                        .setLabel('Votre code')
                        .setCustomId('code')
                        .setStyle(TextInputStyle.Paragraph)
                        .setPlaceholder("exemple: console.log('Hello World');")
                ),
            );
        interaction.showModal(modal);
    }
}