import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

const candidates = [
  {
    cliPath: path.resolve(currentDir, "node_modules/@react-router/serve/dist/cli.js"),
    buildPath: path.resolve(currentDir, "server/index.js"),
  },
  {
    cliPath: path.resolve(currentDir, "node_modules/@react-router/serve/dist/cli.js"),
    buildPath: path.resolve(currentDir, "dist/apps/web/server/index.js"),
  },
];

const target = candidates.find(
  ({ cliPath, buildPath }) => existsSync(cliPath) && existsSync(buildPath),
);

if (!target) {
  console.error("React Router production files were not found.");
  console.error("Checked:", candidates);
  process.exit(1);
}

const child = spawn(process.execPath, [target.cliPath, target.buildPath], {
  stdio: "inherit",
  env: {
    ...process.env,
    NODE_ENV: "production",
    PORT: process.env.PORT || "3000",
  },
});

child.on("error", (error) => {
  console.error("Failed to start React Router server:", error);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 1);
  }
});
