import { Switch } from "@headlessui/react";

interface ShinyToggleProps {
  isShiny: boolean;
  toggleShiny: () => void;
}

function ShinyToggle({ isShiny, toggleShiny }: ShinyToggleProps) {
  return (
    <span className="flex flex-row items-center gap-1">
      <img
        src="shinycharm.png"
        className="h-7 w-7 object-contain"
        alt="Shiny charm"
      />
      <Switch
        checked={isShiny}
        onChange={toggleShiny}
        className="data-checked:bg-emerald-500 group inline-flex h-5 w-10 cursor-pointer items-center rounded-full bg-gray-500 transition"
      >
        <span className="group-data-checked:translate-x-6 size-3 translate-x-1 rounded-full bg-white transition" />
      </Switch>
    </span>
  );
}

export default ShinyToggle;