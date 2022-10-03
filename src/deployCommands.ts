import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { CLIENT_ID, GUILD_ID, BOT_TOKEN } from "./config";
import {
  ONBOARDING_TRIGGER,
  SUPERUSER_TRIGGER,
  EXIT_TRIGGER,
  MUTE_TRIGGER,
  UNMUTE_TRIGGER,
  WARN_TRIGGER,
  MEMBER_INFO_TRIGGER,
  BAN_TRIGGER,
  KICK_TRIGGER,
  HELP_TRIGGER,
  PURGE_TRIGGER
} from "./constants/triggers";

export const registeringCommands = () => {
    const commands = [
        new SlashCommandBuilder()
          .setName(ONBOARDING_TRIGGER)
          .setDescription("Configure disguard to work perfectly on your server.")
          .addStringOption( option =>
            option.setName("superuser")
              .setDescription("Set name for superuser role.")
              .setRequired(true)
          )
          .addStringOption( option =>
            option.setName("sudoers")
              .setDescription("Set name for the sudoers role.")
              .setRequired(true)
          )
          .addStringOption( option =>
            option.setName("muted")
              .setDescription("Set name for the muted role.")
              .setRequired(true)
          ),

        new SlashCommandBuilder()
          .setName(SUPERUSER_TRIGGER)
          .setDescription("Enter root."),
        
        new SlashCommandBuilder()
          .setName(EXIT_TRIGGER)
          .setDescription("Exit root privledges."),

        new SlashCommandBuilder()
          .setName(MUTE_TRIGGER)
          .setDescription("Mute a user.")
          .addUserOption( option =>
            option.setName("user")
              .setDescription("Enter the name of the user you want to mute.")
              .setRequired(true)
          )
          .addNumberOption( option =>
            option.setName("time")
              .setDescription("Enter the time in seconds you want to mute the user for.")
          ),

        new SlashCommandBuilder()
          .setName(UNMUTE_TRIGGER)
          .setDescription("Unmute a user already muted.")
          .addUserOption( option =>
            option.setName("user")
              .setDescription("Enter the name of user you want to unmute.")
              .setRequired(true)
          ),

        new SlashCommandBuilder()
          .setName(WARN_TRIGGER)
          .setDescription("Warn a user.")
          .addUserOption( option =>
            option.setName("user")
              .setDescription("Enter the name of the user you want to warn")
              .setRequired(true)
          )
          .addStringOption( option => 
            option.setName("reason")
              .setDescription("Enter the reason you want to warn the user for.")
          ),

        new SlashCommandBuilder()
          .setName(MEMBER_INFO_TRIGGER)
          .setDescription("See the history of previous infractions.")
          .addUserOption( option =>
              option.setName("user")
                .setDescription("Enter the name of the user you want to see the previous infractions of.")
                .setRequired(true)
          ),

        new SlashCommandBuilder()
          .setName(BAN_TRIGGER)
          .setDescription("Ban a user.")
          .addUserOption( option =>
              option.setName("user")
                .setDescription("Enter the user you want to ban.")
                .setRequired(true)
          )
          .addStringOption( option =>
            option.setName("reason")
              .setDescription("Enter the reason for which the user was banned.")
          ),

        new SlashCommandBuilder()
          .setName(KICK_TRIGGER)
          .setDescription("Kick a user.")
          .addUserOption( option => 
            option.setName("user")
              .setDescription("Enter the name of the person you want to kick.")
              .setRequired(true)
          )
          .addStringOption( option =>
            option.setName("reason")
              .setDescription("Enter the reason for which the user was kicked.")
          ),

        new SlashCommandBuilder()
          .setName(HELP_TRIGGER)
          .setDescription("Need help with commands?")
          .addStringOption( option =>
            option.setName("command")
              .setDescription("If you want to know more about a specific command, enter the command.")
              .addChoices(
                { name: "su", value: "su" },
                { name: "exit", value: "exit" },
                { name: "config", value: "config" },
                { name: "mute", value: "mute" },
                { name: "unmute", value: "unmute" },
                { name: "kick", value: "kick" },
                { name: "ban", value: "ban" },
                { name: "warn", value: "warn" },
                { name: "warnings", value: "warnings" },
                { name: "purge", value: "purge" }
              )
          ),

        new SlashCommandBuilder()
          .setName(PURGE_TRIGGER)
          .setDescription("Purge messages.")
          .addNumberOption( option =>
            option.setName("count")
              .setDescription("Number of messages to be deleted, less than 100.")
              .setRequired(true)
          )

    ].map(command => command.toJSON());

    const rest = new REST({ version: '9' }).setToken(BOT_TOKEN);

    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
        .then(() => console.log("Successfully registered application commands."))
        .catch(console.error);
}