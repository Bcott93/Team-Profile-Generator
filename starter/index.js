const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

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
        name: "engGitHub",
        validate: validateUserInput,
    },
   
])
}

function InternQs() {
    return   inquirer.prompt([
    {
        type: "input",
        message: "Intern's name?",
        name: "intName",
        validate: validateUserInput,
    },
    {
        type: "input",
        message: "Intern's id?",
        name: "intId",
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
        message: "Intern's School?",
        name: "intSchool",
        validate: validateUserInput,
    },
])
} 

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
        message: "Team manager's Email?",
        name: "tmEmail",
        validate: validateUserInput,
    },
    {
        type: "input",
        message: "Team manager's Office Number?",
        name: "tmOffice",
        validate: validateUserInput,
    },
  
    

]).then ((response) => {
    TeamMemberChoice(response)
})

}

function TeamMemberChoice() {
    return inquirer.prompt([
    {
        type: "list",
        message: "Select a team member:",
        name: "tmChoose",
        choices: tmChoices,
        
    },

]).then((response) => {    
    if (response.tmChoose === tmChoices[0]) {
        EngineerQs().then(() => {
            FinishQs()
        })
    } else {
        InternQs().then(() => {
            FinishQs()
        })
    }
})
}

function FinishQs() {
    return inquirer.prompt([
    {
        type: "list",
        message: "Would you like to add another team member?",
        name: "finish",
        choices: finish,
    } 
]).then((response) => {
    if (response.finish === finish[0]) {
        TeamMemberChoice() 
    } else {
        console.log("Well done! You've finished creating your team")
    }
   
    
})
}

TeamProfileGenerator()



 






 
    
 


// TODO: Write Code to gather information about the development team members, and render the HTML file.

