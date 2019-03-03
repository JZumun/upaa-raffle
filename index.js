const express = require("express");
const api = require("./src/api");
const debug = require("debug");
const history = require("connect-history-api-fallback");
const open = require("opn");

const log = debug("application:api");
const server = express();

const PORT = process.env.PORT || 3000;

server.use("/api", api);
server.use("/", express.static("./dist"));
server.use("/", history());
server.use("/", express.static("./dist"));
server.listen(PORT, () => {
  log(`listening on port ${PORT}`);
  open(`http://localhost:${PORT}`);
});
