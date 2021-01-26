import { promises } from "fs";
import { extname, join } from "path";
import matter = require("gray-matter");

const MD_EXTENSIONS = [".md", ".markdown"];

export async function walk(
  directory: string,
  filepaths: string[] = []
): Promise<string[]> {
  const files = await promises.readdir(directory);
  for (let filename of files) {
    const filepath = join(directory, filename);

    const isDirectory = await promises
      .stat(filepath)
      .then((s) => s.isDirectory());

    if (isDirectory) {
      await walk(filepath, filepaths);
    } else if (MD_EXTENSIONS.includes(extname(filename))) {
      filepaths.push(filepath);
    }
  }
  return filepaths;
}

export async function getMarkdownTags(path: string): Promise<string[]> {
  // console.log(`getMarkdownTags on ${path}`)
  const content = await promises.readFile(path, { encoding: "utf8" });
  const { data } = matter(content);

  if (data.tags instanceof Array) {
    return data.tags;
  }
  return [];
}
