import Discord, { CommandInteraction } from "discord.js";
import { argParse } from "../utils/argParse";
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
} from "../constants/triggers";
import { handleOnboarding } from "./utilityControllers/onboarding";
import { root, exitRoot } from "./moderationControllers/su";
import { muteUser, unmuteUser } from "./moderationControllers/mute";
import { warnUser, showUserInfo } from "./moderationControllers/warn";
import { banUser, kickUser } from "./moderationControllers/removeMember";
import { HandleHelp, helpHandler } from "./utilityControllers/help";
import { purgeMessages } from "./moderationControllers/purge";

/**
 * send command not recognized error
 *
 * @param {String} command
 * @param {Discord.Message} msg
 */

const notRecognisedError = async (command: string, msg: Discord.Message) => {
  msg.channel.send(
    `${
      command.split("$")[1]
    } isn't recognized as an internal or external command`
  );
};

/**
 * Handle a message that is sent to the bot and parse it for
 * commands and then if there is a command that is found matching
 * the trigger then execute that command;
 *
 * @param {Discord.Message} - msg
 * @returns {Promise<void>}
 */

export const HandleMessage = async (msg: Discord.Message): Promise<void> => {
  const command: string = msg.content.split(" ")[0];
  if (command.startsWith("$")) {
    const args =
      msg.content.split(" ").length >= 2
        ? argParse(msg.content.substring(msg.content.indexOf(" ") + 1))
        : {};

    switch (command.split("$").pop()) {
      case ONBOARDING_TRIGGER:
        return handleOnboarding(msg, args);
      case SUPERUSER_TRIGGER:
        return root(msg);
      case EXIT_TRIGGER:
        return exitRoot(msg);
      case MUTE_TRIGGER:
        return muteUser(msg, args);
      case UNMUTE_TRIGGER:
        return unmuteUser(msg);
      case WARN_TRIGGER:
        return warnUser(msg, args);
      case MEMBER_INFO_TRIGGER:
        return showUserInfo(msg);
      case BAN_TRIGGER:
        return banUser(msg, args);
      case KICK_TRIGGER:
        return kickUser(msg, args);
      case HELP_TRIGGER:
        return HandleHelp(msg);
      case PURGE_TRIGGER:
        return purgeMessages(msg, args)
      default:
        return notRecognisedError(command, msg);
    }
  }
};

/**
 * Handle the command that is issued to the bot and send it to its correct location;
 *
 * @param {Discord.CommandInteraction} - interaction
 * @returns {Promise<void>}
 */

export const HandleCommand = async (interaction: Discord.CommandInteraction): Promise<void> => {
  const { commandName } = interaction;
  switch (commandName) {
  //   case ONBOARDING_TRIGGER:
  //     return onboardingHandler(interaction);
  //   case SUPERUSER_TRIGGER:
  //     return rootHandler(interaction);
  //   case EXIT_TRIGGER:
  //     return exitHandler(interaction);
  //   case MUTE_TRIGGER:
  //     return muteHandler(interaction);
  //   case UNMUTE_TRIGGER:
  //     return unmuteHandler(interaction);
  //   case WARN_TRIGGER:
  //     return warnHandler(interaction);
  //   case MEMBER_INFO_TRIGGER:
  //     return memberInfoHandler(interaction);
  //   case BAN_TRIGGER:
  //     return banHandler(interaction);
  //   case KICK_TRIGGER:
  //     return kickHandler(interaction);
    case HELP_TRIGGER:
      return helpHandler(interaction);
  //   case PURGE_TRIGGER:
  //     return purgeHandler(interaction);
  }
}
