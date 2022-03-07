-- Let's go with an oil and gas company for our departments

INSERT INTO department (name:) 
VALUES ("Exploration"),
       ("Land"),
       ("Operations"),
       ("Business Development"),
       ("Legal");

INSERT INTO role (title:, salary:, department_id:)
VALUES  ("Wildcatter", "487000", 1),
        ("Geoscientist", "103000", 1),
        ("Geologist", "92000", 1),
        ("Landman", "95000", 2),
        ("Resorvoir Engineer", "155000", 3),
        ("Drilling Engineer", "120000", 3),
        ("Data Scientist", "81000", 3)
        ("Director of Business Development", "208000", 4),
        ("Account Manager", "105000", 4),
        ("General Counsel", "207000", 5),
        ("Contract Specialits", "92000", 5),
        ("Paralegal", "78000", 5);

INSERT INTO employee (first_name:, last_name:, role_id:, manger_id:)
VALUES  ("James-Robert", "Moffett", 1, 1),
        ("Herman", "Mueller", 2, 2),
        ("Tom", "Landing", 3, 3),
        ("Jim", "Ritchie", 4, 1),
        ("Benny", "Jones", 5, NULL),
        ("Johnny", "Depth", 6, NULL),
        ("Glenn", "Finder", 7, NULL),
        ("Richard", "Adkers", 8, 1),
        ("Cindy", "Moly", 9, 1),
        ("Lacey", "Smith", 10, 1),
        ("Erwin", "James", 11, NULL),
        ("Hank", "Hill", 12, NULL);

        