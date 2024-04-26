function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  
  const Tabcomponent = ({ children,handleselectedtabs,selectedtab }) => {
    const properties = children.props.schema.properties;
    const tabs = Object.values(properties);

    return (
      <div className="py-4">
        <div className="hidden sm:block">
          <nav className="flex space-x-4" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                onClick={()=>handleselectedtabs(tab.title)}
                className={classNames(
                  selectedtab==tab.title
                    ? "bg-blue-300 text-blue-800 shadow-sm shadow-slate-500 tracking-wider"
                    : "text-gray-600 ",
                  "rounded-md px-3 py-2 text-base font-medium tracking-wider"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    );
  };
  export default Tabcomponent