import { Command, flags } from "@oclif/command";
import { getMarkdownTags, walk } from "../utils/files.utils";
import { getSettings } from "../utils/settings.utils";

export default class Search extends Command {
  static description = "describe the command here";

  static examples = [
    `$ notable-cli hello
hello world from ./src/hello.ts!
`,
  ];

  static flags = {
    // help: flags.help({ char: "h" }),
    // // flag with a value (-n, --name=VALUE)
    tags: flags.string({
      char: "t",
      description: "Tags to search",
      multiple: true,
    }),
    // // flag with no value (-f, --force)
    // force: flags.boolean({ char: "f" }),
    // test: flags.boolean({ char: "t" }),
  };

  // static args = [{ name: "tags" }];

  async run() {
    const { args, flags } = this.parse(Search);

    const settings = await getSettings();

    if (settings.path === undefined) {
      this.error(
        "Please specify path with `$ notable-cli settings --path ~/Notes` "
      );
      return;
    }

    let files = await walk(settings.path);

    if (flags.tags !== undefined) {
      const fileToRemove: string[] = [];

      for (const file of files) {
        const tags = await getMarkdownTags(file);

        if (!tags.some((tag) => flags.tags.includes(tag))) {
          fileToRemove.push(file);
        }
      }

      files = files.filter((file) => !fileToRemove.includes(file));
    }

    files.forEach((file) => this.log(file));
  }
}
