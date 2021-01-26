import { constants, promises } from "fs";
import * as os from "os";
import * as path from "path";
import { ISettings } from "../interfaces/settings.interface";

function isFileExists(file: string): Promise<boolean> {
  return promises
    .access(file, constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

export async function getSettings(): Promise<ISettings> {
  const settingsPath = getSettingsPath();

  if (await isFileExists(settingsPath)) {
    const settings = await promises.readFile(settingsPath, {
      encoding: "utf8",
    });
    return JSON.parse(settings);
  } else {
    return {};
  }
}

export function getSettingsPath(): string {
  return path.join(os.homedir(), ".notable-cli.json");
}

export async function updateSettings(settings: ISettings): Promise<void> {
  const oldSetting = await getSettings();

  return promises.writeFile(
    getSettingsPath(),
    JSON.stringify({ ...oldSetting, ...settings }, undefined, 2),
    { encoding: "utf8" }
  );
}
