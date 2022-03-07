const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./db/connection');
const { allowedNodeEnvironmentFlags } = require('process');
const { doesNotMatch } = require('assert');

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
                    new inquirer.Separator('*****'),
                    'Add a new department',
                    'Add a role',
                    'Add an employee',
                    'Update an emplyee role'
                ]
            }
        ])
        .then((response)=>{
            switch (response){
                case 'View all departments': viewDepts(); break;
                case 'View all roles': viewRoles(); break;
                case 'View all emplyees': viewEmps(); break;
                case 'Add a new department': addDept(); break;
                case 'Add a role': addRole(); break;
                case 'Add an employee': addEmp(); break;
                case 'Update an employee role': updateRole(); break;
                default: mainMenu(); break;
            }
        })
}

const viewDepts = () => {
    const query = 'SELECT * FROM department';
    db.query(query, (error, result)=>{
        done();
        if (error){
          res.status(400).json({error})
        } 
        if(result.rows < '1'){
            res.status(404).send({
                status: 'Nope!',
                message: 'No info found. Try again.'
            });
        } else {
            res.status(200).send({
                status: 'Successful',
                message: 'departments retrieved',
                results: console.table('rows', result),
            })
        }

        // console.table('rows',result)
    })
}
