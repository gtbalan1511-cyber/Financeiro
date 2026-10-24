CREATE TABLE IF NOT EXISTS progress (
 id INTEGER PRIMARY KEY CHECK(id=1),
 revision INTEGER NOT NULL,
 payload TEXT NOT NULL,
 updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS progress_history (
 revision INTEGER PRIMARY KEY, payload TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE TRIGGER IF NOT EXISTS preserve_progress BEFORE UPDATE ON progress BEGIN
 INSERT OR IGNORE INTO progress_history VALUES (OLD.revision, OLD.payload, OLD.updated_at);
 DELETE FROM progress_history WHERE revision < OLD.revision - 19;
END;
