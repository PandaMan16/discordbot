const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('codemodal'),
    async execute(interaction,client) {
        const channel = client.channels.cache.find(channel => channel.id == interaction.channelId);
        channel.send({content:"<@"+interaction.user.id+">\n```"+interaction.fields.getTextInputValue("language")+"\n"+interaction.fields.getTextInputValue("code")+"```"});
        interaction.reply({
            content: ` ok `,
        });
        setTimeout(() => interaction.deleteReply(), 10000);
    }
}