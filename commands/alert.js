const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('alert')
        .setDescription('Crée un message général d\'alerte')
        .addStringOption(option => 
            option.setName('option')
                  .setDescription('Option pour l\'alerte')
                  .setRequired(false)
        ),
    async execute(interaction, client) {
        const optionValue = interaction.options.getString('option');

        const modal = new ModalBuilder()
            .setTitle('Crée une alerte')
            .setCustomId('alertmodal')
            .setComponents(
                new ActionRowBuilder().setComponents(
                    new TextInputBuilder()
                        .setLabel('Titre')
                        .setCustomId('title')
                        .setStyle(TextInputStyle.Short)
                        .setPlaceholder("Exemple: IMPORTANT")
                ),
                new ActionRowBuilder().setComponents(
                    new TextInputBuilder()
                        .setLabel('Contenu')
                        .setCustomId('content')
                        .setStyle(TextInputStyle.Paragraph)
                        .setPlaceholder("Entrez le contenu de l'alerte ici")
                )
            );

        // Si l'option est "retard", ajoutez un champ de date et d'heure
        if (optionValue === 'retard') {
            modal.addComponents(
                new ActionRowBuilder().setComponents(
                    new TextInputBuilder()
                        .setLabel('Date et Heure')
                        .setCustomId('datetime')
                        .setStyle(TextInputStyle.Short)
                        .setPlaceholder("JJ/MM/AAAA HH:MM")
                )
            );
        }

        interaction.showModal(modal);
    }
};
