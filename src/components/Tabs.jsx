import React, { useState } from "react";
import Tab from "./Tab";

export default function Tabs() {
    const Tabs = ({ tabs }) => {
        const [activeTab, setActiveTab] = useState(1);

        const handleTabClick = (index) => {
            setActiveTab(index + 1);
        };

        return (
            <div className="w-[400px] m-20px m-auto">
                <div className="flex">
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            label={tab.label}
                            onClick={() =>
                                handleTabClick(index)
                            }
                            isActive={index === activeTab}
                        />
                    ))}
                </div>
                <div className="border-1 border-solid p-[10px]">
                    Tab {activeTab} is Active
                </div>
            </div>
        );
    };
}
