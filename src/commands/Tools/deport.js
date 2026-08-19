const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deport')
        .setDescription('deports the designated member')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user to give the role to')
                .setRequired(true)),

    async execute(interaction) {
      
        const allowedExecutorRoleId = '1539591518472638475'; 

        const targetRoleId = '1539593361252421693';

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
            console.error('Error in command:', error);
            await interaction.reply({ 
                content: 'An error occurred! Make sure my bot role is higher than the role you are trying to give.', 
                ephemeral: true 
            });
        }
    },
};
