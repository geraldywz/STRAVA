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
    route_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL,
    waypoints VARCHAR(256) NOT NULL,
    distance DECIMAL(7, 2) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY(route_id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);
CREATE TABLE workouts(
    workout_id INT NOT NULL AUTO_INCREMENT,
    waypoints VARCHAR(256) NOT NULL,
    distance DECIMAL(7, 2) NOT NULL,
    start DATETIME NOT NULL,
    weather VARCHAR(64) NOT NULL,
    weather_last_updated DATETIME NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY(workout_id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);