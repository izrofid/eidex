import moveData from "../../data/moveData.json";
import FilterableDropdown from "./FilterableDropdown";

function MoveDropdown({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  // Convert move objects to an array of move names
  const moveNames = Object.values(moveData).map((move) => move.name);

  return (
    <FilterableDropdown
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      options={moveNames}
    />
  );
}

export default MoveDropdown;