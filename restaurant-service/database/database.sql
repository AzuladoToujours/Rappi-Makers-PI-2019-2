CREATE DATABASE restaurantmicroservice;


-- Before the uuid, execute...

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


--SI SE TIENE EL BALANCE COMO EL PASADO, HACER ÉSTE CAMBIO
-- alter table restaurants alter column balance type decimal(10,2);

CREATE TABLE restaurants (
    id uuid DEFAULT uuid_generate_v4 (),
    nit VARCHAR(10) NOT NULL,
    name VARCHAR(40) NOT NULL,
    email VARCHAR(40) NOT NULL,
    mobile VARCHAR(10) NOT NULL,
    country           VARCHAR(8) NOT NULL,
    state             VARCHAR(30) NOT NULL,
    city              VARCHAR(20) NOT NULL,
    address           VARCHAR(120) NOT NULL,
    description       VARCHAR(40),
    balance           NUMERIC(10,2) DEFAULT 0 NOT NULL,
    created_at        TIMESTAMPTZ NOT NULL,

    PRIMARY KEY(id)
);


ALTER TABLE restaurants ADD COLUMN photo VARCHAR(500) DEFAULT 'https://rappimakers-photos.s3.amazonaws.com/restaurants-photos/defaultpicture.png' NOT NULL;


ALTER TABLE restaurants ADD COLUMN updated_at TIMESTAMPTZ;