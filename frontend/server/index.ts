import express from "express"
import path from "path"
import toml from "toml"
import fs from "fs"
import type Config from "../types/configTypes"

export const config = toml.parse(fs.readFileSync(path.resolve("../config.toml")).toString()) as Config

const app = express()

app.use("/", express.static(path.resolve("./public")))

//index route
app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/index.html"))
})

app.listen(config.frontend.http_port, () => {
    console.log(`Server listening on port ${config.frontend.http_port}`)
})