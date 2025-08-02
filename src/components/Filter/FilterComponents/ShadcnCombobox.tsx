"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { ComboBoxEntry } from "./GenericComboBox";
import { matchesPattern, capitalize } from "@/utils/miscUtils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type SortType = "az" | "za" | "asc" | "desc" | "default";

type ButtonStyle = "default" | "outline" | "link" | "destructive" | "secondary" | "ghost" | null | undefined;

type ShadcnGenericComboboxProps = {
    entries: ComboBoxEntry[];
    onSelect: (entry: ComboBoxEntry | null) => void;
    placeholder?: string;
    sort?: SortType;
    value?: ComboBoxEntry | null;
    className?: string;
    buttonType?: ButtonStyle;
    slice?: number;
    showQuery?: boolean;
    isControlled?: boolean
};

export function ShadcnGenericCombobox({
    entries,
    onSelect,
    placeholder = "Select entry...",
    sort = "default",
    value = null,
    className,
    buttonType="outline",
    slice = 100,
    showQuery = false,
    isControlled = false
}: ShadcnGenericComboboxProps) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [selected, setSelected] = React.useState<ComboBoxEntry | null>(value);

    React.useEffect(() => {
        if (open) {
            setSearch("");
        }
    }, [open]);

    React.useEffect(() => {
        if (!isControlled) setSelected(value ?? null);
    }, [value, !isControlled]);


    // Filtering logic
    const filteredByQuery =
        search === ""
            ? entries
            : entries.filter((entry) =>
                  matchesPattern(
                      entry.name.toLowerCase().trim(),
                      search.trim(),
                  ),
              );

    // Sorting logic
    const sortedEntries = [...filteredByQuery];
    if (sort === "az") {
        sortedEntries.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "za") {
        sortedEntries.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === "asc") {
        sortedEntries.sort((a, b) => {
            const numA = parseFloat(a.name);
            const numB = parseFloat(b.name);
            return isNaN(numA) || isNaN(numB)
                ? a.name.localeCompare(b.name)
                : numA - numB;
        });
    } else if (sort === "desc") {
        sortedEntries.sort((a, b) => {
            const numA = parseFloat(a.name);
            const numB = parseFloat(b.name);
            return isNaN(numA) || isNaN(numB)
                ? b.name.localeCompare(a.name)
                : numB - numA;
        });
    }

    const filtered =
        sort && sort !== "default" ? sortedEntries : filteredByQuery;

    const hasExactMatch = filtered.some(
  (entry) => entry.name.toLowerCase() === search.toLowerCase()
);

    // Add query as first option if not a perfect match
    const filteredEntries =
        search === ""
            ? filtered
            : showQuery && !hasExactMatch
            ? [{ id: null, name: capitalize(search) }, ...filtered]
            : filtered;

    const limitedEntries = filteredEntries.slice(0, slice);

    return (
        <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild>
                <Button
                    variant={buttonType}
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-full justify-between", className)}
                >
                    {!isControlled
                        ? selected
                            ? selected.name
                            : placeholder
                        : placeholder}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 z-50">
                <Command>
                    <CommandInput
                        placeholder="Search..."
                        className="h-9"
                        value={search}
                        onValueChange={setSearch}
                    />
                    <CommandList>
                        <CommandEmpty>No entry found.</CommandEmpty>
                        <CommandGroup>
                            {limitedEntries.map((entry) => (
                                <CommandItem
                                    key={entry.id}
                                    value={entry.name}
                                    onSelect={() => {
                                        if (!isControlled) {
                                            setSelected(entry);
                                        }
                                        onSelect(entry);
                                        setOpen(false);
                                    }}
                                >
                                    {entry.name}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            selected?.id === entry.id
                                                ? "opacity-100"
                                                : "opacity-0",
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
