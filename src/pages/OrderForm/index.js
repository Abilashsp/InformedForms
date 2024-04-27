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
  FormProvider,
} from "informed";
import Tabcomponent from "./Tabcomponent";
import { BeakerIcon } from "@heroicons/react/24/solid";
import schema from "./Schema";
import {
  Form,
  Input,
  Button,
  AddButton,
  MyArrayField,
  NotesInput,
  RemoveButton,
  Select,
  Tabs,
  Checkbox,
  InputDate,
  Label,
} from "./Fields";

import {
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
} from "./CustomComponents";

let currentTab = "Order Details";

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
  orderButton: OrderButton,
  notesInput: NotesInput,
  proform: Proform,
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
          buttonwithicon,
          table,
          singlerowFivecolum,
          singlecol
        }}
        className="flex flex-col w-4/6  bg-gray-100 py-6 px-2 rounded-lg shadow-md mt-2"
      >
        <SchemaFields />
      </Form>
    </div>
  );
};

export default Schema;
