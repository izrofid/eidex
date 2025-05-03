import { useState, useMemo, useEffect, useRef } from "react";

function FilterableDropdown({
  value,
  onChange,
  placeholder,
  options,
  icon,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
  icon?: React.ReactNode;
}) {
  const [input, setInput] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState<number>(-1);
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setInput(value || "");
  }, [value]);

  const filteredOptions = useMemo(() => {
    if (!input) return options;
    return options.filter((opt) =>
      opt.toLowerCase().includes(input.toLowerCase())
    );
  }, [input, options]);

  useEffect(() => {
    setHighlighted(filteredOptions.length > 0 ? 0 : -1);
  }, [filteredOptions, open]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || filteredOptions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => (h + 1) % filteredOptions.length);
      scrollToHighlighted((highlighted + 1) % filteredOptions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) =>
        h <= 0 ? filteredOptions.length - 1 : h - 1
      );
      scrollToHighlighted(
        highlighted <= 0 ? filteredOptions.length - 1 : highlighted - 1
      );
    } else if (e.key === "Enter" && highlighted >= 0) {
      e.preventDefault();
      const selected = filteredOptions[highlighted];
      setInput(selected);
      onChange(selected);
      setOpen(false);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  function scrollToHighlighted(idx: number) {
    if (!ulRef.current) return;
    const li = ulRef.current.children[idx] as HTMLElement | undefined;
    if (li) li.scrollIntoView({ block: "nearest" });
  }

  return (
    <div className="relative flex-1 min-w-32">
      {icon}
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => {
          const val = e.target.value;
          setInput(val);
          setOpen(true);
          if (val === "") {
            onChange(""); // Call onChange immediately when cleared
          } else if (
            !options.some((opt) =>
              opt.toLowerCase().includes(val.toLowerCase())
            )
          ) {
            onChange(val); // Call onChange with non-matching input
          }
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        onKeyDown={handleKeyDown}
        className="h-9 w-full rounded-md border-0 bg-gray-800 pl-8 pr-8 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-blue-400"
        autoComplete="off"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="dropdown-list"
      />
      {input && (
        <button
          type="button"
          className="absolute right-2 top-2 text-gray-400 hover:text-white text-lg leading-none"
          tabIndex={-1}
          onMouseDown={e => {
            e.preventDefault();
            setInput("");
            onChange("");
          }}
          aria-label="Clear"
        >
          ×
        </button>
      )}
      {open && (
        <ul
          ref={ulRef}
          id="dropdown-list"
          className="no-scrollbar absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 border border-gray-700"
          role="listbox"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.slice(0, 30).map((opt, idx) => (
              <li
                key={opt}
                role="option"
                aria-selected={highlighted === idx}
                className={
                  "cursor-pointer px-3 py-1 text-sm " +
                  (highlighted === idx
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-blue-600")
                }
                onMouseDown={() => {
                  setInput(opt);
                  onChange(opt);
                  setOpen(false);
                }}
                onMouseEnter={() => setHighlighted(idx)}
              >
                {opt}
              </li>
            ))
          ) : input ? (
            <li className="px-3 py-1 text-sm text-gray-400 select-none">No results</li>
          ) : null}
        </ul>
      )}
    </div>
  );
}

export default FilterableDropdown;