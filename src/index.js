const express = require("express");
const api = require("./api");
const debug = require("debug");
const history = require("connect-history-api-fallback");
const open = require("opn");
const path = require("path");
const http = require('http');

const log = debug("application:api");
const app = express();

app.use("/api", api);
app.use("/", express.static(path.join(__dirname, "ui/dist")));
app.use("/", history());
app.use("/", express.static(path.join(__dirname, "ui/dist")));

const server = http.createServer(app);

module.exports = server;

if (process.mainModule = module) {
  const PORT = process.env.PORT || 0;
  server.listen(PORT, () => {
    const port = server.address().port
    log(`listening on port ${port}`);
    open(`http://localhost:${port}`);
  });
}

