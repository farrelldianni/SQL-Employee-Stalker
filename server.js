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
    database: "employee_db",
});

// allows for async db.query
db.query = util.promisify(db.query);

////////////////////////////////////////////////////////////////
//base questions 
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

async function viewAllDepartments() {
    try {
        const results = await db.query(`
            SELECT 
                role.title,
                department.name as department,
                role.salary
            FROM role
            RIGHT JOIN department ON department.id - role.department_id;`);
        console.table(results);
    } catch (err) {
        console.log(err);
    }
}

async function viewAllEmployees() {
    try {
      const results = await db.query(`
            SELECT employee.id,
                   employee.first_name,
                   employee.last_name,
                   role.title,
                   department.name as department,
                   role.salary,
                   CONCAT( m.first_name, ' ', m.last_name ) as manager
            FROM employee
            JOIN role ON role.id = employee.role_id
            LEFT JOIN department ON department.id = role.department_id
            LEFT JOIN employee m ON employee.manager_id = m.id;`);
      console.table(results);
    } catch (err) {
      console.error(err);
    }
  }

async function viewAllRoles() {
    try {
        const results = await db.query(`
            SELECT role.id,
                role.title,
                department.name as department,
                role.salary
            FROM role
            LEFT JOIN department ON department.id = role.department_id`);
        console.table(results)
        } catch (err) {
            console.error(err);
        }
}

async function addDepartment() {
    const { name } = await inquirer.prompt([
        {
          type: "input",
          message: "What is the new department name?",
          name: "name",
        },
      ]);
    
      try {
        await db.query(
          `
              INSERT INTO department (name)
              VALUES (?)
              `,
          name
        );
        console.log(`Added ${name} to the database`);
      } catch (err) {
        console.error(err);
      }
    }

async function addEmployee() {
    let roleChoice = await db.query(
        "SELECT id AS value, title AS name FROM role"
    );

    let managerChoices = await db.query(`
        SELECT id as value, CONCAT( first_name, ' ', last_name) as name
        FROM employee`);

    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt ([
        {
            type: 'input',
            message: 'What is the employee name?',
            name: "first_name",
        },
        {
            type: 'input',
            message: "Last name?",
            name:"last_name",
        },
        {
            type: "list",
            choices: roleChoice,
            message: "What is the employee's role?",
            name: "role_id",
        },
        {
            type:"list",
            choices: managerChoices,
            message: "Who is the employee's manager?",
            name: "manager_id",
        },
    ]);
}

async function updateEmployeeRole() {
    const employees = await db.query(`
        SELECT id AS value, 
            CONCAT( first_name, ' ', last_name) AS name
            FROM employee
        `);
    
    const roles = await db.query(`
        SELECT id AS value, 
            title AS name
            FROM role
        `);

    const { id, role_id} = await inquirer.prompt ([
        {
            type: 'list',
            message: "which employee would you like to update?",
            name: 'id',
            choices: employees,
        },
        {
            type: 'list',
            message: "which role should be added?",
            name: "role_id",
            choices: roles,
        },
    ]);

    try {
        await db.query(`
            UPDATE employee
            SET role_id = ?
            WHERE id = ?
        `,
        [role_id, id]
        );
        console.log(`updated employee ${id}`)
        } catch (err) {
            console.log(err);
        }
}



