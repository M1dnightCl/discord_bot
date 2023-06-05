const { SlashCommandBuilder } = require('discord.js');
const Roll = require('roll');
const roll = new Roll();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('2d12')
        .setDescription('Gira 2d12')
        .addIntegerOption(option =>
            option.setName('modificador')
                .setDescription('Modificador para somar ao resultado')
                .setRequired(false)),
    async execute(interaction) {
        const modificador = interaction.options.getInteger('modificador') || 0;

        try {
            let dice = roll.roll('2d12');
            const resultado = dice.result + modificador;

            let formattedResult = `${dice.rolled[0]}, ${dice.rolled[1]}`;

            if (dice.rolled[0] === 1 || dice.rolled[0] === 2 || dice.rolled[0] === 11 || dice.rolled[0] === 12) {
                formattedResult = `**${dice.rolled[0]}**, ${dice.rolled[1]}`;
            }
            if (dice.rolled[1] === 1 || dice.rolled[1] === 2 || dice.rolled[1] === 11 || dice.rolled[1] === 12) {
                formattedResult = `${dice.rolled[0]}, **${dice.rolled[1]}**`;
            }

            await interaction.reply({
                content: `${interaction.user.username} :game_die:\n ${formattedResult}\nResultado final: ${resultado}`,
                ephemeral: false
            });
        } catch (err) {
            console.error(err);
            await interaction.reply({
                content: 'Ocorreu um erro ao girar os dados :x:',
                ephemeral: true
            });
        }
    },
};
