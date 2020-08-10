CREATE DATABASE vacancymicroservice;



/*
Before the uuid, execute...

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

*/


CREATE TABLE vacancies (
    id uuid DEFAULT uuid_generate_v4 (),
    restaurant_id     VARCHAR(40)   NOT NULL,
    description       VARCHAR(300)   NOT NULL,
    start_at          TIMESTAMPTZ     NOT NULL,
    end_at            TIMESTAMPTZ     NOT NULL,
    offers_quantity   VARCHAR(2)    NOT NULL,
    hireds            TEXT[],
    payment_per_hour  VARCHAR(20)   NOT NULL,
    country           VARCHAR(8)    NOT NULL,
    state             VARCHAR(30)   NOT NULL,
    city              VARCHAR(20)   NOT NULL,
    address           VARCHAR(120)  NOT NULL,
    candidates        TEXT[],
    status            VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at        TIMESTAMPTZ   NOT NULL,
    updated_at        TIMESTAMPTZ,
    position_id         VARCHAR(1),

    PRIMARY KEY (id)
);



/* AS WE ARE USING ARRAYS IN A COLUMN, WE CREATE AN INDEX TO 
SPEED UP SEARCHING IN THIS COLUMN*/

create index idx_gin_candidates on vacancies using GIN(candidates);