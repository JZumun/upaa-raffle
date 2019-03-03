const express = require("express");
const db = require("./db");
const multer = require("multer");
const parse = require("csv-parse/lib/sync");
const debug = require("debug");

const app = express();
const upload = multer();
const log = debug("application:api");

const handler = cb => async (req, res) => {
  try {
    const result = await cb(req);
    return res.json({
      success: true,
      result
    });
  } catch (err) {
    log(err);
    return res.json({
      success: false,
      error:
        process.env.NODE_ENV === "development"
          ? {
              message: err.message,
              stack: err.stack
            }
          : err.message
    });
  }
};

app.get("/", handler(db.list));

app.get(
  "/count",
  handler(async req => {
    return await db.count(req.query.includingWinners);
  })
);

app.post("/", express.json(), handler(req => db.insert(req.body)));

app.post(
  "/upload",
  upload.single("file"),
  handler(req => {
    const data = parse(req.file.buffer.toString(), {
      columns: true,
      skip_empty_lines: true
    });
    return db.insertMany(
      data.map(datum => ({
        name: `${datum["FIRST NAME"]} ${datum["MIDDLE NAME"]} ${
          datum["LAST NAME"]
        }`,
        id: datum["STUDENT NUMBER"]
      }))
    );
  })
);

app.post("/raffle", handler(db.pickWinner));

app.delete("/raffle", handler(db.clearWinners));

app.delete("/", handler(db.clearAll));

app.delete("/entry/:id", handler(req => db.remove(req.params.id)));

module.exports = app;

if (require.main === module) {
  express()
    .use("/api", app)
    .listen(3000, () => {
      log("listening");
    });
}
