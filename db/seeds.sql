USE employee_db;

INSERT INTO department (id, name)
VALUES (1, 'Soldier'),
       (2, 'Smuggling'),
       (3, 'Legal'),
       (4, 'R&D | Future Crimes');

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Capo', 1000000, NULL),
       (2, 'Capo', 350000, 1),
       (3, 'Capo', 350000, 2),

       (4, 'VP of Smuggling', 200000, 1),
       (5, 'VP of Soliders', 200000, 2),
       (6, 'VP of Legal', 250000, 3),
       (7, 'VP of Future Crimes', 200000, 4),

       (8, 'Drug Ring Director', 175000, 1),
       (9, 'Finance Director', 175000, 2),
       (10, 'Legal Director', 200000, 3),
       (11, 'Customer Aquisition Director', 175000, 4),
       (12, 'Director of Bribing', 175000, 4),

       (13, 'Street Boss', 150000, 1),
       (14, 'Drug Tester', 150000, 1),
       (15, 'Lead Lawyer', 150000, 3),
       (16, '"Product" Manager', 150000, 4),
       (17, 'Bribing Manager', 150000, 4),

       (18, 'Seller', 100000, 1),
       (19, 'Pickup Man', 80000, 2),
       (20, 'Lawyer', 125000, 3),
       (21, 'Dealer', 80000, 4),
       (22, 'Muscle', 75000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Tony', 'Soprano', 1, NULL),
       (2, 'Corrado', 'Soprano', 2, 1),
       (3, 'Paulie', 'Gautieri', 4, 1),
       (4, 'Silvio', 'Dante', 6, 1),
       (5, 'Lawrence', 'Barese', 7, 1);

-- These employees have no one reporting to them, so don't need to set an id --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
       ('Christopher', 'Moltistani', 18, 2),
       ('Bobby', 'Baccalieri', 18, 2),
       ('Jason', 'Parisi', 18, 2),
       ('Brendan', 'Filone', 18, 2),
       ('Furio', 'Giunta', 18, 2),
       ('Peter', 'Germani', 14, 3),
       ('Jackie', 'Aprile', 14, 3),
       ('Ralph', 'Cifaretto', 22, 5),
       ('Vito', 'Spatafore', 18, 2);