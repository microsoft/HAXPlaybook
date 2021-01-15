// This is intended to run as an Azure Function
// Send a POST request with the survey data in the request body
// The response will contain the generated metadata

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  const makeErrorResponse = (msg) => {
      context.res = {
          status: 400,
          body: msg
      };
  }

  const survey = req.body;
  if (survey == null) {
      makeErrorResponse("Request body is empty.");
      return;
  } else if (survey.pages == null) {
      makeErrorResponse("Survey contains no pages.");
      return;
  }

  const content = {
      introduction: "",
      farewell: "",
      questions: [],
  }

  for (let i=0; i<survey.pages.length; i++) {
      const page = survey.pages[i];
      // pages can contain either "questions" or "elements", both which
      // seem to be the same thing. "Questions" were probably renamed to "elements"
      // in a newer version of the library.
      let array;
      if (page.questions == null && page.elements == null) {
          makeErrorResponse("Survey contains a page with no questions");
          return;
      } else if (page.questions != null) {
          array = page.questions;
      } else {
          array = page.elements;
      }

      if (array.length > 1) {
          makeErrorResponse("Only 1 question allowed per page");
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

      if (choices != null) {
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
          });
      }

      content.questions.push(metadata);
  }

  const data = JSON.stringify(content);

  context.res = {
      // status: 200, /* Defaults to 200 */
      body: data
  };
}