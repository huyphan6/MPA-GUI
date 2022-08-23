DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    pwd VARCHAR(255) NOT NULL,
);


DROP TABLE IF EXISTS entries;

CREATE TABLE entries (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    recipient_manager VARCHAR(255) NOT NULL,
    report_name VARCHAR(255) NOT NULL,
    models VARCHAR(255) NOT NULL,
    report_type VARCHAR(255) NOT NULL,
    email_recipient VARCHAR(255) NOT NULL,
    frequency VARCHAR(255) NOT NULL,
    instance VARCHAR(255) NOT NULL,
    activation_date DATE NOT NULL,
    username VARCHAR(255) NOT NULL,
    FOREIGN KEY (username) REFERENCES users (username) 
);
