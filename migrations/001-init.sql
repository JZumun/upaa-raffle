-- Up
CREATE TABLE person (
  id TEXT PRIMARY KEY, 
  name TEXT NOT NULL
);
CREATE TABLE winner (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  person_id TEXT NOT NULL REFERENCES person(id) ON DELETE CASCADE
);

-- Down
DROP TABLE winner;
DROP TABLE person;