CREATE DATABASE paymentmicroservice;

/*
Before the uuid, execute...

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

*/


CREATE TABLE payments (
    id uuid DEFAULT uuid_generate_v4 (),
    method VARCHAR(40) NOT NULL DEFAULT 'LOCAL',
    date   TIMESTAMPTZ     NOT NULL,
    service VARCHAR(40) NOT NULL DEFAULT 'LOCAL',
    amount VARCHAR(40) NOT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE transactions (
    id uuid DEFAULT uuid_generate_v4 (),
    restaurant_id VARCHAR(40),
    vacancy_id VARCHAR(40),
    payment_id  uuid REFERENCES payments(id),

    PRIMARY KEY (id, payment_id)

);

CREATE TABLE contracts_transactions (
    id uuid DEFAULT uuid_generate_v4 (),
    contract_id VARCHAR(40),
    user_id VARCHAR(40),
    payment_id  uuid REFERENCES payments(id),

    PRIMARY KEY (id, contract_id, user_id, payment_id)
);