const inquirer = require('inquirer');
const util = require('util');
const mysql = require('MySQL2');
const cTable = require('console.table');
const { inherits } = require('util');

const PORT = process.env.PORT || 3001;

//connecting database
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    //no password
    password: "",
    database: "employee_db",
});

// allows for async db.query
db.query = util.promisify(db.query);

////////////////////////////////////////////////////////////////
//start new loop 
init();
async function init() {
    const {action} = await inquirer.prompt ([
        {
        type: 'list',
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit",
        ],
        message: "What would you like to do?",
        name: 'action',
        },
    ]);

    switch (action) {
        case "View All Departments":
            await viewAllDepartments();
            break;
        case "View All Employees":
            await viewAllEmployees();
            break;
        case "View All Roles":
            await viewAllRoles();
            break;
        case "Add Department":
            await addDepartment();
            break;
        case "Add Employee":
            await addEmployee();
            break;
        case "Update Employee Role":
            await updateEmployeeRole();
            break;
        case "Quit":
        default:
            db.end();
            return null;
    }
    init();


}