const express = require("express");
const api = require("./src/api");
const debug = require("debug");
const history = require("connect-history-api-fallback");
const open = require("opn");
const path = require("path");
const http = require('http');

const log = debug("application:api");
const app = express();

const PORT = process.env.PORT || 0;

app.use("/api", api);
app.use("/", express.static(path.join(__dirname, "dist")));
app.use("/", history());
app.use("/", express.static(path.join(__dirname, "dist")));

const server = http.createServer(app);
server.listen(PORT, () => {
  const port = server.address().port
  log(`listening on port ${port}`);
  open(`http://localhost:${port}`);
});
