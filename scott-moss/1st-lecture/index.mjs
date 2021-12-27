// console.log(__dirname, __filename);
// export const action = () => {
//   console.log("Hello");
// };

import { readFile, writeFile } from "fs/promises";

let template = await readFile(
  new URL("./template.html", import.meta.url),
  "utf-8"
);

const data = {
  title: "Learning Nodejs",
  body: "This is our first html using templating",
};

for (const [key, value] of Object.entries(data)) {
  template = template.replace(`{${key}}`, value);
}

// Write file into index.html
await writeFile(new URL("./index.html", import.meta.url), template);
