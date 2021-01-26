import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { ISettings } from "../interfaces/settings.interface";

export function getSettings(): ISettings {
  const settingsPath = getSettingsPath();

  if (fs.existsSync(settingsPath)) {
    const settings = fs.readFileSync(settingsPath, { encoding: "utf8" });
    return JSON.parse(settings);
  } else {
    return {};
  }
}

export function getSettingsPath(): string {
  return path.join(os.homedir(), ".notable-cli.json");
}

export function updateSettings(settings: ISettings) {
  const oldSetting = getSettings();

  fs.writeFileSync(
    getSettingsPath(),
    JSON.stringify({ ...oldSetting, ...settings }, undefined, 2),
    { encoding: "utf8" }
  );
}
