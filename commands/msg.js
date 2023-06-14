const { SlashCommandBuilder, ChannelType,ThreadAutoArchiveDuration } = require('discord.js');
const { thread } = require('../dataStorage.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('msg')
		.setDescription('créé un fil de discussion privé')
        .addStringOption(option => option.setName('name').setDescription('Nom de la convesation').setRequired(true))
        .addUserOption(option => option.setName('target').setDescription('parsonne qui vous voulez envoyé un message').setRequired(true)),
    async execute(interaction,client) {
        const target = interaction.options.getUser('target');
        const name = interaction.options.getString('name');
        let userlist = [interaction.user.id,target.id];
        thread(client.channels.cache.find(channel => channel.id === interaction.channelId),name,"private message",ThreadAutoArchiveDuration.ThreeDays,ChannelType.PrivateThread,userlist);
        interaction.reply({content: ` message privé créé`});
        setTimeout(() => interaction.deleteReply(), 10000);
    }
}