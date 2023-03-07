// Accesses the required data from other pages, modules and nodes
const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")
const inquirer = require("inquirer")
const path = require("path")
const fs = require("fs")

// Variables with the paths for the created HTML document
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html")

// Accesses the data for the HTML page
const render = require("./src/page-template.js")


// Arrays - used to collect data from the Inquirer
const employees = []
const manager = []
const engineers = []
const interns = []
// Choice arrays for the Inquirer
const tmChoices = ["Engineer", "Intern"]
const finish = ["Choose another team member", "I'm finished creating my team"]

// Ternary operator to check if the the userInput has a value or not
function validateUserInput(input) {
    return input !== ""
      ? true
      : "I did not detect a value, please enter a valid input"
  }

  // Ternary operator to check if the the userInput includes a @ or not
function validateEmail(input) {
    return input.includes("@")
      ? true
      : "I did not detect a valid email address, please try again"
  }
// Collects and validates the user answers to the Inquirer questions RE: Engineer/s 
function EngineerQs() {
    return inquirer.prompt([
    {
        type: "input",
        message: "Engineer's name?",
        name: "engName",
        validate: validateUserInput,
    },
    {
        type: "input",
        message: "Engineer's id?",
        name: "engId",
        validate: validateUserInput,
    },
    {
        type: "input",
        message: "Engineer's email?",
        name: "engEmail",
        validate: validateUserInput,
    },
    {
        type: "input",
        message: "Engineer's GitHub Username?",
        name: "engGithub",
        validate: validateUserInput,
    },

   
   // Waits for the Inquirer to finish, then sets a new variable using the responses and the relevant class
   // Pushes that data to the relevant array, then console logs the collected data for a better user experience
]).then((response) => {
const engineer = new Engineer (response.engName, response.engId, response.engEmail, response.engGithub)
employees.push(engineer)
console.log(engineer)
})
 
}
// Collects and validates the user answers to the Inquirer questions RE: Intern/s  
function InternQs() {
    return inquirer.prompt([
    {
        type: "input",
        message: "Intern's name?",
        name: "intName",
        validate: validateUserInput,
    },
    {
        type: "input",
        message: "Intern's ID?",
        name: "intID",
        validate: validateUserInput,
    },
    {
        type: "input",
        message: "Intern's email?",
        name: "intEmail",
        validate: validateUserInput,
    },
    {
        type: "input",
        message: "Intern's school?",
        name: "intSchool",
        validate: validateUserInput,
    },
    // Waits for the Inquirer to finish, then sets a new variable using the responses and the relevant class
    // Pushes that data to the relevant array, then console logs the collected data for a better user experience
]).then((response) => {
    const intern = new Intern (response.intName, response.intID, response.intEmail, response.intSchool)
    employees.push(intern)
    console.log(intern)
})
} 
// Collects and validates the user answers to the Inquirer questions RE: Team Manager  
function TeamProfileGenerator() {
return inquirer.prompt([
    {
      type: "input",
      message: "Who is your team manager?",
      name: "tmName",
      validate: validateUserInput,
    },
    {
        type: "input",
        message: "Team manager's ID?",
        name: "tmID",
        validate: validateUserInput,
    },
    {
        type: "input",
        message: "Team manager's email?",
        name: "tmEmail",
        validate: validateUserInput,
    },
    {
        type: "input",
        message: "Team manager's office number?",
        name: "tmOffice",
        validate: validateUserInput,
    },
  
    // Waits for the Inquirer to finish, then sets a new variable using the responses and the relevant class
    // Pushes that data to the relevant array, then console logs the collected data for a better user experience
]).then ((response) => {
    const manager = new Manager (response.tmName, response.tmID, response.tmEmail, response.tmOffice)
    console.log(manager)
    employees.push(manager)
    // Runs the TeamMemberChoice function to ask addition questions
    // It is in a new function as we loop back to the start of TeamMemberChoice depending on userInput
    TeamMemberChoice(response)
})

}
// Collects and validates the user answers to the Inquirer questions RE: Adding Team Members
function TeamMemberChoice() {
    return inquirer.prompt([
    {
        type: "list",
        message: "Select a team member:",
        name: "tmChoose",
        choices: tmChoices,
        
    },
    // Waits for the Inquirer to finish, then runs a new function depending on userInput
    // Once the User has chosen between adding an Engineer or Intern to the team it runs the relevant function
    // Once the Engineer/Intern has been added, it runs the FinishQs function
]).then((response) => {    
    if (response.tmChoose === tmChoices[0]) {
        EngineerQs(response).then((response) => {
            FinishQs(response)
        })
    } else {
        InternQs(response).then((response) => {
            FinishQs(response)
        })
    }
})
}
// Collects and validates the user answers to the Inquirer questions RE: Adding additional team members or finalising the team
function FinishQs() {
    return inquirer.prompt([
    {
        type: "list",
        message: "Would you like to add another team member?",
        name: "finish",
        choices: finish,
    } 
// Waits for the Inquirer to finish, then runs a new function depending on userInput
// Once the User has chosen, it either runs the function to add another team member, or creates the HTML document
]).then((response) => {
    if (response.finish === finish[0]) {
        TeamMemberChoice(response) 
    } else {
        console.log("Your team has now been created. ")
        // Variable including all the responses from the Inquirer - to be passed to the HTML generating function
        const makeHTML = render(employees)
        console.log(render)
        console.log(employees)
            fs.writeFile(
            outputPath,
            makeHTML,   
            (err) => (err ? console.error(err) : console.log("HTML file has been generated!"))
            )
       
        

    }
   
    
})
}

// Calls the function to ask the questions and then create the HTML
TeamProfileGenerator()
   




 
    
 


// TODO: Write Code to gather information about the development team members, and render the HTML file.

