import React from "react";
import { useField, SchemaFields } from "informed";
import { Form, Debug } from "informed";
import { type } from "os";
import Ajv from "ajv";

// const Input = (props) => {
//   const { render, informed, userProps } = useField({
//     type: "text",
//     ...props,
//   });

//   return render(<input {...informed} />);
// };










const schema = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
      title:"First Name",
      "ui:control": "input",
      "ui:props": {
        className: "border border-gray-300 p-2 rounded-md w-full  focus:outline-none focus:border-blue-500 mt-1",
      },
    },
    lastName: {
      type: "string",
      title: "Last name",
      "ui:control": "input",
      "ui:props": {
        className: "border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500 mt-1",
      },
    },
    email: {
      type: "string",
      title: "Email",
      format: "email",
      "ui:control": "input",
      "ui:props": {
        className: "border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500 mt-2",
      },
    },
    married: {
      type: "string",
      title: "Are you married?",
      enum: ["yes", "no"],
      "ui:control": "radio",
      "ui:props": {
        className: "w-6 h-6 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ",
      },
    },
    "ui:spouse": {},
    drinking: {
      type: "object",
      properties: {
        age: {
          type: "number",
          title: "your age?",
          "ui:control": "input",
          "ui:props": {
            type:"number",
            initialValue:15,
            className: "border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500 mt-2",
          },
        },
        "ui:EducationQulaification": {},
      },
      allOf: [
        {
          $id: "EducationQulaification",
          if: {
            properties: {
              age: { minimum: 18, maximum: 30 },
            },
            required: ["age"],
          },
          then: {
            type: "object",
             properties: {
              Edqualification: {
                type: "string",
                title: "what is your qualification ?",
                "ui:control": "select",
                oneOf: [
                  { const: "UG", title: "UG" },
                  { const: "PG", title: "PG" },
                ],
                "ui:props": {
                  initialValue: "PG",
                    className: "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                },
              },
            },
            allOf: [
              {
                $id: "Edqualification",
                if: {
                  properties: { Edqualification: { const: "UG" } },
                },
                then: {
                  properties: {
                    qualificationName: {
                      type: "string",
                      title: "what is your qualification Name ?",
                      "ui:control": "textarea",
                      "ui:props": {
                        initialValue: "B.sc(Computer science)",
                          className: "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                      },
                    },
                  },
                },
              },
              {
                $id: "Edqualification",
                if: {
                  properties: { Edqualification: { const: "PG" } },
                },
                then: {
                  properties: {
                    qualificationName: {
                      type: "string",
                      title: "what is your qualification Name ?",
                      "ui:control": "textarea",
                      "ui:props": {
                        initialValue: "M.sc(Computer science)",
                          className: "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                      },
                    },
                  },
                },
              },
            ],
          },
        },
      ],
    },
    Siblingsscope: {
      type: "object",
      properties: {
        Siblings: {
          type: "string",
          title: "Do you Have Siblings?",
          enum: ["yes", "no"],
          "ui:control": "radio",
        },
      },

      allOf: [
        {
          $id: "Siblings",
          if: {
            properties: { Siblings: { const: "yes" } },
          },
          then: {
            type: "object",
            properties: {
              siblingsdetails: {
                type: "object",

                properties: {
                  SiblingName: {
                    type: "string",
                    title: "What is your sibling's name?",
                    "ui:control": "input",
                    "ui:props": {
                      initialValue: "Ram",
                        className: "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                    },
                  },
                  SiblingAge: {
                    type: "number",
                    title: "What is your sibling's Age?",
                    "ui:control": "input",
                    "ui:props": {
                      type: "number",
                      initialValue: 15,
                      className: "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                    },
                  },
                },
                allOf: [
                  {
                    $id: "SiblingAge",
                    if: {
                      properties: {
                        SiblingAge: { minimum: 18, maximum: 30 },
                      },
                      required: ["age"],
                    },
                    then: {
                      type: "object",
                      properties: {
                        sibEdqualification: {
                          type: "string",
                          title: "what is your Sibling qualification Course ?",
                          "ui:control": "select",
                          oneOf: [
                            { const: "UG", title: "UG" },
                            { const: "PG", title: "PG" },
                          ],
                          "ui:props": {
                            initialValue: "PG",
                              className: "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                          },
                        },
                      },
                      allOf: [
                        {
                          $id: "sibEdqualification",
                          if: {
                            properties: { sibEdqualification: { const: "UG" } },
                          },
                          then: {
                            properties: {
                              sibqualificationName: {
                                type: "string",
                                title:
                                  "what is your Sibling qualification Name ?",
                                "ui:control": "textarea",
                                "ui:props": {
                                  initialValue: "B.sc(Computer science)",
                                    className: "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                                },
                              },
                            },
                          },
                        },
                        {
                          $id: "sibEdqualification",
                          if: {
                            properties: { sibEdqualification: { const: "PG" } },
                          },
                          then: {
                            properties: {
                              sibqualificationName: {
                                type: "string",
                                title: "what is your qualification Name ?",
                                "ui:control": "textarea",
                                "ui:props": {
                                  initialValue: "M.sc(Computer science)",
                                    className: "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                                },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
        {
          $id: "Siblings",
          if: {
            properties: { Siblings: { const: "yes" } },
          },
          then: {
            type: "object",
            required: ["name", "siblings"],
            properties: {
              siblings: {
                type: "array",
                minItems: 2,
                "ui:control": "array",
                "ui:props": {
                },
                "ui:before": [{ "ui:control": "add" }],
                items: {
                  type: "object",
                  properties: {
                    siblingsdetails: {
                      type: "object",

                      properties: {
                        SiblingName: {
                          type: "string",
                          title: "What is your sibling's name?",
                          "ui:control": "input",
                          "ui:props": {
                            initialValue: "Ram",
                              className: "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2"
                          },
                        },
                        SiblingAge: {
                          type: "number",
                          title: "What is your sibling's Age?",
                          "ui:control": "input",
                          "ui:props": {
                            type: "number",
                            initialValue: 15,
                              className: "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                          },
                        },
                      },
                      allOf: [
                        {
                          $id: "SiblingAge",
                          if: {
                            properties: {
                              SiblingAge: { minimum: 18, maximum: 30 },
                            },
                            required: ["age"],
                          },
                          then: {
                            type: "object",
                            properties: {
                              sibEdqualification: {
                                type: "string",
                                title:
                                  "what is your Sibling qualification Course ?",
                                "ui:control": "select",
                                oneOf: [
                                  { const: "UG", title: "UG" },
                                  { const: "PG", title: "PG" },
                                ],
                                "ui:props": {
                                  initialValue: "PG",
                                    className: "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                                },
                              },
                            },
                            allOf: [
                              {
                                $id: "sibEdqualification",
                                if: {
                                  properties: {
                                    sibEdqualification: { const: "UG" },
                                  },
                                },
                                then: {
                                  properties: {
                                    sibqualificationName: {
                                      type: "string",
                                      title:
                                        "what is your Sibling qualification Name ?",
                                      "ui:control": "textarea",
                                      "ui:props": {
                                        initialValue: "B.sc(Computer science)",
                                          className: "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2"
                                      },
                                    },
                                  },
                                },
                              },
                              {
                                $id: "sibEdqualification",
                                if: {
                                  properties: {
                                    sibEdqualification: { const: "PG" },
                                  },
                                },
                                then: {
                                  properties: {
                                    sibqualificationName: {
                                      type: "string",
                                      title:
                                        "what is your qualification Name ?",
                                      "ui:control": "textarea",
                                      "ui:props": {
                                        initialValue: "M.sc(Computer science)",
                                          className: "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                                      },
                                    },
                                  },
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                    "ui:component:remove": {"ui:control": "remove"}
                  },
                  
                },
              },
            },
          },
        
        },
      ],
    },
  },
  allOf: [
    {
      $id: "spouse",
      if: {
        properties: {
          married: { const: "yes" },
        },
        required: ["married"],
      },
      then: {
        properties: {
          spouse: {
            type: "string",
            title: "Spouse name",
            "ui:control": "input",
            "ui:props": {
              className: "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
            },
          },
        },
        required: ["spouse"],
      },
    },
  ],
  required: ["firstName", "email","lastName"],
};

export default function Index() {

  const handleSubmit = (values) => {
    // Handle the form submission here
    console.log("Form values:", values);
    // You can send the values to an API, update state, etc.
  };


  


  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <Form schema={schema} ajv={Ajv} className="flex flex-col w-2/6 bg-blue-300 px-8 py-4 rounded-2xl " onSubmit={handleSubmit}>
        <div className="text-lg font-semibold tracking-widest  w-full text-center">Form</div>
        <SchemaFields  />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-4 rounded">
          Submit
        </button>
      </Form>
    </div>
  );
}
