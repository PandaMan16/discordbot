const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { saveData, loadData } = require('../dataStorage.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('portfoliomodal'),
    async execute(interaction,client) {
        console.log('Modal Submitted...');
        console.log(interaction.fields.getTextInputValue('username'));
        let botvars = loadData();
        let portfolioUrlList = "";
        if(!botvars.portfolioUrlList){
            botvars.portfolioUrlList = {};
            botvars.portfolioUrlList[interaction.fields.getTextInputValue('username')] = interaction.fields.getTextInputValue('url');
            saveData(botvars);
        }else{
            botvars.portfolioUrlList[interaction.fields.getTextInputValue('username')] = interaction.fields.getTextInputValue('url');
            saveData(botvars);
        }
        for (const key in botvars.portfolioUrlList) {
            if(portfolioUrlList === ""){
                portfolioUrlList = key+" : "+botvars.portfolioUrlList[key];
            }else{
                portfolioUrlList = portfolioUrlList+"\n"+key+" : "+botvars.portfolioUrlList[key];
            }
        }
        const portfolioEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Liste des url apprenant')
            .setDescription(portfolioUrlList)
            .setTimestamp()
            .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() });
        if(botvars.portfoliomessage){
            const channel = client.channels.cache.find(channel => channel.id == "1116647246235176982");
            const fetchedMessage = await channel.messages.fetch(botvars.portfoliomessage);
            fetchedMessage.edit({ embeds: [portfolioEmbed] });
            interaction.reply({
                content: `Info Mis a jour dans ${fetchedMessage.url}`,
            });
        }else{
            const channel = client.channels.cache.find(channel => channel.id == "1116647246235176982");
            channel.send({ embeds: [portfolioEmbed] })
                .then(sentMessage => {
                    botvars.portfoliomessage = sentMessage.id;
                    saveData(botvars);
                    interaction.reply({
                        content: `Info Mis a jour dans ${sentMessage.url}`,
                    });
            });
        }
        setTimeout(() => interaction.deleteReply(), 10000);
    },
}