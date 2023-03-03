import Manager from "./lib/Manager"
import Engineer from "./lib/Engineer"
import Intern from "./lib/Intern"
import inquirer from 'inquirer'
import path from 'path'
import fs from 'fs'

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

