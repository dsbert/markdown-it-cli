const assert = require("assert");
const sinon = require("sinon");
const options = require("../lib/options");

describe("options", function() {
  it("should report an error if path is not found", () => {
    options.load("does not exist");
  });
});
