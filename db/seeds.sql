INSERT INTO department (department) 
VALUES ("Exploration"),
       ("Land"),
       ("Operations"),
       ("Business Development"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("Wildcatter", "487000", 1),
        ("Geoscientist", "103000", 1),
        ("Geologist", "92000", 1),
        ("Landman", "95000", 2),
        ("Resorvoir Engineer", "155000", 3),
        ("Drilling Engineer", "120000", 3),
        ("Data Scientist", "81000", 3),
        ("Director of Business Development", "208000", 4),
        ("Account Manager", "105000", 4),
        ("General Counsel", "207000", 5),
        ("Contract Specialits", "92000", 5),
        ("Paralegal", "78000", 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("James-Robert", "Moffett", 1, 1),
        ("Herman", "Mueller", 2, 1),
        ("Tom", "Landing", 3, 1),
        ("Jim", "Ritchie", 4, 1),
        ("Benny", "Jones", 5, 1),
        ("Johnny", "Depth", 6, 1),
        ("Glenn", "Finder", 7, 1),
        ("Richard", "Adkers", 8, 1),
        ("Cindy", "Moly", 9, 9),
        ("Lacey", "Smith", 10, 10),
        ("Erwin", "James", 11, 10),
        ("Hank", "Hill", 12, 10);

        