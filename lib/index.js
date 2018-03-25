const fs = require("fs");
const program = require("commander");
const MarkdownIt = require("markdown-it");

let options;
let plugins;

function writeOutput(data, file) {
  if (file) {
    fs.writeFile(file, data, { encoding: "utf8" }, err => {
      console.log(`Wrote to ${file}`);
    });
  } else {
    console.log(data);
  }
}

function loadOptions() {
  try {
    const data = fs.readFileSync(".markdownitrc.json");
    const json = JSON.parse(data);
    options = json.options;
    plugins = json.plugins;
  } catch (err) {
    console.log(err);
  }
}

let markdownFile;

program
  .version("1.0.0")
  .option("-c, --config [configFile]", "Use a custom .markdownrc.json file")
  .option("-o, --output [outputFile]", "Write output to specified file")
  .arguments("<file>")
  .action(file => {
    markdownFile = file;
  })
  .parse(process.argv);

if (!markdownFile) {
  console.error("no file given!");
  process.exit(1);
}

loadOptions();
const md = new MarkdownIt();
plugins.forEach(plugin => {
  md.use(require(plugin.name), plugin.options);
});

fs.readFile(markdownFile, "utf8", (err, data) => {
  if (err) throw err;
  const result = md.render(data);
  writeOutput(result, program.output);
});

// md = new MarkdownIt();
// const result = md.render("# Example markdown");

// console.log(result);
