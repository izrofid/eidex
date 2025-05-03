import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import {
  useState,
  useRef,
  useLayoutEffect,
  ReactNode,
  ReactElement,
  isValidElement,
  cloneElement,
} from "react";
import { MdSearch, MdClose } from "react-icons/md";

export type ComboBoxEntry = { id: number; name: string };

type GenericComboBoxProps = {
  entries: ComboBoxEntry[];
  onSelect: (entry: ComboBoxEntry | null) => void;
  placeholder?: string;
  icon?: ReactNode;
};

function GenericComboBox({
  entries,
  onSelect,
  placeholder,
  icon = <MdSearch size={20} />,
}: GenericComboBoxProps) {
  const [selected, setSelected] = useState<ComboBoxEntry | null>(null);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [comboWidth, setComboWidth] = useState<number>();

  const renderedIcon =
    isValidElement(icon) && typeof icon.type === "function"
      ? cloneElement(icon as ReactElement<{ size?: number }>, { size: 20 })
      : icon;

  useLayoutEffect(() => {
    if (parentRef.current) {
      setComboWidth(parentRef.current.offsetWidth);
    }
  }, []);

  const filteredEntries =
    query === ""
      ? entries
      : entries.filter((entry) =>
          entry.name.toLowerCase().includes(query.toLowerCase()),
        );

  const handleChange = (entry: ComboBoxEntry | null) => {
    setSelected(entry);
    onSelect(entry); // Notify parent immediately on selection
  };

  const handleClose = () => {
    setTimeout(() => {
      inputRef.current?.blur();
      // If nothing is selected, notify parent now
    }, 0);
  };

  return (
    <div
      ref={parentRef}
      className="relative flex w-full flex-1 rounded-md bg-gray-800"
    >
      <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
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
          displayValue={(entry: ComboBoxEntry) => entry?.name}
          onChange={(event) => setQuery(event.target.value)}
          // onFocus={() => {
          //   setQuery("");
          //   setSelected(null);
          // }}
          // // To clear input when user clicks
          placeholder={placeholder || "Select an entry..."}
          className="h-9 w-full min-w-max rounded-md border-0 bg-gray-800 px-2 pl-9 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-blue-400"
        />
        <ComboboxOptions
          anchor="bottom start"
          style={comboWidth ? { width: comboWidth } : undefined}
          className="no-scrollbar rounded-sm border border-gray-600 bg-gray-800 text-white shadow-md [--anchor-gap:4px]"
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
      <span
        className="inline-flex select-none items-center px-1 text-center align-middle text-gray-100 transition-colors hover:text-red-400 active:text-fuchsia-600"
        onClick={() => {
          setSelected(null);
          setQuery("");
          onSelect(null);
        }}
      >
        <MdClose size={20} />
      </span>
    </div>
  );
}

export default GenericComboBox;
