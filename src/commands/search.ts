import { Command, flags } from "@oclif/command";
import { promises } from "fs";
import { getMarkdownTags, walk } from "../utils/files.utils";
import { getSettings } from "../utils/settings.utils";

export default class Search extends Command {
  static description = "describe the command here";

  static examples = [
    `$ notable-cli search -t nodejs -c Cheatsheet
/home/alexandre/Documents/@plaintext/notes/Javascript - Cheatsheet.md
`,
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    // // flag with a value (-n, --name=VALUE)
    tags: flags.string({
      char: "t",
      description: "Tags to search",
      multiple: true,
    }),
    // flag with no value (-f, --force)
    content: flags.string({ char: "c", multiple: true }),
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
      const fileToExclude: string[] = [];

      for (const file of files) {
        const tags = await getMarkdownTags(file);

        if (!flags.tags.every((tag) => tags.includes(tag))) {
          fileToExclude.push(file);
        }
      }

      files = files.filter((file) => !fileToExclude.includes(file));
    }

    if (flags.content !== undefined) {
      const fileToExclude: string[] = [];

      for (const file of files) {
        const fileContent = await promises.readFile(file);

        if (!flags.content.every((content) => fileContent.includes(content))) {
          fileToExclude.push(file);
        }
      }

      files = files.filter((file) => !fileToExclude.includes(file));
    }

    files.forEach((file) => this.log(file));
  }
}
