import { useModularFilterStore } from "@/stores/filterStore/index";
import { Input } from "@headlessui/react";
import React from "react";

interface StatInputBoxProps {
  max?: number;
}

const StatInputBox: React.FC<StatInputBoxProps> = ({ max }) => {
  const statValue = useModularFilterStore((state) => state.statValue);
  const setStatValue = useModularFilterStore((state) => state.setStatValue);
  const isStatMax = useModularFilterStore((state) => state.isStatMax);

  return (
    <div className="border-1 flex rounded-md border-gray-300">
      <Input
        id="stat-input"
        type="number"
        value={statValue ?? ""}
        onChange={(e) => {
          let val = e.target.value ? Number(e.target.value) : undefined;
          if (typeof val === "number" && max !== undefined && val > max) {
            val = max;
          }
          setStatValue(val);
        }}
        max={780}
        className="h-max w-12 p-0 text-center text-sm text-white"
        placeholder={isStatMax ? "Max" : "Min"}
      />
    </div>
  );
};

export default StatInputBox;
