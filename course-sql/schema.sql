CREATE TABLE courses (
    id INT PRIMARY KEY,  -- or SERIAL PRIMARY KEY in PostgreSQL
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    price VARCHAR(50) NOT NULL,
    tutor VARCHAR(255) NOT NULL
);