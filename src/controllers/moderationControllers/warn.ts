import Discord from "discord.js";
import { Infraction } from "../../models/Infraction";
import { isSudoer, isSuperuser } from "../../utils/permissions";
import {
  sudoersWarningPopup,
  notRootError,
  createEmbed,
} from "../../utils/embeds";

/**
 * Warn a user and register that as an infraction
 * by default the infraction would be marked as just
 * a warn issued by the user
 *
 * @param {Discord.Message} msg
 * @param {Object} args
 */

const warnUser = async (msg: Discord.Message, args: Object) => {
  if ((await isSudoer(msg)) && msg.guild) {
    if (await isSuperuser(msg)) {
      const targetUser = msg.mentions.users.first();
      interface IArgs {
        reason?: string;
      }
      const { reason }: IArgs = args;
      const warnReason = reason
        ? reason
        : `warning issued by ${msg.author.username}`;
      if (targetUser) {
        await Infraction.create({
          server: msg.guild.id,
          user: targetUser.id,
          type: "WARN",
          reason: warnReason,
        });
        createEmbed(
          "(^▼ｪ▼ﾒ^)",
          `${targetUser.username} has been issued a warning with the reason\n${warnReason}`,
          msg.channel,
          "warn"
        );
      }
    } else {
      notRootError(msg);
    }
  } else {
    sudoersWarningPopup(msg);
  }
};

export { warnUser };
