import { Command, flags } from "@oclif/command";
import * as cliSelect from "cli-select";
import { promises } from "fs";
import * as path from "path";
import { getMarkdownTags, walk } from "../utils/files.utils";
import { getSettings } from "../utils/settings.utils";
const openEditor = require("open-editor");

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

    if (files.length === 0) {
      this.log(`Cannot find any matching file`);
    } else if (files.length === 1) {
      openEditor(files);
    } else {
      const { value }: { value: string } = await cliSelect({
        values: files,
        valueRenderer: (value: string, selected: boolean) =>
          value.replace(settings.path as string, "").replace(path.sep, ""),
      });

      openEditor([value]);
    }
  }
}
