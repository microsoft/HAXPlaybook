'use strict';

const { exit } = require("process");
const fs = require("fs");

const args = process.argv.slice(2);

if (args.length != 2) {
  console.error("Usage: generate survey.json output.json")
  exit()
}

const rawData = fs.readFileSync(args[0]);
const survey = JSON.parse(rawData);

const content = {
  introduction: "",
  farewell: "",
  questions: [],
}

survey.pages.forEach(page => {
  // pages can contain either "questions" or "elements", both which
  // seem to be the same thing. "Questions" were probably renamed to "elements"
  // in a newer version of the library.
  let array;
  if (page.questions == null && page.elements == null) {
    console.error("Error: Survey contains a page with no questions");
    return;
  } else if (page.questions != null) {
    array = page.questions;
  } else {
    array = page.elements;
  }

  if (array.length > 1) {
    console.error("Error: Only 1 question allowed per page");
    return;
  }

  const q = array[0];

  const metadata = {
    name: q.name,
    instructions: "",
    category: "",
    choices: [],
  }

  const choices = q.type === "boolean" ? [{value: "true"}, {value: "false"}] : q.choices;

  choices.forEach(c => {
    const choiceMeta = {
      name: c.value,
      helpCard: {
        topics: [
          {
            name: "",
            level: "",
            details: "",
          }
        ]
      },
      taskCard: {
        message: "",
        tasks: [
          {
            name: "",
            details: ""
          }
        ]
      }
    }
    metadata.choices.push(choiceMeta);
  })

  content.questions.push(metadata);
});

const data = JSON.stringify(content);
fs.writeFileSync(args[1], data);