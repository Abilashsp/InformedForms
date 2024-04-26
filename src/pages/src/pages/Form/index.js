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

const getDynamicLabel = (propertyName) => {
  return <div className="text-base font-semibold tracking-wider">{propertyName}</div>;
};


const schema = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
      title: "First Name",
      "ui:control": "input",
      "ui:props": {
        className:
          "border border-gray-300 p-2 rounded-md w-full  focus:outline-none focus:border-blue-500 mt-1",

      },
    },
    lastName: {
      type: "string",
      title: "Last name",
      "ui:control": "input",
      "ui:props": {
        className:
          "border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500 mt-1",
          label:getDynamicLabel("Last name")
      },
    },
    email: {
      type: "string",
      title: "Email",
      format: "email",
      "ui:control": "input",
      "ui:props": {
        className:
          "border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500 mt-2",
          label:getDynamicLabel("Email")
      },
      "ui:options": {
        title: {
          className: "text-lg font-semibold tracking-widest text-center",
        },
      },
    },
    married: {
      type: "string",
      title: "Are you married?",
      enum: ["yes", "no"],
      "ui:control": "radio",
      "ui:props": {
        className:
          "w-6 h-6 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ",
          label:getDynamicLabel("Are you married?")
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
            type: "number",
            initialValue: 15,
            className:
              "border border-gray-300 p-2 rounded-md w-2/5 focus:outline-none focus:border-blue-500 mt-2",
              label:getDynamicLabel("your age?")
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
                  className:
                    "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                    label:getDynamicLabel("what is your qualification ?")
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
                        className:
                          "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                          label:getDynamicLabel("what is your qualification Name ?")
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
                        className:
                          "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                          label:getDynamicLabel("what is your qualification Name ?")
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
          "ui:props": {
            initialValue: "no",
            className:
              "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
              label:getDynamicLabel("Do you Have Siblings?")
              
          },
          
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
                      className:
                        "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                        label:getDynamicLabel("What is your sibling's name?")
                    },
                  },
                  SiblingAge: {
                    type: "number",
                    title: "What is your sibling's Age?",
                    "ui:control": "input",
                    "ui:props": {
                      type: "number",
                      initialValue: 15,
                      className:
                        "border border-gray-300 p-2 rounded-md  w-2/5 focus:outline-none focus:border-blue-500 mt-2",
                        label:getDynamicLabel("What is your sibling's Age?")
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
                            className:
                              "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                              label:getDynamicLabel("what is your Sibling qualification Course ?")
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
                                  className:
                                    "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                                    label:getDynamicLabel("what is your Sibling qualification Name ?")
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
                                  className:
                                    "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                                    label:getDynamicLabel("what is your qualification Name ?")
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
                "ui:props": {className:"bg-red-500"},
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
                            className:
                              "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                              label:getDynamicLabel("What is your sibling's name?")
                          },
                        },
                        SiblingAge: {
                          type: "number",
                          title: "What is your sibling's Age?",
                          "ui:control": "input",
                          "ui:props": {
                            type: "number",
                            initialValue: 15,
                            className:
                              "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                              label:getDynamicLabel("What is your sibling's Age?")
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
                            "ui:props": {
                              className:"bg-green border-4",
                            },
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
                                  className:
                                    "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                                    label:getDynamicLabel("what is your Sibling qualification Course ?")
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
                                        className:
                                          "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                                          label:getDynamicLabel("what is your Sibling qualification Name ?")
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
                                        className:
                                          "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                                          label:getDynamicLabel("what is your qualification Name ?")
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
                    "ui:component:remove": {
                      "ui:control": "remove",
                      "ui:props": {
                        className: "text-blue-500",
                      },
                    },
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
              className:
                "border border-gray-300 p-2 rounded-md  w-full focus:outline-none focus:border-blue-500 mt-2",
                 label:getDynamicLabel("First Name")
            },
          },
        },
        required: ["spouse"],
      },
    },
  ],
  required: ["firstName", "email", "lastName"],
};

export default function Index() {
  const handleSubmit = (values) => {
    console.log("Form values:", values);
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen max-h-full">
      <Form
        schema={schema}
        ajv={Ajv}
        className=" my-form-class flex flex-col w-2/6 bg-blue-300 px-8 py-4 rounded-2xl "
        onSubmit={handleSubmit}
      >
        <div className="text-lg font-semibold tracking-widest  w-full text-center">
          Form
        </div>
        <SchemaFields />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
        >
          Submit
        </button>
        
      </Form>
    </div>
  );
}
