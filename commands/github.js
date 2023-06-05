const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

const exampleEmbed = new EmbedBuilder()
.setColor(0x0099FF)
.setTitle('Github de meu criador')
.setAuthor({ name: 'MidnightCl', iconURL: 'https://i.imgur.com/pbCtq4A.jpg', url: 'https://github.com/M1dnightCl' })
.setURL('https://github.com/M1dnightCl')
.setDescription('Confira o Github de meu criador, em breve terei mais comandos')
.setThumbnail('https://i.imgur.com/pbCtq4A.jpg')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('github')
        .setDescription("Github de meu criador!"),
    async execute(interaction) {
        await interaction.reply({ embeds: [exampleEmbed] })
    }
}