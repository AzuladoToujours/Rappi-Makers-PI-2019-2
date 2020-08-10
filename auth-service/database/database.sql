CREATE DATABASE authmicroservice;



CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE accounts (
    id                VARCHAR(40) NOT NULL,
    email             VARCHAR(40) NOT NULL,
    hashed_password   VARCHAR(100) NOT NULL,
    user_id           VARCHAR(40),
    restaurant_id     VARCHAR(40),

    PRIMARY KEY (id)
);

CREATE TABLE password_resets (
    id uuid DEFAULT uuid_generate_v4 (),  
    email        VARCHAR(40) NOT NULL,
    token        VARCHAR(500) NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL,
    account_id     VARCHAR(40) REFERENCES accounts(id),

    PRIMARY KEY(id)
);


ALTER TABLE password_resets ALTER COLUMN token TYPE varchar(500);


