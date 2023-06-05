// Exigir as classes discord.js necessárias
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const dotenv = require('dotenv')
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

//importação de comandos
const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

// Criar uma nova instância de cliente
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const commands = require(filePath)
    if ("data" in commands && "execute" in commands) {
        client.commands.set(commands.data.name, commands)
    } else {
        console.log(`Esse comandos em ${filePath} está com data ou execute ausentes`)
    }
}
console.log(client.commands)

// Quando o cliente estiver pronto, execute este código (apenas uma vez)
// Usei 'c' para o parâmetro do evento para mantê-lo separado do já definido 'client'
client.once(Events.ClientReady, c => {
    console.log(`Pronto! Login realizado como ${c.user.tag}`);
    client.user.setActivity('Assistindo RPG', { type: 'WATCHING' });
});

// Faça login no Discord com o token do seu cliente
client.login(TOKEN);

//listener de interações
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) {
        console.error("Comando não encontrado")
        return
    }
    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply("Houve um erro ao executar este comando")
    }
})
