import { useUIStore } from "@/stores/uiStore";
import React from "react";
import { LuLayoutList } from "react-icons/lu";
import { RiLayoutTopFill } from "react-icons/ri";
import { Radio, RadioGroup } from "@headlessui/react";

const views = [
    { value: "card", icon: RiLayoutTopFill, label: "Card" },
    { value: "list", icon: LuLayoutList, label: "List" },
];

const ViewChanger: React.FC = () => {
    const learnsetView = useUIStore((state) => state.learnsetView);
    const setLearnsetView = useUIStore((state) => state.setLearnsetView);

    return (
        <RadioGroup
            value={learnsetView}
            onChange={setLearnsetView}
            className="flex size-12 text-white pb-1"
        >
            {views.map(({ value, icon: Icon }) => (
                <Radio
                    key={value}
                    value={value}
                    className="data-checked:text-blue-400 flex cursor-pointer items-center justify-center rounded-full p-1 font-medium text-white transition-colors hover:text-cyan-400"
                >
                    <Icon />
                </Radio>
            ))}
        </RadioGroup>
    );
};

export default ViewChanger;
