import express from "express";
import { createRequestHandler } from "@react-router/express";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

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

const { default: build } = await import(pathToFileURL(buildPath).href);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(
  express.static(clientPath, {
    maxAge: "1h",
    index: false,
  }),
);

app.all("*", createRequestHandler({ build }));

app.listen(port, "0.0.0.0", () => {
  console.log(`React Router server listening on port ${port}`);
});
