const assert = require("assert");
const sinon = require("sinon");
const loadOptions = require("../lib/options").load;

describe("options", function() {
  xit("should report an error if path is not found", () => {
    options.load("does not exist");
  });

  it("should load a local .markdownrc.json by default", () => {
    const { options, plugins } = loadOptions();
    assert(plugins.length > 0, "Should load plugins");
    assert(Object.prototype.hasOwnProperty.apply(options, ["html"]));
  });
});
