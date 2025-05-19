import React, { useState, useEffect } from "react";

type Tab = {
  label: string;
  content?: React.ReactNode;
  contentFn?: () => React.ReactNode;
};

type TabbedInterfaceProps = {
  tabs: () => Tab[] | Tab[];
};

const TabbedInterface: React.FC<TabbedInterfaceProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabsData, setTabsData] = useState<Tab[]>([]);

  useEffect(() => {
    const resolvedTabs = typeof tabs === "function" ? tabs() : tabs;
    setTabsData(resolvedTabs);
  }, [tabs]);

  if (!tabsData.length) return null;

  const currentTab = tabsData[activeTab];
  const content = currentTab.contentFn ? currentTab.contentFn() : currentTab.content;

  return (
    <div className="w-full">
      <div className="flex border-gray-200">
        {tabsData.map((tab, index) => (
          <button
            key={index}
            className={`flex-1 py-2 px-4 text-center text-sm font-medium ${
              index === activeTab
                ? "border-b-2 border-emerald-500 text-emerald-500"
                : "text-gray-500 hover:text-emerald-300"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-4">{content}</div>
    </div>
  );
};

export default TabbedInterface;