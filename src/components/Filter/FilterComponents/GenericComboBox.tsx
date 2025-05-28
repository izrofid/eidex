import { capitalize } from "@/utils/miscUtils";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import {
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdClose, MdSearch } from "react-icons/md";


export type ComboBoxEntry = { id: number; name: string };

type GenericComboBoxProps = {
  entries: ComboBoxEntry[];
  onSelect: (entry: ComboBoxEntry | null) => void;
  placeholder?: string;
  icon?: ReactNode;
  sort?: "az" | "za" | "asc" | "desc" | "default";
  value?: ComboBoxEntry | null;
  bg?: string;
};

function GenericComboBox({
  entries,
  onSelect,
  placeholder = "Select an entry...",
  icon = <MdSearch size={20} />,
  value = null,
  bg = "bg-filterbox",
  sort = "default",
}: GenericComboBoxProps) {
  // Track the actual selected value separately from what's shown in the combobox
  const [selected, setSelected] = useState<ComboBoxEntry | null>(value);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleClear = () => {
    setSelected(null);
    setQuery("");
    onSelect(null);
  };

  const handleClose = () => {
    // Blur on close
    setTimeout(() => {
      inputRef.current?.blur();
    }, 0);
  };

  const renderedIcon =
    isValidElement(icon) && typeof icon.type === "function"
      ? cloneElement(icon as ReactElement<{ size?: number }>, { size: 20 })
      : icon;

  return (
    <div
      className={`relative flex w-full items-center rounded-full ${bg} px-2`}
    >
      <span className="pointer-events-none absolute inset-y-0 left-2 flex items-center text-gray-300">
        {renderedIcon}
      </span>
      <Combobox
        value={selected}
        onChange={handleChange}
        onClose={handleClose}
        immediate={true}
        virtual={{ options: filteredEntries }}
      >
        <ComboboxInput
          ref={inputRef}
          aria-label="Enter something"
          displayValue={() => query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="h-9 w-full rounded-md border-0 pl-8 text-sm text-white placeholder-gray-400"
        />
        <span
          className="ml-2 inline-flex cursor-pointer select-none items-center text-gray-100 transition-colors hover:text-red-400 active:text-fuchsia-600"
          onClick={handleClear}
        >
          <MdClose size={20} />
        </span>
        <ComboboxOptions
          anchor="bottom start"
          className="w-(--input-width) no-scrollbar z-50 rounded-sm border border-gray-600 bg-zinc-800 text-white shadow-md [--anchor-gap:4px]"
        >
          {({ option: entry }) => (
            <ComboboxOption
              key={entry.id}
              value={entry}
              className="data-focus:bg-blue-600 w-full cursor-pointer px-3 py-2 text-white"
            >
              {entry.name}
            </ComboboxOption>
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}

export default GenericComboBox;
