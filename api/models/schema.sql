SET client_encoding = 'UTF-8';

CREATE SEQUENCE post_id_seq
    INCREMENT BY 1
    START 1;

CREATE TABLE post (
    post_id integer DEFAULT nextval('post_id_seq'::regclass) NOT NULL,
    title varchar(255),
    descriptions varchar(1000),
    img varchar(255),
    postdate date,
    user_id integer NOT NULL
);

CREATE SEQUENCE user_id_seq 
    INCREMENT BY 1
    START 1;

CREATE TABLE users (
    user_id integer DEFAULT nextval('user_id_seq'::regclass) NOT NULL,
    username varchar(255),
    email varchar(100),
    img varchar(255),
    pwd varchar(255)
)

ALTER TABLE post ADD cat varchar(50);   