const fs = require("fs");
const program = require("commander");
const MarkdownIt = require("markdown-it");
const loadOptions = require("./options").load;

function writeOutput(data, file) {
  if (file) {
    fs.writeFile(file, data, { encoding: "utf8" }, err => {
      console.log(`Wrote to ${file}`);
    });
  } else {
    console.log(data);
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

const { options, plugins } = loadOptions(program.config);
const md = new MarkdownIt(options);
plugins.forEach(plugin => {
  let package;
  try {
    package = require(plugin.name);
    md.use(package, plugin.options);
  } catch (err) {
    console.error(`Error: Failed to load plugin "${plugin.name}"`);
    process.exit(1);
  }
});

fs.readFile(markdownFile, "utf8", (err, data) => {
  if (err) throw err;
  const result = md.render(data);
  writeOutput(result, program.output);
});

// md = new MarkdownIt();
// const result = md.render("# Example markdown");

// console.log(result);
