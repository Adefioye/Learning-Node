fs = require("fs");
const projectName = process.argv[2] || "project";

// Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
// fs.mkdir("dogs", { recursive: true }, (err) => {
//   console.log("IN THE CALLBACK!!!");
//   if (err) throw err;
// });
// console.log("I come after MKDIR in the file");

fs.mkdirSync(projectName);
fs.writeFileSync(`${projectName}/index.html`, "");
fs.writeFileSync(`${projectName}/styles.css`, "");
fs.writeFileSync(`${projectName}/app.js`, "");
