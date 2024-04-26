import React from "react";
import {
  useField,
  useForm,
  useArrayFieldApi,
  useArrayFieldItemApi,
  ArrayField,
  FormComponents,
  FormFields,
  SchemaFields,
  Debug,
} from "informed";
import { format } from "path";
import { type } from "os";

// Step 1. Build your form component ---------------------

const Form = ({ children, ...rest }) => {
  const { formController, render, userProps } = useForm(rest);

  return render(
    <form {...userProps} onSubmit={formController.submitForm}>
      {children}
    </form>
  );
};

// Step 2. Build your input components --------------------

const Input = ({ label, ...props }) => {
  const { render, informed, userProps, ref } = useField({
    type: "text",
    ...props,
  });

  return render(
    <div className="w-full my-3 mx-4">
      <label className=" flex">
        <div className="w-1/6 ">{label}</div>
        <input
          ref={ref}
          {...informed}
          {...userProps}
          className="mx-2 w-3/6 px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </label>
    </div>
  );
};


const Inputhalf = ({ label, ...props }) => {
  const { render, informed, userProps, ref } = useField({
    type: "text",
    ...props,
  });

  return render(
    <div className="w-1/2  my-3 mx-4  ">
      <label className=" flex items-center justify-between">
        <div className="w-2/5 ">{label}</div>
        <input
          ref={ref}
          {...informed}
          {...userProps}
          className="mx-2 w-3/5 px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </label>
    </div>
  );
};








const InputNumber = ({ label, ...props }) => {
  const { render, informed, userProps, ref } = useField({
    type: "number",
    ...props,
  });

  return render(
    <div className="w-full my-3 mx-4">
      <label className="flex">
        <div className="w-2/12">{label}</div>

        <input
          ref={ref}
          {...informed}
          {...userProps}
          className="mx-2 w-2/6 rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </label>
    </div>
  );
};

const Checkbox = ({ label, ...props }) => {
  const { render, informed, userProps, ref } = useField({
    type: "checkbox",
    ...props,
  });
  return render(
    <label>
      {label}
      <input ref={ref} {...informed} {...userProps} />
    </label>
  );
};

const Radio = ({ label, name, ...props }) => {
  const { fieldState, fieldApi, render } = useField({
    ...props,
    type: "radio",
    name,
  });
  const { value } = fieldState;
  const { setValue } = fieldApi;

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return render(
    <div className="flex px-4 py-4">
      <label>{label}</label>
      <label className="px-2 text-lg">
        <input
          type="radio"
          value="yes"
          checked={value === "yes"}
          onChange={() => handleChange("yes")}
          {...props}
        />
        Yes
      </label>
      <label className="px-2 text-lg">
        <input
          type="radio"
          value="no"
          checked={value === "no"}
          onChange={() => handleChange("no")}
          {...props}
        />
        No
      </label>
    </div>
  );
};

const Select = ({ label, children, options, ...props }) => {
  const { render, informed, userProps, ref } = useField({
    type: "select",
    ...props,
  });

  return render(
    <div className="w-full px-4">
      <label className="flex">
        <div className="w-1/6 ">{label}</div>

        <select
          ref={ref}
          {...informed}
          {...userProps}
          className="w-3/6  rounded-md py-2 mx-3"
        >
          {options
            ? options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="w-3/6  rounded-md py-2"
                >
                  {option.label}
                </option>
              ))
            : children}
        </select>
      </label>
    </div>
  );
};

const AddButton = () => {
  const { add } = useArrayFieldApi();

  return (
    <div className="py-3 flex items-center justify-center">
      <button
        className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        onClick={() => {
          add();
        }}
        type="button"
      >
        Add Sibling
      </button>
    </div>
  );
};

const RemoveButton = () => {
  const { remove } = useArrayFieldItemApi();

  return (
    <div className="py-3 flex items-center justify-center">
      <button
        className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        onClick={() => {
          remove();
        }}
        type="button"
      >
        Remove Sibling
      </button>
    </div>
  );
};

const MyArrayField = ({ name, items, ...props }) => {
  return (
    <ArrayField name={name} {...props}>
      <AddButton />
      <ArrayField.Items>
        {() => (
          <>
            <FormFields schema={items} />
            <RemoveButton />
          </>
        )}
      </ArrayField.Items>
    </ArrayField>
  );
};

// Step 3. Define your adapter --------------------

const adapter = {
  select: Select,
  input: Input,
  inputnumber: InputNumber,
  checkbox: Checkbox,
  radio: Radio,
  add: AddButton,
  remove: RemoveButton,
  array: MyArrayField,
  inputhalf:Inputhalf
};

// Step 4. Build your forms!! -----------------------

const schema = {
  type: "object",
  required: ["firstName", "Lastname"],
  properties: {
    name: {
      type: "object",
      "ui:control": "singlerow",
      properties: {
        firstName: {
          type: "string",
          title: "First Name",
          "ui:control": "inputhalf",
          "ui:props": { className: "" },
        },
        lastName: {
          type: "string",
          title: "Last Name",
          "ui:control": "inputhalf",
          "ui:props": { className: "w-1/2" },
        },
      },
    },
    Email: {
      type: "string",
      title: "Email ID",
      "ui:control": "input",
      format: "email",
      "ui:props": {},
    },
    married: {
      type: "string",
      title: "Are you married?",
      enum: ["yes", "no"],
      "ui:control": "radio",
    },
    "ui:spouse": {},

    AgeGroup: {
      type: "object",
      "ui:control": "PurpleBorder",
      properties: {
        PersonAge: {
          type: "number",
          title: "Age",
          "ui:control": "inputnumber",
          "ui:props": { initialValue: "15" },
        },
      },
      allOf: [
        {
          $id: "PersonAge",
          "ui:control": "PurpleBorder",
          if: {
            properties: {
              PersonAge: { minimum: 18, maximum: 30, },
            },
            required: ["PersonAge"],
          },
          then: {
            properties: {
              PersonQualification: {
                type: "string",
                title: "Qualification",
                "ui:control": "select",
                oneOf: [
                  { const: "UG", title: "UG" },
                  { const: "PG", title: "PG" },
                ],
                "ui:props": { initialValue: "PG" },
              },
            },
            allOf: [
              {
                $id: "PersonQualificationUG",
                if: {
                  properties: {
                    PersonQualification: { const: "UG" },
                  },
                  required: ["PersonQualification"],
                },
                then: {
                  properties: {
                    PersonQualificationBranch: {
                      type: "string",
                      title: "UG Branch",
                      "ui:control": "input",
                      "ui:props": { initialValue: "B.sc" },
                    },
                  },
                },
              },
              {
                $id: "PersonQualificationPG",
                if: {
                  properties: {
                    PersonQualification: { const: "PG" },
                  },
                  required: ["PersonQualification"],
                },
                then: {
                  properties: {
                    PersonQualificationBranch: {
                      type: "string",
                      title: "PG Branch",
                      "ui:control": "input",
                      "ui:props": { initialValue: "M.sc" },
                    },
                  },
                },
              },
            ],
            required: ["PersonQualification"],
          },
        },
      ],
    },
    SiblingsDetails: {
      type: "object",
      properties: {
        isSiblings: {
          type: "string",
          title: "Do you Have Siblings?",
          enum: ["yes", "no"],
          "ui:control": "radio",
        },
      },
      allOf: [
        {
          $id: "isSiblings",
          if: {
            properties: {
              isSiblings: { enum: ["yes"] },
            },
            required: ["isSiblings"],
          },
          then: {
            properties: {
              type: "object",
              name: {
                type: "string",
                title: "Sibling name",
                "ui:control": "input",
              },
              sibage: {
                type: "number",
                title: "Sibling age",
                minimum: 0,
                "ui:control": "inputnumber",
                "ui:props": {
                  type: "number",
                  initialValue: "15",
                },
              },
            },
            allOf: [
              {
                $id: "sibage",
                if: {
                  properties: {
                    sibage: { minimum: 18, maximum: 30 },
                  },
                  required: ["sibage"],
                },
                then: {
                  properties: {
                    siblingQualification: {
                      type: "string",
                      title: "Qualification",
                      "ui:control": "select",
                      oneOf: [
                        { const: "UG", title: "UG" },
                        { const: "PG", title: "PG" },
                      ],
                      "ui:props": { initialValue: "PG" },
                    },
                  },
                  allOf: [
                    {
                      $id: "siblingQualificationUG",
                      if: {
                        properties: {
                          siblingQualification: { const: "UG" },
                        },
                        required: [" siblingQualification"],
                      },
                      then: {
                        properties: {
                          siblingQualificationBranch: {
                            type: "string",
                            title: "UG Branch",
                            "ui:control": "input",
                            "ui:props": { initialValue: "B.sc" },
                          },
                        },
                      },
                    },
                    {
                      $id: "siblingQualificationPG",
                      if: {
                        properties: {
                          siblingQualification: { const: "PG" },
                        },
                        required: ["siblingQualification"],
                      },
                      then: {
                        properties: {
                          siblingQualificationBranch: {
                            type: "string",
                            title: "PG Branch",
                            "ui:control": "input",
                            "ui:props": { initialValue: "M.sc" },
                          },
                        },
                      },
                    },
                  ],
                  required: ["siblingQualification"],
                },
              },
              {
                $id: "sibage",
                if: {
                  properties: {
                    sibage: { minimum: 0 },
                  },
                  required: ["sibage"],
                },
                then: {
                  type: "object",
                  properties: {
                    siblings: {
                      type: "array",
                      minItems: 2,
                      "ui:control": "array",
                      "ui:props": {},
                      items: {
                        type: "object",
                        required: ["name", "age"],
                        properties: {
                          name: {
                            type: "string",
                            title: "Sibling name",
                            "ui:control": "input",
                          },
                          sibage: {
                            type: "number",
                            title: "Sibling age",
                            minimum: 0,
                            "ui:control": "inputnumber",
                            "ui:props": {
                              type: "number",
                              initialValue: "15",
                            },
                          },
                        },
                        allOf: [
                          {
                            $id: "sibage",
                            if: {
                              properties: {
                                sibage: { minimum: 18, maximum: 30 },
                              },
                              required: ["sibage"],
                            },
                            then: {
                              properties: {
                                siblingQualification: {
                                  type: "string",
                                  title: "Qualification",
                                  "ui:control": "select",
                                  oneOf: [
                                    { const: "UG", title: "UG" },
                                    { const: "PG", title: "PG" },
                                  ],
                                  "ui:props": { initialValue: "PG" },
                                },
                              },
                              allOf: [
                                {
                                  $id: "siblingQualificationUG",
                                  if: {
                                    properties: {
                                      siblingQualification: { const: "UG" },
                                    },
                                    required: [" siblingQualification"],
                                  },
                                  then: {
                                    properties: {
                                      siblingQualificationBranch: {
                                        type: "string",
                                        title: "UG Branch",
                                        "ui:control": "input",
                                        "ui:props": { initialValue: "B.sc" },
                                      },
                                    },
                                  },
                                },
                                {
                                  $id: "siblingQualificationPG",
                                  if: {
                                    properties: {
                                      siblingQualification: { const: "PG" },
                                    },
                                    required: ["siblingQualification"],
                                  },
                                  then: {
                                    properties: {
                                      siblingQualificationBranch: {
                                        type: "string",
                                        title: "PG Branch",
                                        "ui:control": "input",
                                        "ui:props": { initialValue: "M.sc" },
                                      },
                                    },
                                  },
                                },
                              ],
                              required: ["siblingQualification"],
                            },
                          },
                        ],
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
            "ui:props": {},
          },
        },
        required: ["spouse"],
      },
    },
  ],
};

const PurpleBorder = ({ children }) => {
  return (
    <div className="px-4 my-4">
      <div className="border border-gray-200 rounded-xl">{children}</div>
    </div>
  );
};
const singlerow = ({ children }) => {
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="flex w-full items-center justify-between">{children}</div>
    </div>
  );
};

const Schema = () => (
  <div className="w-full min-h-screen max-h-full flex items-start justify-center bg-white">
    <Form
      schema={schema}
      adapter={adapter}
      components={{ PurpleBorder,singlerow }}
      className="flex flex-col w-3/6  bg-gray-100 py-6 px-2 rounded-lg shadow-md mt-2"
    >
      <div className="w-full flex items-center justify-center ">
        <h1 className="text-xl font-semibold tracking-widest">Form</h1>
      </div>
      <SchemaFields />
      <div className="w-full flex items-center justify-center">
        <button
          type="submit"
          className="rounded-md w-3/5 bg-indigo-600 px-3.5 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div>

      {/* <Debug /> */}
    </Form>
  </div>
);

export default Schema;
