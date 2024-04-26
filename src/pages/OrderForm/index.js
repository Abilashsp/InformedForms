import React, { useState } from "react";
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
import Tabcomponent from "./Tabcomponent";
import { type } from "os";
import { title } from "process";

let currentTab = "Order Details";

const Form = ({ children, ...rest }) => {
  const { formController, render, userProps } = useForm(rest);

  return render(
    <form {...userProps} onSubmit={formController.submitForm}>
      {children}
    </form>
  );
};

const Input = ({ label, ...props }) => {
  const { render, informed, userProps, ref } = useField({
    type: "text",
    ...props,
  });

  return render(
    <div className="my-2">
      <label className="flex items-center">
        <div className="w-2/5">{label}</div>

        <input
          ref={ref}
          {...informed}
          {...userProps}
          className="block w-3/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
        />
      </label>
    </div>
  );
};

const Button = ({ label, ...props }) => {
  const { render, informed, userProps, ref } = useField(props);

  return render(
    <div className="my-2">
      <button
        ref={ref}
        {...informed}
        {...userProps}
        className="block w-3/5 rounded-md border border-transparent py-2 bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {label}
      </button>
    </div>
  );
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Label = ({ label, ...props }) => {
  const { render, informed, userProps, ref } = useField({
    ...props,
  });

  return render(
    <div className="" ref={ref} {...informed} {...userProps}>
      <div className="flex items-center justify-center text-base ">{label}</div>
    </div>
  );
};

const InputDate = ({ label, ...props }) => {
  const { render, informed, userProps, ref } = useField({
    type: "date",
    ...props,
  });

  //   const { value } = informed;
  //   console.log("value", value);

  return render(
    <div className="">
      <label className="flex items-center">
        <div className="w-2/5">{label}</div>

        <input
          ref={ref}
          {...informed}
          {...userProps}
          className="block w-3/5 rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
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
const Minitablabel = ({ children, label, ...props }) => {
  return (
    <div className=" w-full flex flex-row items-center justify-center ">
      <div className="w-4/5 h-auto border-2 rounded-lg  items-center px-4  bg-white relative">
        <div className="w-36 bg-white absolute -top-4 text-start text-base font-bold ">
          {" "}
          {label}
        </div>
        {children}
      </div>
    </div>
  );
};

const Tabs = ({ label, options, ...props }) => {
  const { render, informed, userProps, ref } = useField({ ...props });
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(informed.value);
  const handleOptionClick = (optionValue) => {
    informed.onChange(optionValue);
    setSelectedOption(optionValue);
  };

  return render(
    <div className="py-4">
      <label className="flex items-center ">
        <ul className=" mt-2  flex">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={classNames(
                selectedOption == option.value
                  ? "bg-blue-300 text-blue-800 shadow-sm shadow-slate-500 tracking-wider"
                  : "text-gray-600 ",
                "rounded-md px-3 py-2 text-sm font-medium tracking-wider"
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
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
    <div>
      <label className="flex items-center">
        <div className="w-2/5"> {label}</div>
        <select
          ref={ref}
          {...informed}
          {...userProps}
          className="mt-2 block w-3/5 px-4 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          {options
            ? options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
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
    <button
      onClick={() => {
        add();
      }}
      type="button"
    >
      Add
    </button>
  );
};

const RemoveButton = () => {
  const { remove } = useArrayFieldItemApi();

  return (
    <button
      onClick={() => {
        remove();
      }}
      type="button"
    >
      Remove
    </button>
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

const adapter = {
  select: Select,
  input: Input,
  inputDate: InputDate,
  label: Label,
  checkbox: Checkbox,
  add: AddButton,
  remove: RemoveButton,
  array: MyArrayField,
  tabs: Tabs,
  button: Button,
  minitablabel: Minitablabel,
};

const singlerow = ({ children }) => {
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="w-full grid grid-cols-2 gap-4 items-center">
        {children}
      </div>
    </div>
  );
};
const singlerowthreecolum = ({ children }) => {
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="w-full grid grid-cols-3 gap-4 items-center">
        {children}
      </div>
    </div>
  );
};

const tabcontent = ({ children }) => {
  return (
    <div className=" w-full flex flex-row items-center justify-center py-4 ">
      <div className="w-full h-96 border-2 rounded-lg  items-center px-4 py-6  bg-white">
        {children}
      </div>
    </div>
  );
};
const tabcontentForCustomerDetails = ({ children }) => {
  return (
    <div className=" w-full flex flex-row items-center justify-center py-4">
      <div className="w-full h-auto  rounded-lg  grid grid-cols-2 px-4 py-6 ">
        {children}
      </div>
    </div>
  );
};

const largetablabel = ({ children }) => {
  return (
    <div className=" w-full flex flex-row   ">
      <div className="w-full text-2xl text-blue-500 font-semibold flex items-start">
        {children}
      </div>
    </div>
  );
};

const schema = {
  type: "object",
  required: ["OrderName", "OrderID"],
  properties: {
    Order: {
      type: "object",
      "ui:control": "singlerow",
      properties: {
        OrderName: {
          type: "string",
          title: "Order Name",
          "ui:control": "input",
        },
        OrderID: {
          type: "string",
          title: "Order Id",
          "ui:control": "input",
        },
        CustomerName: {
          type: "string",
          title: "Customer Name",
          "ui:control": "input",
        },
        OrderDate: {
          type: "string",
          title: "Order Date",
          "ui:control": "inputDate",
        },
        CustomerPONumber: {
          type: "string",
          title: "Customer PO Number",
          "ui:control": "input",
        },
        ReceiveCompany: {
          type: "string",
          title: "Receiving Company",
          "ui:control": "select",
          oneOf: [
            { const: "Amazon", title: "Amazon" },
            { const: "Flipkart", title: "Flipkart" },
            { const: "Google", title: "Google" },
            { const: "Microsoft", title: "Microsoft" },
            { const: "Hcl", title: "Hcl" },
          ],
        },
        CustomerProject: {
          type: "string",
          title: "Customer Project/Reference No",
          "ui:control": "input",
        },
        TypeOfWork: {
          type: "string",
          title: "Type Of Work",
          "ui:control": "select",
          oneOf: [
            {
              const: "",
              title: "- Select -",
              "ui:props": {
                disabled: true,
              },
            },
            ,
            { const: "Process", title: "Process" },
            { const: "Start", title: "Start" },
            { const: "Finish", title: "Finish" },
          ],
        },
      },
    },
    Tabscontainer: {
      type: "object",
      properties: {
        Tabs: {
          type: "string",
          title: "Tabs",
          "ui:control": "tabs",
          oneOf: [
            { const: "OrderDetails", title: "Order Details" },
            { const: "OtherDetails", title: "Other Details" },
            { const: "Terms", title: "Terms" },
            { const: "Notes", title: "Notes" },
            { const: "CustomerDetails", title: "Customer Details" },
            { const: "ProFormaInvoice", title: "Pro-Forma-Invoice" },
          ],
        },
      },
      allOf: [
        {
          $id: "Tabscontainer",
          if: {
            properties: {
              Tabs: { const: "OtherDetails" },
            },
            required: ["Tabs"],
          },
          then: {
            properties: {
              content: {
                type: "object",
                "ui:control": "tabcontent",
                properties: {
                  Main: {
                    type: "object",
                    "ui:control": "singlerow",
                    properties: {
                      OtherCharges1: {
                        type: "string",
                        title: "OtherCharges [RS] :",
                        "ui:control": "label",
                        "ui:props": {},
                      },
                      OtherCharges2: {
                        type: "string",

                        "ui:control": "label",
                        "ui:props": {},
                      },
                    },
                },
                      Insurance: {
                        type: "string",
                        title: "Insurance",
                        "ui:control": "input",
                        "ui:props": {},
                      },
                      Packing: {
                        type: "string",
                        title: "Packing",
                        "ui:control": "input",
                        "ui:props": {},
                      },
                      Freight: {
                        type: "string",
                        title: "Freight",
                        "ui:control": "input",
                        "ui:props": {},
                      },
                 
                },
                required: ["spouse"],
              },
            },
          },
        },
        {
          $id: "Tabscontainer3",
          if: {
            properties: {
              Tabs: { const: "Terms" },
            },
            required: ["Tabs"],
          },
          then: {
            properties: {
              content: {
                type: "object",
                "ui:control": "tabcontent",
                properties: {
                  heading: {
                    "ui:control": "singlerowthreecolum",
                    type: "object",
                    properties: {
                      Title: {
                        type: "string",
                        title: "Title",
                        "ui:control": "label",
                        "ui:props": {},
                      },
                      description: {
                        type: "string",
                        title: "Description",
                        "ui:control": "label",
                        "ui:props": {},
                      },
                      Empty: {
                        type: "string",
                        "ui:control": "label",
                        "ui:props": {},
                      },
                    },
                  },
                  box1: {
                    "ui:control": "singlerowthreecolum",
                    type: "object",
                    properties: {
                      title1: {
                        type: "string",
                        "ui:control": "input",
                        "ui:props": {},
                      },
                      description1: {
                        type: "string",
                        "ui:control": "input",
                        "ui:props": {},
                      },
                      Empty1: {
                        type: "string",
                        title: "Get",
                        "ui:control": "button",
                        "ui:props": {},
                      },
                    },
                  },
                  box2: {
                    "ui:control": "singlerowthreecolum",
                    type: "object",
                    properties: {
                      title2: {
                        type: "string",
                        "ui:control": "input",
                        "ui:props": {},
                      },
                      description2: {
                        type: "string",
                        "ui:control": "input",
                        "ui:props": {},
                      },
                      Empty2: {
                        type: "string",
                        title: "Set",
                        "ui:control": "button",
                        "ui:props": {},
                      },
                    },
                  },
                  box3: {
                    "ui:control": "singlerowthreecolum",
                    type: "object",
                    properties: {
                      title3: {
                        type: "string",
                        "ui:control": "input",
                        "ui:props": {},
                      },
                      description3: {
                        type: "string",
                        "ui:control": "input",
                        "ui:props": {},
                      },
                      Empty3: {
                        type: "string",
                        title: "Clear All",
                        "ui:control": "button",
                        "ui:props": {},
                      },
                    },
                  },
                },

                required: ["spouse"],
              },
            },
          },
        },
        {
          $id: "Tabscontainer4",
          if: {
            properties: {
              Tabs: { const: "Notes" },
            },
            required: ["Tabs"],
          },
          then: {
            properties: {
              content: {
                type: "object",
                "ui:control": "tabcontent",
                properties: {
                  notes: {
                    "ui:control": "singlerowthreecolum",
                    type: "object",
                    properties: {
                      emp1: {
                        type: "string",
                        "ui:control": "label",
                        "ui:props": {},
                      },
                      emp2: {
                        type: "string",
                        "ui:control": "label",
                        "ui:props": {},
                      },
                      emp3: {
                        type: "string",
                        title: "150 charaters only",
                        "ui:control": "label",
                        "ui:props": {},
                      },
                    },
                  },
                },
                required: ["spouse"],
              },
            },
          },
        },
        {
          $id: "Tabscontainer5",
          if: {
            properties: {
              Tabs: { const: "CustomerDetails" },
            },
            required: ["Tabs"],
          },
          then: {
            properties: {
              Main: {
                type: "object",
                "ui:control": "tabcontent",
                properties: {
                  Maincontainer: {
                    type: "object",
                    "ui:control": "tabcontentForCustomerDetails",
                    properties: {
                      subcontainer: {
                        "ui:control": "minitablabel",
                        title: "Delivery Address",
                        type: "object",
                        properties: {
                          childcontainer: {
                            "ui:control": "singlerow",
                            type: "object",
                            properties: {
                              Street1: {
                                type: "string",
                                title: "Street1",
                                "ui:control": "input",
                                "ui:props": {},
                              },
                              City: {
                                type: "string",
                                title: "City",
                                "ui:control": "input",
                                "ui:props": {},
                              },
                              Street2: {
                                type: "string",
                                title: "Street2",
                                "ui:control": "input",
                                "ui:props": {},
                              },
                              pin: {
                                type: "string",
                                title: "pin",
                                "ui:control": "input",
                                "ui:props": {},
                              },
                              State: {
                                type: "string",
                                title: "State",
                                "ui:control": "input",
                                "ui:props": {},
                              },
                              Country: {
                                type: "string",
                                title: "Country",
                                "ui:control": "input",
                                "ui:props": {},
                              },
                            },
                          },
                        },
                      },
                      subcontainer2: {
                        "ui:control": "minitablabel",
                        type: "object",
                        title: "Billing Address",
                        properties: {
                          childcontainer2: {
                            "ui:control": "singlerow",
                            type: "object",
                            properties: {
                              Street1: {
                                type: "string",
                                title: "Street1",
                                "ui:control": "input",
                                "ui:props": {},
                              },
                              City: {
                                type: "string",
                                title: "City",
                                "ui:control": "input",
                                "ui:props": {},
                              },
                              Street2: {
                                type: "string",
                                title: "Street2",
                                "ui:control": "input",
                                "ui:props": {},
                              },
                              pin: {
                                type: "string",
                                title: "pin",
                                "ui:control": "input",
                                "ui:props": {},
                              },
                              State: {
                                type: "string",
                                title: "State",
                                "ui:control": "input",
                                "ui:props": {},
                              },
                              Country: {
                                type: "string",
                                title: "Country",
                                "ui:control": "input",
                                "ui:props": {},
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                  subcontainer3: {
                    "ui:control": "largetablabel",
                    type: "object",
                    properties: {
                      childcontainer3: {
                        "ui:control": "",
                        type: "object",
                        properties: {
                          Street1: {
                            type: "string",
                            title: "Contact Person details",
                            "ui:control": "label",
                            "ui:props": {},
                          },
                        },
                      },
                    },
                  },
                  subcontainer4: {
                    "ui:control": "",
                    type: "object",
                    properties: {
                      childcontainer3: {
                        "ui:control": "singlerowthreecolum",
                        type: "object",
                        properties: {
                          ContactPerson: {
                            type: "string",
                            title: "Contact Person",
                            "ui:control": "input",
                            "ui:props": {},
                          },
                          Email: {
                            type: "string",
                            title: "Email",
                            "ui:control": "input",
                            "ui:props": {},
                          },
                          ContactNO: {
                            type: "string",
                            title: "Contact NO",
                            "ui:control": "input",
                            "ui:props": {},
                          },
                        },
                      },
                    },
                  },
                },
                required: ["spouse"],
              },
            },
          },
        },
      ],
    },
  },
};

const TabComponentWithProps = ({ ...props }) => {
  const [selectedtab, setselectedtab] = useState("Order Details");

  const handleselectedtabs = (tab) => {
    setselectedtab(tab);
    currentTab = tab;
  };
  return (
    <Tabcomponent
      handleselectedtabs={handleselectedtabs}
      selectedtab={selectedtab}
      {...props}
    />
  );
};

const Schema = () => {
  return (
    <div className="w-full min-h-screen max-h-full flex items-start justify-center bg-white">
      <Form
        schema={schema}
        adapter={adapter}
        components={{
          singlerow,
          tabcontent,
          singlerowthreecolum,
          tabcontentForCustomerDetails,
          largetablabel,
        }}
        className="flex flex-col w-4/6  bg-gray-100 py-6 px-2 rounded-lg shadow-md mt-2"
      >
        <SchemaFields />

        {/* <div className="w-full flex items-center justify-center">
        <button
          type="submit"
          className="rounded-md w-3/5 bg-indigo-600 px-3.5 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div> */}

        {/* <Debug /> */}
      </Form>
    </div>
  );
};

export default Schema;
