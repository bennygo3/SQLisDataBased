const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./config/connection');

const mainMenu = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'main',
                message: 'Please choose from one of the options listed:',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    // new inquirer.Separator('---'),
                    'Add a new department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role'
                ],
                loop: false
            }
        ])
        .then((response) => {
            switch (response.main) {
                case 'View all departments': viewDepts(); break;
                case 'View all roles': viewRoles(); break;
                case 'View all employees': viewEmps(); break;
                case 'Add a new department': addDept(); break;
                case 'Add a role': addRole(); break;
                case 'Add an employee': addEmp(); break;
                case 'Update an employee role': updateRole(); break;
                default: console.log(response); break;
            }
        })
}

function viewDepts() {
    const query = `SELECT * FROM department`;
    db.query(query, (err, rows) => {

        if (err) {
            console.log(err);
            return;
        } else {
            console.table(rows);
        }
        mainMenu();
    });
}

function viewRoles() {
    const query = 'SELECT * FROM role';
    db.query(query, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        } else { console.table(rows); }
        mainMenu();
    });
}

function viewEmps() {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary, employee.manager_id 
    FROM employee LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id`;
    db.query(query, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        } else { console.table(rows); }
        mainMenu();
    });
}

function addDept() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'addDe',
                message: 'Enter the name of the new department:'
            }
        ])
        .then(answer => {
            const query = "INSERT INTO department (department) VALUES (?)"
            db.query(query, answer.addDe, (err, result) => {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                } else { console.table(result); }
                mainMenu();
            });

        });
}

const addRole = async () => {
    const [rows] = await db.promise().query("SELECT * FROM department")
    // console.log(rows)
    const departmentChoices = rows.map(({ id, department }) => ({
        name: `${department}`,
        value: id
    }))
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'addRo',
                message: 'What is the name of the new role?'
            },
            {
                type: 'input',
                name: 'updatedSalary',
                message: 'Enter the salary for the new role:'
            },
            {
                type: 'list',
                name: 'addRoDe',
                message: 'Which department will the role be added to?',
                choices: departmentChoices
            }
        ])
        .then(answer => {
            var roleArray = [answer.addRo, answer.updatedSalary, answer.addRoDe];
            const query = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)"
            db.query(query, roleArray, (err, result) => {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                } else { console.table(result); }
                mainMenu();
            });

        });
}

function addEmp() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'addNewFirst',
                message: "What is the new employee's first name?"
            },
            {
                type: 'input',
                name: 'addNewLast',
                message: "What is the new employee's last name?"
            },
            {
                type: 'input',
                name: 'addNewRoleId',
                message: "Enter the new employee's associated role id:"
            },
            {
                type: 'input',
                name: 'addEmpManager',
                message: "Enter the new employee's manager id number: "
            }

        ])
        .then(answer => {
            let employeeArray = [answer.addNewFirst, answer.addNewLast, answer.newRoleId, answer.addEmpManager];
            const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)"
            db.query(query, employeeArray, (err, result) => {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                } else { console.table(result); }
                mainMenu();
            });

        });
}

const updateRole = async () => {

    const [rows] = await db.promise().query("SELECT * FROM employee")
    // console.log(rows)
    const employeeChoices = rows.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }))
    // console.log(employeeChoices)
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'selectedEmp',
                message: 'Select the employee you would like to update:',
                choices: employeeChoices,
                loop: false
            }
        ])
        .then(async (answer) => {
            const [rows] = await db.promise().query("SELECT * FROM role")
            // console.log(rows)
            const roleChoices = rows.map(({ id, title }) => ({
                name: title,
                value: id
            }))
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'selectedRole',
                    message: 'Select the Role you would like to update to:',
                    choices: roleChoices,
                    loop: false
                }
            ]).then(roleAnswer => {
                let updatedEmpArray = [roleAnswer.selectedRole, answer.selectedEmp];
                console.log(updatedEmpArray)
                // console.log(roleAnswer.selectedRole)

                const query = `UPDATE employee SET role_id = ? WHERE id = ?;`;
                db.query(query, updatedEmpArray, (err, result) => {
                    if (err) {
                        res.status(400).json({ error: err.message });
                        return;
                    } else { console.table(result); }
                    mainMenu();
                });
            })
        })
}

mainMenu();
