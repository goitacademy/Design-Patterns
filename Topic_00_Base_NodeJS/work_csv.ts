import * as fs from "fs/promises";

interface RecordType {
  name: string;
  age: number;
  role: string;
}

const records: RecordType[] = [
  { name: "Alice", age: 30, role: "developer" },
  { name: "Bob", age: 25, role: "designer" },
];

const header = Object.keys(records[0]) as (keyof RecordType)[];
const rows = records.map((obj) => header.map((h) => String(obj[h])).join(","));
const csv = [header.join(","), ...rows].join("\n");

(async () => {
  await fs.writeFile("output.csv", csv, "utf-8");

  const raw = await fs.readFile("output.csv", "utf-8");
  const [head, ...lines] = raw.trim().split("\n");
  const keys = head.split(",");

  const parsed = lines.map((line) => {
    const values = line.split(",");
    return Object.fromEntries(values.map((v, i) => [keys[i], v]));
  });

  console.log(parsed);
})();
