type MoveSource = "all" | "levelup" | "tm" | "egg";

interface MoveSourceDropdownProps {
  value: MoveSource;
  onChange: (v: MoveSource) => void;
}

const MoveSourceDropdown: React.FC<MoveSourceDropdownProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as MoveSource)}
      className="h-9 w-max rounded-md border-0 bg-neutral-800 pl-2 pr-6 text-sm text-white focus:ring-1 focus:ring-blue-400"
    >
      <option value="all">All</option>
      <option value="levelup">Lvl</option>
      <option value="tm">TM</option>
      <option value="egg">Egg</option>
    </select>
  );
};

export default MoveSourceDropdown;