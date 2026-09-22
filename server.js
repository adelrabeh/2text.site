const express = require("express");
const { createRequestHandler } = require("@react-router/express");
const { existsSync } = require("node:fs");
const path = require("node:path");

const currentDir = __dirname;

const buildCandidates = [
  path.resolve(currentDir, "server/index.js"),
  path.resolve(currentDir, "dist/apps/web/server/index.js"),
];

const clientCandidates = [
  path.resolve(currentDir, "client"),
  path.resolve(currentDir, "dist/apps/web/client"),
];

const buildPath = buildCandidates.find((candidate) => existsSync(candidate));
const clientPath = clientCandidates.find((candidate) => existsSync(candidate));

if (!buildPath) {
  console.error("React Router server build not found.");
  console.error("Checked:", buildCandidates);
  process.exit(1);
}

if (!clientPath) {
  console.error("React Router client build not found.");
  console.error("Checked:", clientCandidates);
  process.exit(1);
}

const build = require(buildPath);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(
  express.static(clientPath, {
    maxAge: "1h",
    index: false,
  }),
);

app.use(createRequestHandler({ build }));

app.listen(port, "0.0.0.0", () => {
  console.log(`React Router server listening on port ${port}`);
});
