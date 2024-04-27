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
  FormProvider,
} from "informed";
import React, { useState } from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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

const Tabs = ({ label, options, ...props }) => {
  const { render, informed, userProps, ref } = useField({ ...props });
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("OrderDetails");
  const handleOptionClick = (optionValue) => {
    informed.onChange(optionValue);
    setSelectedOption(optionValue);
  };

  return render(
    <div className="py-4">
      <label className="flex items-center ">
        <div className="hidden sm:block">
          <nav className="flex space-x-4" aria-label="Tabs">
            {options.map((tab) => (
              <a
                key={tab.value}
                onClick={() => handleOptionClick(tab.value)}
                href={tab.href}
                className={classNames(
                  selectedOption == tab.value
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-500 hover:text-gray-700",
                  "rounded-md px-3 py-2 text-sm font-medium"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.label}
              </a>
            ))}
          </nav>
        </div>
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

const NotesInput = ({ label, ...props }) => {
  const { render, informed, userProps, ref } = useField({
    type: "textarea",
    ...props,
  });

  return render(
    <div className="my-2">
      <label className="flex items-center w-full justify-center h-4/5">
        <textarea
          ref={ref}
          {...informed}
          {...userProps}
          className="block w-4/5 h-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
        />
      </label>
      <div className="w-full  flex items-end justify-end">{label}</div>
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

export {
  Form,
  Input,
  Button,
  AddButton,
  MyArrayField,
  NotesInput,
  RemoveButton,
  Tabs,
  Select,
  Checkbox,
  InputDate,
  Label,
};
