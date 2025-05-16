import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import {
  useState,
  useRef,
  ReactNode,
  ReactElement,
  isValidElement,
  cloneElement,
  useEffect,
} from "react";
import { MdSearch, MdClose } from "react-icons/md";

export type ComboBoxEntry = { id: number; name: string };

type GenericComboBoxProps = {
  entries: ComboBoxEntry[];
  onSelect: (entry: ComboBoxEntry | null) => void;
  placeholder?: string;
  icon?: ReactNode;
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
}: GenericComboBoxProps) {
  // Track the actual selected value separately from what's shown in the combobox
  const [selected, setSelected] = useState<ComboBoxEntry | null>(value);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const filteredEntries =
    query === ""
      ? entries
      : entries.filter((entry) =>
          entry.name.toLowerCase().includes(query.toLowerCase()),
        );

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
    <div className={`relative flex w-full items-center rounded-full ${bg} px-2`}>
      <span className="pointer-events-none absolute inset-y-0 left-2 flex items-center text-gray-400">
        {renderedIcon}
      </span>
      <Combobox
        value={selected}
        onChange={handleChange}
        onClose={handleClose}
        immediate={true}
        virtual={{ options: filteredEntries }}
        nullable
      >
        <ComboboxInput
          ref={inputRef}
          aria-label="Enter something"
          displayValue={() => query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="h-9 w-full rounded-md border-0 pl-8 text-sm text-white placeholder-gray-100 focus:ring-1 focus:ring-blue-400"
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
