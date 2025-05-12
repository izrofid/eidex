import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { ComboBoxEntry } from "./GenericComboBox";
import AbilityCombobox from "./AbilityCombobox";
import TypeDropdown from "./TypeDropdown";
import MoveFilterGroup from "./MoveFilterGroup";
import { MoveSource } from "@/types";
import CurrentFilters from "./CurrentFilters";

function FilterMenu({
  onAbilitySelect,
  onTypeSelect,
  typeValue,
  abilityValue,
  nameValue,
  onNameClear,
  moveSource,
  onMoveSourceChange,
  onMoveSelect,
  moveValue,
}: {
  onAbilitySelect: (entry: ComboBoxEntry | null) => void;
  onTypeSelect: (typeId: number | undefined) => void;
  typeValue: number | undefined;
  abilityValue: ComboBoxEntry | null;
  nameValue: string;
  onNameClear?: () => void;
  moveSource: string;
  onMoveSourceChange: (source: MoveSource) => void;
  onMoveSelect: (entry: ComboBoxEntry | null) => void;
  moveValue: ComboBoxEntry | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  // Local state for staged filter values
  const [stagedType, setStagedType] = useState<number | undefined>(typeValue);
  const [stagedAbility, setStagedAbility] = useState<ComboBoxEntry | null>(
    abilityValue,
  );
  const [stagedMove, setStagedMove] = useState<ComboBoxEntry | null>(moveValue);

  // Keep stagedType in sync with prop
  useEffect(() => {
    setStagedType(typeValue);
  }, [typeValue]);

  // Keep stagedAbility in sync with prop
  useEffect(() => {
    setStagedAbility(abilityValue);
  }, [abilityValue]);

  // Keep stagedMove in sync with prop
  useEffect(() => {
    setStagedMove(moveValue);
  }, [moveValue]);

  const handleApplyFilters = () => {
    onTypeSelect(stagedType);
    onAbilitySelect(stagedAbility);
    onMoveSelect(stagedMove);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setStagedType(undefined);
    setStagedAbility(null);
    setStagedMove(null);
    onTypeSelect(undefined);
    onAbilitySelect(null);
    onMoveSelect(null);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-sm p-1 text-white hover:bg-neutral-600/80"
      >
        <HiOutlineAdjustmentsHorizontal size={20} />
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="backdrop-blur-xs fixed inset-0 flex w-screen items-center justify-center bg-neutral-900/70 p-4">
          <DialogPanel className="w-full max-w-xl space-y-2 border-1 border-zinc-500/80 rounded-md bg-neutral-900 p-4 text-white">
            <DialogTitle className="font-bold">Choose Filters</DialogTitle>
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 justify-center">
              <TypeDropdown value={stagedType} onChange={setStagedType} />
              <AbilityCombobox
                onSelect={setStagedAbility}
                value={stagedAbility}
              />
              <MoveFilterGroup
                moveSource={moveSource as MoveSource}
                onMoveSourceChange={onMoveSourceChange}
                handleMoveSelect={setStagedMove}
              />
            </div>
            <CurrentFilters
              name={nameValue}
              onClearName={onNameClear}
              typeId={stagedType}
              onClearType={() => setStagedType(undefined)}
              abilityValue={stagedAbility}
              onClearAbility={() => setStagedAbility(null)}
              moveValue={stagedMove}
              onClearMove={() => setStagedMove(null)}
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleApplyFilters}
                className="shadow-md/60 text-xs/2 h-7 w-16 rounded bg-emerald-600 p-2 text-center"
              >
                Filter
              </button>
              <button
                onClick={handleClearFilters}
                className="shadow-md/60 text-xs/2 h-7 w-16 rounded bg-red-600 p-2 text-center"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default FilterMenu;
