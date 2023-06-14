const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('portfolio')
		.setDescription('mes a jour le lien vers votre portfolio!'),
	async execute(interaction) {
		const modal = new ModalBuilder()
        .setTitle('Portfolio')
        .setCustomId('portfoliomodal')
        .setComponents(
          new ActionRowBuilder().setComponents(
            new TextInputBuilder()
              .setLabel('Prenom Nom')
              .setCustomId('username')
              .setStyle(TextInputStyle.Short)
              .setPlaceholder("exemple: Jordan F")
          ),
          new ActionRowBuilder().setComponents(
            new TextInputBuilder()
              .setLabel('URL du portfolio')
              .setCustomId('url')
              .setStyle(TextInputStyle.Short)
              .setPlaceholder("exemple: https://pandatown.fr")
          )
        );
      interaction.showModal(modal);
	},
};