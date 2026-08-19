const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    // 1. TitanBot command metadata
    category: 'Tools',
    data: new SlashCommandBuilder()
        .setName('deport')
        .setDescription('Deports the designated member')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user to give the role to')
                .setRequired(true)),

    // 2. TitanBot execution handler
    async execute(interaction, client) {
        // ID of the role allowed to USE the command
        const allowedExecutorRoleId = '1539617246761193483'; 

        // ID of the role that gets GIVEN out
        const targetRoleId = '1539617214662185022';

        // Permission check
        if (!interaction.member.roles.cache.has(allowedExecutorRoleId)) {
            return interaction.reply({ 
                content: 'You do not have the required role to use this command!', 
                ephemeral: true 
            });
        }

        const targetMember = interaction.options.getMember('user');

        try {
            const targetRole = interaction.guild.roles.cache.get(targetRoleId);

            if (!targetRole) {
                return interaction.reply({ 
                    content: 'Error: The target role could not be found. Check the Role ID in the code!', 
                    ephemeral: true 
                });
            }

            await targetMember.roles.add(targetRole);

            await interaction.reply({ 
                content: `Successfully gave the **${targetRole.name}** role to ${targetMember}!`, 
                ephemeral: true 
            });

        } catch (error) {
            console.error('Error executing command:', error);
            await interaction.reply({ 
                content: 'An error occurred! Make sure my bot role is higher than the role you are trying to give.', 
                ephemeral: true 
            });
        }
    },
};
