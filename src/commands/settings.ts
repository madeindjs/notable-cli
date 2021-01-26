import { Command, flags } from "@oclif/command";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

interface ISettings {
  path?: string;
}

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

  get settingsPath(): string {
    return path.join(os.homedir(), ".notable-cli.json");
  }

  async run() {
    const { flags } = this.parse(Settings);

    const settings = this.getCurrentConfiguration();

    if (flags.path) {
      settings.path = flags.path;
    }

    fs.writeFileSync(
      this.settingsPath,
      JSON.stringify(settings, undefined, 2),
      { encoding: "utf8" }
    );

    this.log(`Settings updated to ${this.settingsPath}`);
  }

  private getCurrentConfiguration(): ISettings {
    if (fs.existsSync(this.settingsPath)) {
      const settings = fs.readFileSync(this.settingsPath, { encoding: "utf8" });
      return JSON.parse(settings);
    } else {
      return {};
    }
  }
}
