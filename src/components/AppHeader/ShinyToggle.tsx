import { Switch } from "@headlessui/react";
import { useUIStore } from "@/stores/uiStore";
import { IoSparkles } from "react-icons/io5";

function ShinyToggle() {
  const { isShiny, toggleShiny } = useUIStore();
  return (
    <span className="flex cursor-pointer">
      <Switch checked={isShiny} onChange={toggleShiny} className="group">
        <span className="group-data-checked:text-cyan-500 cursor-pointer text-gray-500 transition-colors">
          <IoSparkles size={20} />
        </span>
      </Switch>
    </span>
  );
}

export default ShinyToggle;
