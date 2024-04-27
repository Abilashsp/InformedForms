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
        HSNCode: {
          type: "string",
          title: "HSN Code",
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
            { const: "8220612", title: "8220612" },
            { const: "90876543", title: "90876543" },
            { const: "474985938", title: "474985938" },
          ],
        },
        AddOrder: {
          type: "string",
          title: "Add Order",
          "ui:control": "orderButton",
          "ui:props": {},
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
          "ui:props": { initialValue: "OrderDetails" },
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
                    "ui:control": "singlerowFivecolum",
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
                    "ui:control": "",
                    type: "object",
                    properties: {
                      emp3: {
                        type: "string",
                        title: "250 charaters only",
                        "ui:control": "notesInput",
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
        {
          $id: "Tabscontainer5",
          if: {
            properties: {
              Tabs: { const: "ProFormaInvoice" },
            },
            required: ["Tabs"],
          },
          then: {
            properties: {
              content: {
                type: "object",
                "ui:control": "tabcontent",
                properties: {
                  proformdetails: {
                    "ui:control": "singlerow",
                    type: "object",
                    properties: {
                      formUI1: {
                        type: "string",
                        title: "Pro-Form Name",
                        "ui:control": "proform",
                        "ui:props": {},
                      },
                      formUI2: {
                        type: "string",
                        title: "Invoice ID",
                        "ui:control": "proform",
                        "ui:props": {},
                      },

                      FormUIButtons1: {
                        type: "object",
                        "ui:control": "singlerow",
                        properties: {
                          f1buttonparent: {
                            type: "object",
                            "ui:control": "buttonwithicon",
                            title: "Add pro-forma",
                            properties: {
                              f1button1: {
                                type: "string",
                                title: "Add pro-forma",
                                icon: "BeakerIcon",
                                "ui:control": "buttonwithicon",
                              },
                            },
                          },

                          f1button2: {
                            type: "string",
                            title: "View",
                            icon: "BeakerIcon",
                            "ui:control": "buttonwithicon",
                          },
                        },
                      },
                      FormUIButtons2: {
                        type: "object",
                        "ui:control": "singlerow",
                        properties: {
                          f1button1: {
                            type: "string",
                            title: "View",
                            icon: "view",
                            "ui:control": "buttonwithicon",
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
        {
          $id: "Tabscontainer1",
          if: {
            properties: {
              Tabs: { const: "OrderDetails" },
            },
            required: ["Tabs"],
          },
          then: {
            properties: {
              content: {
                type: "object",
                "ui:control": "tabcontent",
                properties: {
                  Table: {
                    "ui:control": "table",
                    type: "object",
                    properties: {
                      ItmeName: {
                        type: "string",
                        title: "Item Name/Description",
                        "ui:control": "",
                        "ui:props": {},
                      },
                      Qty: {
                        type: "string",
                        title: "Qty",
                        "ui:control": "",
                        "ui:props": {},
                      },
                      Time: {
                        type: "string",
                        title: "Time [Hrs]",
                        "ui:control": "",
                        "ui:props": {},
                      },
                      unit: {
                        type: "string",
                        title: "Unit",
                        "ui:control": "",
                        "ui:props": {},
                      },
                      DiscountType: {
                        type: "string",
                        title: "Discount Type",
                        "ui:control": "",
                        "ui:props": {},
                      },
                      Discount: {
                        type: "string",
                        title: "Discount",
                        "ui:control": "",
                        "ui:props": {},
                      },
                      unitprice: {
                        type: "string",
                        title: "Unit Price",
                        "ui:control": "",
                        "ui:props": {},
                      },
                      Taxvalue: {
                        type: "string",
                        title: "Tax value",
                        "ui:control": "",
                        "ui:props": {},
                      },
                      Taxtype1: {
                        type: "string",
                        title: "Tax Type1",
                        "ui:control": "",
                        "ui:props": {},
                      },
                      amttype1: {
                        type: "string",
                        title: "Amt Type1",
                        "ui:control": "",
                        "ui:props": {},
                      },
                      taxtype2: {
                        type: "string",
                        title: "Tax Type2",
                        "ui:control": "",
                        "ui:props": {},
                      },
                      amttype2: {
                        type: "string",
                        title: "Amt Type2",
                        "ui:control": "",
                        "ui:props": {},
                      },
                    },
                  },
                  AdditionalFeatures:{
                    type:"object",
                    "ui:control": "singlerowthreecolum",
                    properties:{
                        btn:{
                            type:"object",
                            "ui:control": "singlecol",
                            properties:{
                                btn1: {
                                    type: "string",
                                    title: "Add Unit",
                                    "ui:control": "button",
                                    "ui:props": {},
                                  },
                                  btn2: {
                                    type: "string",
                                    title: "Add Cost",
                                    "ui:control": "button",
                                    "ui:props": {},
                                  },
                            }
                        },
                        inputfiled:{
                            type:"object",
                            "ui:control": "singlerow",
                            
                            properties:{
                                input1: {
                                    type: "string",
                                    title: "Add Item",
                                    "ui:control": "button",
                                    "ui:props": {},
                                  },
                                  input2: {
                                    type: "string",
                                    title: "Remove Item",
                                    "ui:control": "button",
                                    "ui:props": {},
                                  },
                            }
                        },
                        Cals:{
                            type:"object",
                            "ui:control": "singlecol",
                            properties:{
                                Total: {
                                    type: "string",
                                    title: "Total",
                                    "ui:control": "input",
                                    "ui:props": {},
                                  },
                                  Discount: {
                                    type: "string",
                                    title: "Discount",
                                    "ui:control": "input",
                                    "ui:props": {},
                                  },
                            }
                        }
                    }
                  }
                },
                required: ["spouse"],
              },
            },
          },
        },
      ],
    },
    Additional: {
      type: "object",
      properties: {
        Taxclaculation: {
          type: "object",
          "ui:control": "singlerowthreecolum",
          properties: {
            Tax: {
              type: "string",
              title: "Tax",
              "ui:control": "input",
            },
            Others: {
              type: "string",
              title: "+ Others",
              "ui:control": "input",
            },
            GrandTotal: {
              type: "string",
              title: "+ Grand Total",
              "ui:control": "input",
            },
          },
        },
        Opertaions: {
          type: "object",
          properties: {
            operationFunctions:{
                type: "object",
                "ui:control": "singlerowFivecolum",
                properties: {
                    NewOrder: {
                      type: "string",
                      title: "New Order",
                      "ui:control": "button",
                    },
                    Edit: {
                      type: "string",
                      title: "Edit",
                      "ui:control": "button",
                    },
                    Delete: {
                      type: "string",
                      title: "Delete",
                      "ui:control": "button",
                    },
                    Print: {
                      type: "string",
                      title: "Print",
                      "ui:control": "button",
                    },
                    AddvancePayment: {
                      type: "string",
                      title: "Advance Payment",
                      "ui:control": "orderButton",
                    },
                  },
            }

          },
        },
      },
    },
  },
};
export default schema;
