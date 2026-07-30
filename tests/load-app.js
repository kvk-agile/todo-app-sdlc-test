"use strict";

// Loads the inline <script> from index.html into a CommonJS module context so
// the pure logic functions can be unit tested without a browser or build step.

const fs = require("fs");
const path = require("path");
const vm = require("vm");

function loadAppModule() {
  const htmlPath = path.join(__dirname, "..", "index.html");
  const html = fs.readFileSync(htmlPath, "utf8");

  const match = html.match(/<script>([\s\S]*?)<\/script>/);
  if (!match) {
    throw new Error("Could not find inline <script> block in index.html");
  }

  const sandbox = { module: { exports: {} }, console };
  vm.createContext(sandbox);
  vm.runInContext(match[1], sandbox, { filename: "index.html-inline-script.js" });

  return sandbox.module.exports;
}

module.exports = { loadAppModule };
