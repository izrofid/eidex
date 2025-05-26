import ShinyToggle from "./ShinyToggle.tsx";
import CreditsButton from "../CreditsButton.tsx";
import RandomiserSwitch from "./RandomiserSwitch.tsx";

function SecondaryBar() {
  return (
    <div className="border-1 flex select-none justify-between rounded-md border-neutral-400 px-3 py-2">
      <div className="flex flex-row items-center gap-2">
        <ShinyToggle/>
        <RandomiserSwitch />
      </div>
      <div className="flex flex-row gap-2">
        <CreditsButton />
      </div>
    </div>
  );
}

export default SecondaryBar;
