CREATE DATABASE contractmicroservice;



/*
Before the uuid, execute...

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

*/


CREATE TABLE contracts (
    id uuid DEFAULT uuid_generate_v4 (),
    vacacancy_id      VARCHAR(40)   NOT NULL,
    restaurant_id     VARCHAR(40)   NOT NULL,
    description       VARCHAR(40)   NOT NULL,
    start_at          TIMESTAMPTZ     NOT NULL,
    end_at            TIMESTAMPTZ     NOT NULL,
    payment_per_hour  VARCHAR(40)   NOT NULL,
    country           VARCHAR(8)    NOT NULL,
    state             VARCHAR(30)   NOT NULL,
    city              VARCHAR(20)   NOT NULL,
    address           VARCHAR(120)  NOT NULL,
    workers           TEXT[],
    status            VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at        TIMESTAMPTZ   NOT NULL,
    updated_at        TIMESTAMPTZ,
    position_id         VARCHAR(1),

    PRIMARY KEY (id)
);

CREATE TABLE reviews (
    id uuid DEFAULT uuid_generate_v4 (),  
    description        VARCHAR(300) NOT NULL,
    user_id             VARCHAR(40) NOT NULL,
    score              VARCHAR(1) NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL,
    contract_id     uuid REFERENCES contracts(id),

    PRIMARY KEY(id, contract_id)
);

/* AS WE ARE USING ARRAYS IN A COLUMN, WE CREATE AN INDEX TO 
SPEED UP SEARCHING IN THIS COLUMN*/

create index idx_gin_workers on contracts using GIN(workers);