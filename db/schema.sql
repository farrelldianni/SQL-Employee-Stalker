DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE exmployee_db;

CREATE TABLE deparment (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    deparment_id INT,
    FOREIGN KEY (deparment_id),
    REFERENCES department(id),
    ON DELETE SET NULL
);

CREATE TABLE exmployee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id),
    REFERENCES role(id),
    ON DELETE SET NULL, 
    FOREIGN KEY (manager_id),
    REFERENCES exmployee(id),
    ON DELETE SET NULL,
);