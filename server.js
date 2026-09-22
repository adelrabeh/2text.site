import { spawn } from "node:child_process";
import path from "node:path";

const cliPath = path.resolve("node_modules/@react-router/serve/dist/cli.js");
const buildPath = path.resolve("dist/apps/web/server/index.js");

const child = spawn(process.execPath, [cliPath, buildPath], {
  stdio: "inherit",
  env: {
    ...process.env,
    NODE_ENV: "production",
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
