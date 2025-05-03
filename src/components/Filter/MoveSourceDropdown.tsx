type MoveSource = "all" | "levelup" | "tm" | "tutor";

interface MoveSourceDropdownProps {
  value: MoveSource;
  onChange: (v: MoveSource) => void;
}

const MoveSourceDropdown: React.FC<MoveSourceDropdownProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as MoveSource)}
      className="h-9 w-24 rounded-md border-0 bg-gray-800 pl-2 pr-6 text-sm text-white focus:ring-1 focus:ring-blue-400"
    >
      <option value="all">All</option>
      <option value="levelup">Lvl</option>
      <option value="tm">TM</option>
      <option value="tutor">Tutor</option>
    </select>
  );
};

export default MoveSourceDropdown;