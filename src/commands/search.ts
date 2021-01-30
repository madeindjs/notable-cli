import { Command, flags } from "@oclif/command";
import * as cliSelect from "cli-select";
import * as path from "path";
import { getMarkdownFiles } from "../utils/files.utils";
import { getSettings } from "../utils/settings.utils";
const openEditor = require("open-editor");

export default class Search extends Command {
  static description = "describe the command here";

  static examples = [
    `$ notable-cli search '#nodejs Cheatsheet'`,
    `$ notable-cli search -t nodejs -c Cheatsheet`,
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    tags: flags.string({
      char: "t",
      description: "Tags to search",
      multiple: true,
    }),
    sort: flags.string({
      char: "s",
      description: "sort",
      options: ["created", "modified"],
    }),
    content: flags.string({ char: "c", multiple: true }),
  };
  static args = [{ name: "query" }];

  async run() {
    const { args, flags } = this.parse(Search);

    const query: string | undefined = args.query;

    if (query !== undefined) {
      let tagsMatches = query.match(/\#\w*/g);

      if (tagsMatches instanceof Array) {
        tagsMatches.forEach((m) => query.replace(m, ""));

        flags.tags = flags.tags instanceof Array ? flags.tags : [];
        flags.tags.push(...tagsMatches.map((m) => m.replace("#", "")));
      }

      flags.content = flags.content instanceof Array ? flags.content : [];
      flags.content.push(query);
    }

    const settings = await getSettings();

    if (settings.path === undefined) {
      this.error(
        "Please specify path with `$ notable-cli settings --path ~/Notes` "
      );
      return;
    }

    const files = await getMarkdownFiles(settings.path, flags);

    if (files.length === 0) {
      this.warn(`Cannot find any matching file`);
      return;
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
