const sqlite = require("sqlite");
const sql = require("sql-template-strings");
const debug = require("debug");

const log = debug("application:database");

const initializeDatabase = sqlite
  .open("./db.sqlite")
  .then(db =>
    db.migrate({
      force: process.env.NODE_ENV === "development" ? "last" : undefined
    })
  )
  .then(db => db.exec(`PRAGMA foreign_keys = ON`));

const getQueryString = () => sql`
  SELECT p.id as id, 
         p.name as name, 
         w.id as winner
  FROM person p 
    LEFT JOIN winner w 
    ON p.id = w.person_id`;

const count = async (includingWinners = false) => {
  const db = await initializeDatabase;
  const q = sql`
    SELECT count(*) as count   
    FROM person p 
      LEFT JOIN winner w 
      ON p.id = w.person_id`;
  if (!includingWinners) {
    q.append(` WHERE w.person_id IS NULL `);
  }
  return (await db.get(q)).count;
};

const list = async () => {
  const db = await initializeDatabase;
  return await db.all(getQueryString());
};

const insert = async entry => {
  const db = await initializeDatabase;
  try {
    await db.run(
      sql`INSERT INTO person (id, name) VALUES (${entry.id}, ${entry.name})`
    );
  } catch (err) {
    log(`Error inserting entry`, entry, err.message);
    return false;
  }
  return true;
};

const insertMany = async entries => {
  return await Promise.all(
    entries.map(async entry => {
      return { id: entry.id, result: await insert(entry) };
    })
  );
};

const pickWinner = async () => {
  const db = await initializeDatabase;
  const winner = await db.get(
    getQueryString().append(`
      WHERE w.person_id IS NULL 
      ORDER BY RANDOM() 
      LIMIT 1`)
  );
  if (winner) {
    await db.run(sql`INSERT INTO winner (person_id) VALUES (${winner.id})`);
    return winner;
  } else {
    throw new Error("No winner found.");
  }
};

const remove = async id => {
  const db = await initializeDatabase;
  try {
    await db.run(sql`DELETE FROM person WHERE id = ${id}`);
  } catch (err) {
    log(`Error removing entry`, id, err.message);
    return false;
  }
  return true;
};

const clearWinners = async () => {
  const db = await initializeDatabase;
  await db.run("DELETE FROM winner");
  return true;
};

const clearAll = async () => {
  const db = await initializeDatabase;
  await db.run("DELETE FROM person");
  return true;
};

module.exports = {
  count,
  list,
  insert,
  insertMany,
  pickWinner,
  remove,
  clearWinners,
  clearAll
};
