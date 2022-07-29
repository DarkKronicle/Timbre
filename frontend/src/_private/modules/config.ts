import toml from 'toml';
import path from 'path';
import fs from "fs"
export default function getConfig(): App.Config {
    return toml.parse(fs.readFileSync(path.resolve("../config.toml"), "utf8"))
}