DROP schema IF EXISTS strava;
CREATE DATABASE strava;
USE strava;
CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL,
    email VARCHAR(128) NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE routes(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL,
    waypoints VARCHAR(256) NOT NULL,
    distance DECIMAL(7, 2) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);
CREATE TABLE workouts(
    id INT NOT NULL AUTO_INCREMENT,
    waypoints VARCHAR(256) NOT NULL,
    distance DECIMAL(7, 2) NOT NULL,
    start TIMESTAMP NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);