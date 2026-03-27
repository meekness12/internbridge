-- RUN THIS IN YOUR pgAdmin OR SQL TERMINAL TO FIX THE 500 ERRORS
-- This drops the old tables with incorrect 'INT' types and recreates them
-- with the 'UUID' types required by the Java code.

DROP TABLE IF EXISTS logbooks CASCADE;
DROP TABLE IF EXISTS placements CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS internships CASCADE;

-- Hibernate will automatically recreate these correctly with UUIDs 
-- because ddl-auto is set to 'update'.
