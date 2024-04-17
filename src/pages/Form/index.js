import React from "react";
import { useField, SchemaFields } from "informed";
import { Form, Debug } from "informed";
import { type } from "os";
import Ajv from "ajv";

const Input = (props) => {
  const { render, informed, userProps } = useField({
    type: "text",
    ...props,
  });

  return render(<input {...informed} />);
};
const schema = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
      title: "First name",
      "ui:control": "input",
    },
    lastName: {
      type: "string",
      title: "Last name",
      "ui:control": "input",
    },
    email: {
      type: "string",
      title: "Email",
      format: "email",
      "ui:control": "input",
    },
    married: {
      type: "string",
      title: "Are you married?",
      enum: ["yes", "no"],
      "ui:control": "radio",
    },
    "ui:spouse": {},
    drinking: {
      type: "object",
      properties: {
        age: {
          type: "number",
          title: "your age?",
          "ui:control": "input",
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
                    },
                  },
                  SiblingAge: {
                    type: "number",
                    title: "What is your sibling's Age?",
                    "ui:control": "input",
                    "ui:props": {
                      type: "number",
                      initialValue: 15,
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
                "ui:props": {},
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
                          },
                        },
                        SiblingAge: {
                          type: "number",
                          title: "What is your sibling's Age?",
                          "ui:control": "input",
                          "ui:props": {
                            type: "number",
                            initialValue: 15,
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
          },
        },
        required: ["spouse"],
      },
    },
  ],
  required: ["firstName", "email","lastName"],
};

export default function Index() {
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <Form schema={schema} ajv={Ajv} className="flex flex-col w-2/6 bg-blue-300 px-8 py-4 rounded-2xl ">
        <div className="text-lg font-semibold tracking-widest  w-full text-center">Form</div>
        <SchemaFields />
      </Form>
    </div>
  );
}
