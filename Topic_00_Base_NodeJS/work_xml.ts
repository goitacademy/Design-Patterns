import * as fs from "fs";

import { XMLBuilder, XMLParser } from "fast-xml-parser";

const data = {
  report: {
    title: "Monthly",
    items: [
      { name: "Item A", value: 42 },
      { name: "Item B", value: 15 },
    ],
  },
};

const builder = new XMLBuilder({ format: true });
const xml = builder.build(data);

fs.writeFileSync("report.xml", xml, "utf-8");

const raw = fs.readFileSync("report.xml", "utf-8");
const parser = new XMLParser();
const obj = parser.parse(raw);

console.log(obj.report.title); // 'Monthly'
