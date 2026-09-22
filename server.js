const express = require("express");
const { createRequestHandler } = require("@react-router/express");
const build = require("./server/index.js");

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(
  express.static("./client", {
    maxAge: "1h",
    index: false,
  }),
);

app.all("*", createRequestHandler({ build }));

app.listen(port, "0.0.0.0", () => {
  console.log(`React Router server listening on port ${port}`);
});
