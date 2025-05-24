import { Field, Checkbox } from "@headlessui/react";
import { useFilterStore } from "@/stores/filterStore";
import clsx from "clsx";

const filterToggles = [
  { label: "Evolved", color: "#16a34a" },
  { label: "Legend", color: "#2563eb" },
  { label: "Mega", color: "#db2777" },
];

function FilterRadio() {
  // Use global store for toggles and state
  const selected = useFilterStore((s) => s.filterToggles);
  const toggleState = useFilterStore((s) => s.toggleState);
  const setFilterToggle = useFilterStore((s) => s.setFilterToggle);
  const setToggleState = useFilterStore((s) => s.setToggleState);

  const handleToggle = (idx: number) => {
    setFilterToggle(idx, !selected[idx]);
  };

  return (
    <div className="flex bg-gray-50 border-2 w-full gap-0 items-center border-gray-50 overflow-clip rounded-md select-none justify-between">
      <div className="flex flex-1">
        {filterToggles.map((toggle, idx) => (
          <Field key={toggle.label} className="flex flex-1 items-center">
            <Checkbox
              checked={selected[idx]}
              onChange={() => handleToggle(idx)}
              className={clsx([
                "text-xs flex flex-1 cursor-pointer items-center justify-center px-2 py-1 border-r-2 bg-black border-gray-50 transition-colors duration-150 data-checked:font-bold text-gray-50"
              ])}
              style={selected[idx] ? { backgroundColor: toggle.color } : {}}
            >
              {toggle.label}
            </Checkbox>
          </Field>
        ))}
      </div>
      <Checkbox
        checked={toggleState === 'Only'}
        onChange={() => setToggleState(toggleState === 'Include' ? 'Only' : 'Include')}
        className="flex text-center justify-center items-center flex-shrink-1"
        style={{ minWidth: `${"Include".length + 1}ch` }}
      >
        <span
          className="flex items-center cursor-pointer text-center self-center text-xs font-semibold px-1 flex-shrink-1 align-middle"
        >
          {toggleState}
        </span>
      </Checkbox>
    </div>
  );
}

export default FilterRadio;
