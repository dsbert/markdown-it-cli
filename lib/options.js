const fs = require("fs");

function load(path) {
  const rcpath = path || ".markdownitrc.json";

  try {
    const data = fs.readFileSync(rcpath);
    const json = JSON.parse(data);
    return {
      options: json.options,
      plugins: json.plugins
    };
  } catch (err) {
    console.error(err);
  }
  return { options: {}, plugins: [] };
}

module.exports = {
  load
};
