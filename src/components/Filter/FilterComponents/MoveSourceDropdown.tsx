import { useModularFilterStore } from "@/stores/filterStore/index";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup, CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoveSource } from "@/types";

function MoveSourceDropdown() {
  const moveSource = useModularFilterStore(state => state.moveSource);
  const setMoveSource = useModularFilterStore(state => state.setMoveSource);
  const [open, setOpen] = useState(false);

  const options = [
    { id: "all", label: "All" },
    { id: "levelup", label: "Lvl" },
    { id: "tm", label: "TM" },
    { id: "egg", label: "Egg" },
  ];

  const selectedOption = options.find(opt => opt.id === moveSource);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="w-[80px] justify-between border-1 border-red-500/80 text-red-500"
        >
          {selectedOption?.label || "All"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[80px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.id}
                  onSelect={() => {
                    setMoveSource(option.id as MoveSource);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "h-4",
                      moveSource === option.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default MoveSourceDropdown;