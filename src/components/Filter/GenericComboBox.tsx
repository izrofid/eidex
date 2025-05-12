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
};

function GenericComboBox({
  entries,
  onSelect,
  placeholder,
  icon = <MdSearch size={20} />,
  value = null,
}: GenericComboBoxProps) {
  const [selected, setSelected] = useState<ComboBoxEntry | null>(value);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [comboWidth, setComboWidth] = useState<number>();

  useLayoutEffect(() => {
    if (parentRef.current) {
      setComboWidth(parentRef.current.offsetWidth);
    }
  }, []);

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
    setSelected(entry);
    onSelect(entry);
  };

  const handleClose = () => {
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
      ref={parentRef}
      className="relative flex w-full min-w-[160px] flex-1 rounded-md bg-neutral-800"
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
          placeholder={placeholder || "Select an entry..."}
          className="h-9 w-full min-w-[120px] rounded-md border-0 bg-neutral-800 px-2 pl-9 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-blue-400"
        />
        <ComboboxOptions
          anchor="bottom start"
          style={comboWidth ? { width: comboWidth } : { minWidth: 160 }}
          className="no-scrollbar rounded-sm border border-gray-600 bg-neutral-800 text-white shadow-md [--anchor-gap:4px]"
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
