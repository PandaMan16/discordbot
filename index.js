const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, REST, Routes } = require('discord.js');
const { token, CLIENT_ID, GUILD_ID } = require('./config.json');


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [];
client.commands = new Collection();
client.modalCommands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const modalCommandsPath = path.join(__dirname, 'commandsmodal');

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
		commands.push(command.data.toJSON());
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}
const modalCommandFiles = fs.readdirSync(modalCommandsPath).filter(file => file.endsWith('.js'));
for (const file of modalCommandFiles) {
	const filePath = path.join(modalCommandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.modalCommands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand()){
		const command = interaction.client.commands.get(interaction.commandName);
		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}
	
		try {
			await command.execute(interaction,client);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	}else{
		console.log(interaction.customId);
		const command = interaction.client.modalCommands.get(interaction.customId);
		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}
	
		try {
			await command.execute(interaction,client);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
				setTimeout(() => interaction.deleteReply(), 10000);
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
				setTimeout(() => interaction.deleteReply(), 10000);
			}
		}

	}
	
	// const command = interaction.client.commands.get(interaction.commandName);
	// if(!command){
	// 	console.log('Modal Submitted...');
	// 	command = interaction.client.commands.get(interaction.customId);
	// }
	
});

const rest = new REST({ version: '10' }).setToken(token);

async function main() {
    
    
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        	body: commands,
        });
        client.login(token);
    } catch (err) {
        console.log(err);
    }
}

main();