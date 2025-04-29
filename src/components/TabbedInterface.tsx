import React, { useState } from 'react';

type TabProps = {
  label: string;
  content: React.ReactNode;
};

type TabbedInterfaceProps = {
  tabs: TabProps[];
};

const TabbedInterface: React.FC<TabbedInterfaceProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabbed-interface w-full font-pixel">
      <div className="flex justify-between border-b border-gray-600 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium focus:outline-none transition-colors
              ${
                activeTab === index
                  ? 'border-b-2 border-pink-500 text-pink-300 '
                  : 'text-gray-300 hover:text-pink-200'
              }
            `}
            style={{ marginBottom: '-1px' }}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content w-full">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default TabbedInterface;