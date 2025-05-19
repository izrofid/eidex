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
        disabled={trainerIdInfo === null}
        onChange={() => setRandomiserActive()}
        className="peer data-checked:bg-rose-500 group inline-flex h-5 w-10 cursor-pointer items-center rounded-full bg-gray-500 transition"
      >
        <span className="group-data-checked:translate-x-6 size-3 translate-x-1 rounded-full bg-white transition" />
      </Switch>
      <span className="text-gray-500 peer-data-checked:text-rose-500"><FaShuffle size={20} /></span>
    </span>
  );
};

export default RandomiserSwitch;
