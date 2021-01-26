import { Command, flags } from "@oclif/command";
import { getSettingsPath, updateSettings } from "../utils/settings.utils";

export default class Settings extends Command {
  static description = "Set settings of notable-cli";

  static examples = [`$ notable-cli settings --path ~/Notable/notes`];

  static flags = {
    help: flags.help({ char: "h" }),
    path: flags.string({
      char: "p",
      description: "Set path of Notables notes",
    }),
  };

  async run() {
    const { flags } = this.parse(Settings);

    updateSettings(flags);

    this.log(`Settings updated to ${getSettingsPath()}`);
  }
}
