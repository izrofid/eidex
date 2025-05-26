// Label component to attach to a boxes

import React from "react";

interface BoxLabelProps {
    label: string;
    className?: string;
}

const BoxLabel: React.FC<BoxLabelProps> = ({ label, className }) => {
    return (
        <div className={`w-19 font-pixel absolute left-6  top-0 flex translate-y-[-50%] select-none items-center justify-center ring-1 rounded-sm bg-blue-900 px-4 text-center text-xs sm:text-sm font-bold uppercase text-gray-100 ${className ? className : ""}`}>
        <div className="">{label}</div>
        </div>
    );
};

export default BoxLabel;