import * as fs from "fs";

const event = { event: "render", duration: Math.random() * 100 };
const line = JSON.stringify(event);

fs.appendFileSync("log.jsonl", line + "\n");

const raw = fs.readFileSync("log.jsonl", "utf-8");
const lines = raw.trim().split("\n");
const records = lines.map((line) => JSON.parse(line));

console.log(records);
