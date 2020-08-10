CREATE DATABASE usersmicroservice;

CREATE TABLE dni_type (
    id VARCHAR(1) NOT NULL,
    description VARCHAR(20) NOT NULL,

        PRIMARY KEY (id)

);

INSERT INTO dni_type (id, description) VALUES ('1', 'CC')



CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


--SI SE TIENE EL BALANCE COMO EL PASADO, HACER ÉSTE CAMBIO
-- alter table users alter column balance type decimal(10,2);

CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4 (),
    identity_card VARCHAR(10) NOT NULL,
    names             VARCHAR(40) NOT NULL,
    last_names        VARCHAR(40) NOT NULL,
    gender            VARCHAR(1),
    birthday          DATE NOT NULL,
    email             VARCHAR(40) NOT NULL,
    mobile            VARCHAR(10) NOT NULL,
    country           VARCHAR(8) NOT NULL,
    state             VARCHAR(30) NOT NULL,
    city              VARCHAR(20) NOT NULL,
    address           VARCHAR(120) NOT NULL,
    positions         TEXT[],
    description       VARCHAR(40),
    balance           NUMERIC(10,2) DEFAULT 0 NOT NULL,
    created_at        TIMESTAMPTZ NOT NULL,
    updated_at        TIMESTAMPTZ,
    dni_type_id       VARCHAR(1) REFERENCES dni_type(id),

    PRIMARY KEY (id)
);

ALTER TABLE users ADD COLUMN photo VARCHAR(1000) DEFAULT 'https://rappimakers-photos.s3.amazonaws.com/users-photos/defaultpicture.png' NOT NULL;


create index idx_gin_positions on users using GIN(positions);


