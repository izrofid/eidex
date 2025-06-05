import { capitalize } from "@/utils/miscUtils";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useEffect, useState } from "react";

export type ComboBoxEntry = { id: number; name: string };

type GenericComboBoxProps = {
  entries: ComboBoxEntry[];
  onSelect: (entry: ComboBoxEntry | null) => void;
  placeholder?: string;
  sort?: "az" | "za" | "asc" | "desc" | "default";
  value?: ComboBoxEntry | null;
  bg?: string;
};

function GenericComboBox({
  entries,
  onSelect,
  placeholder = "Select an entry...",
  value = null,
  sort = "default",
  bg = "bg-filterbox dark:bg-filterbox-dark",
}: GenericComboBoxProps) {
  // Track the actual selected value separately from what's shown in the combobox
  const [selected, setSelected] = useState<ComboBoxEntry | null>(value);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setSelected(value);
  }, [value]);

  // First filter by query
  const filteredByQuery =
    query === ""
      ? entries
      : entries.filter((entry) =>
          entry.name.toLowerCase().includes(query.toLowerCase()),
        );

  // Sort the filtered entries based on the sort prop
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

  const filtered = sort && sort !== "default" ? sortedEntries : filteredByQuery;

  // Add query as first option if it's not a perfect match for the top item
  const filteredEntries =
    query === ""
      ? filtered
      : filtered.length === 0 ||
          filtered[0].name.toLowerCase() !== query.toLowerCase()
        ? [{ id: -1, name: capitalize(query) }, ...filtered]
        : filtered;

  const handleChange = (entry: ComboBoxEntry | null) => {
    // Pass the selected entry to the parent
    onSelect(entry);

    // Clear the selected state and query
    setSelected(null);
    setQuery("");
  };

  return (
    <Combobox
      value={selected}
      onChange={handleChange}
      immediate={true}
      virtual={{ options: filteredEntries }}
    >
      <ComboboxInput
        aria-label="Enter something"
        displayValue={() => query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        className={`${bg} h-9 w-full rounded-full px-3 text-sm text-black placeholder-zinc-200 dark:text-white dark:placeholder-gray-400`}
      />
      <ComboboxOptions
        anchor="bottom start"
        className="w-(--input-width) z-50 rounded-sm border border-gray-600 bg-zinc-200 text-neutral-900 shadow-md [--anchor-gap:4px] dark:bg-zinc-800 dark:text-gray-100 no-scrollbar"
      >
        {({ option: entry }) => (
          <ComboboxOption
            key={entry.id}
            value={entry}
            className="data-focus:bg-sky-600 dark:data-focus:bg-blue-600 pointer-events-auto w-full cursor-pointer px-3 py-2"
          >
            {entry.name}
          </ComboboxOption>
        )}
      </ComboboxOptions>
    </Combobox>
  );
}

export default GenericComboBox;
