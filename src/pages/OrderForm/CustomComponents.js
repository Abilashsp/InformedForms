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
import { BeakerIcon,MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  
  // More people...
];





const ICONS = {
    BeakerIcon: <BeakerIcon className="size-6 text-blue-500" />,
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
const singlecol= ({ children }) => {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="w-full flex flex-col px-10  ">
          {children}
        </div>
      </div>
    );
  };
const singlerowthreecolum = ({ children }) => {
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="w-full grid grid-cols-3 gap-4 items-center mt-2">
        {children}
      </div>
    </div>
  );
};

const singlerowFivecolum = ({ children }) => {
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="w-full grid grid-cols-5 gap-4 items-center">
        {children}
      </div>
    </div>
  );
};

const tabcontent = ({ children }) => {
  return (
    <div className=" w-full flex flex-row items-center justify-center py-4 ">
      <div className="w-full h-96 border-2 rounded-lg  items-center px-4 py-6  bg-white ">
        {children}
      </div>
    </div>
  );
};
const tabcontentForCustomerDetails = ({ children }) => {
  return (
    <div className=" w-full flex flex-row items-center justify-center py-4">
      <div className="w-full h-auto  rounded-lg  grid grid-cols-2  py-6 ">
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
const buttonwithicon = ({ label, children, ...props }) => {
    const { render, informed, userProps, ref } = useField(props);
    const properties = children?.props?.schema?.properties ?? {};
    const tabs = Object.values(properties);
    const icons = tabs.map((key) => key.icon).filter((iconArray) => iconArray.length > 0);


    const Icon = icons.length > 0 ? icons : null;

  console.log(Icon)
    return render(
      <div className="my-2">
        <button
          ref={ref}
          {...informed}
          {...userProps}
          className="block w-3/5 rounded-md border border-transparent py-2 bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <div className="flex items-center w-full justify-center">
            {<MagnifyingGlassIcon className="size-6  " />}
          </div>
          {label}
        </button>
      </div>
    );
  };
const OrderButton = ({ label, ...props }) => {
  const { render, informed, userProps, ref } = useField(props);

  return render(
    <div className="my-2 flex items-end justify-end">
      <button
        ref={ref}
        {...informed}
        {...userProps}
        className="block w-3/5 rounded-3xl border border-transparent py-2 bg-green-600 text-white font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {label}
      </button>
    </div>
  );
};

const table = ({ label, children, ...props }) => {
  const { render, informed, userProps, ref } = useField(props);
  const properties = children?.props?.schema?.properties ?? {};
  const tabs = Object.values(properties);
  console.log("col", tabs);

  return (
    <div>
      <FormProvider>
        <div className="">
          <div className="flow-root">
            <div className="-mx-4  overflow-x-auto">
              <div className="inline-block min-w-full  align-middle overflow-x-auto">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 ">
                  <table className="min-w-full divide-y divide-gray-300 h-44  ">
                    <thead className="bg-[#778899]">
                      <tr>
                        <th />
                        {tabs.map((col, i) => (
                          <th
                            key={`th-${col.label}`}
                            scope="col"
                            className="py-5 border-r pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 whitespace-nowrap "
                          >
                            <div>{col.title}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {people.map((person) => (
                        <tr key={person.email}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {person.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.role}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.role}
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.role}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.role}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.role}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.role}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.role}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.role}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.role}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.role}
                          </td>

                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                              <span className="sr-only">, {person.name}</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Debug values /> */}
      </FormProvider>
    </div>
  );
};

const Proform = ({ label, ...props }) => {
  const { render, informed, userProps, ref } = useField(props);

  return render(
    <div className="">
      <div>
        <div className="bg-blue-200 h-12 border px-4 py-2">{label}</div>
        <div className="h-36 bg-white border"></div>
      </div>
    </div>
  );
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Minitablabel = ({ children, label, ...props }) => {
  console.log("props", props);
  return (
    <div className=" w-full flex flex-row items-center justify-center ">
      <div className="w-4/5 h-auto border-2 rounded-lg  items-center px-4   bg-white relative">
        <div className="w-36 bg-white absolute -top-4 text-start text-base font-bold ">
          {label}
        </div>
        {children}
      </div>
    </div>
  );
};

export {
  largetablabel,
  singlerow,
  singlerowFivecolum,
  singlerowthreecolum,
  tabcontent,
  tabcontentForCustomerDetails,
  Minitablabel,
  OrderButton,
  Proform,
  buttonwithicon,
  table,
  singlecol
};
