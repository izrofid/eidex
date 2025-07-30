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

  const disableRandomiserActive = useRandomiserStore(
    (state) => state.disableRandomiserActive,
  );

  const trainerIdInfo = useRandomiserStore(
    (state) => state.trainerIdInfo,
  );

  const setRandomiserActive = () => {
    if (trainerIdInfo) {
      toggleRandomiserActive();
    } else {
      disableRandomiserActive();
    }
  };

  return (
    <span className="flex flex-row-reverse items-center gap-1">
      <Switch
        checked={isRandomiserActive}
        disabled={!trainerIdInfo}
        onChange={() => setRandomiserActive()}
        className="group"
      >
              <span className="text-gray-500 cursor-pointer transition-colors group-data-checked:text-rose-500 group-data-disabled:hidden"><FaShuffle size={20} /></span>
      </Switch>

    </span>
  );
};

export default RandomiserSwitch;
