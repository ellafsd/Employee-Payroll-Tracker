// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

//Collect employee data
//This function uses a while loop to repeatedly ask the user for employee information
//until the user decides to stop. 
//And it checks for empty inputs from the user. If user leave name or surname or salary empty,
//function asks not to leave any field empty
const collectEmployees = function() {
    let employees = [];
    let addMore = true;

    while (addMore) {
      let firstName = "";
      while (!firstName) {
        firstName = prompt("Enter the employee's first name:");
        if (!firstName) alert("Please do not leave the employee's first name empty.");
      }
  
      let lastName = "";
      while (!lastName) {
        lastName = prompt("Enter the employee's last name:");
        if (!lastName) alert("Please do not leave the employee's last name empty.");
      }
  
      let salaryInput = "";
      let salary = 0;
      while (!salaryInput || isNaN(salary)) {
        salaryInput = prompt("Enter the employee's salary:");
        salary = parseInt(salaryInput);
        if (!salaryInput || isNaN(salary)) alert("Please enter a valid number for the salary and do not leave it empty.");
      }
  
      employees.push({
        firstName: firstName,
        lastName: lastName,
        salary: salary
      });
  
      addMore = confirm("Would you like to add another employee?");
    }
  
    return employees;
  };


//Display the average salary
//This function takes the array of employees, calculates the total salary, and then the average salary.
//It uses the reduce method to sum up the salaries. The average is then logged to the console, formatted as a currency
const displayAverageSalary = function(employeesArray) {
  let totalSalary = employeesArray.reduce((total, current) => total + current.salary, 0);
  let averageSalary = totalSalary / employeesArray.length;
  console.log(`Average Salary: $${averageSalary.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} | Number of Employees: ${employeesArray.length}`);
};


//Select a random employee
//This function selects a random employee from the array and logs their full name to the console. 
//It uses Math.random to generate a random index within the bounds of the array length.
const getRandomEmployee = function(employeesArray) {
  const getRandomEmployee = function(employeesArray) {
    let randomIndex = Math.floor(Math.random() * employeesArray.length);
    let randomEmployee = employeesArray[randomIndex];
    console.log(`Random Employee: ${randomEmployee.firstName} ${randomEmployee.lastName}`);
  };
}



/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
