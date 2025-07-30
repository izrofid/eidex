import ShinyToggle from "./MiscUI/ShinyToggle.tsx";
import CreditsButton from "./InfoSection/CreditsButton.tsx";
import RandomiserSwitch from "./RandomiserSwitch.tsx";
import HelpButton from "./InfoSection/HelpButton.tsx";

function SecondaryBar() {
  return (
    <div className="bg-card-backdrop flex select-none justify-between rounded-md px-3 py-2">
      <div className="flex flex-row items-center gap-2">
        <ShinyToggle/>
        <RandomiserSwitch />
      </div>
      <div className="flex flex-row gap-2">
        <HelpButton/>
        <CreditsButton />
      </div>
    </div>
  );
}

export default SecondaryBar;
