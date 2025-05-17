import { useRandomiserStore } from "@/stores/randomiserStore";
import { Switch } from "@headlessui/react";
import { FaShuffle } from "react-icons/fa6";

const RandomiserSwitch = () => {
  const isRandomiserActive = useRandomiserStore(
    (state) => state.isRandomiserActive,
  );
  const toggleRandomiserActive = useRandomiserStore(
    (state) => state.toggleRandomiserActive,
  );

  return (
    <span className="flex flex-row-reverse items-center gap-1">
      <Switch
        checked={isRandomiserActive}
        onChange={() => toggleRandomiserActive()}
        className="peer data-checked:bg-rose-500 group inline-flex h-5 w-10 cursor-pointer items-center rounded-full bg-gray-500 transition"
      >
        <span className="group-data-checked:translate-x-6 size-3 translate-x-1 rounded-full bg-white transition" />
      </Switch>
      <span className="text-gray-500 peer-data-checked:text-rose-500"><FaShuffle size={20} /></span>
    </span>
  );
};

export default RandomiserSwitch;
