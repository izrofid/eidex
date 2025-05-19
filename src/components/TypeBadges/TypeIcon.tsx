import { getTypeSnapColor, getTypeName } from "../../utils/typeInfo";
import { typeIcons } from "../../utils/typeIcons";
import { useState } from "react";

function TypeIcon({ typeId, size = 32 }: { typeId: number; size?: number }) {
  const color = getTypeSnapColor(typeId);
  const icon = typeIcons[typeId];
  const typeName = getTypeName(typeId);
  const [open, setOpen] = useState(false);

  return (
    <span
      className="flex flex-row-reverse items-center cursor-pointer select-none"
      tabIndex={0}
      onClick={() => setOpen((prev) => !prev)}
      onBlur={() => setOpen(false)}
      role="button"
      aria-pressed={open}
      style={{ outline: 'none' }}
    >
      {/* Icon half */}
      <span
        className="flex items-center justify-center rounded-full transition-all duration-200"
        style={{
          background: color,
          width: size,
          height: size,
        }}
      >
        {icon && (
          <img
            src={icon}
            alt={typeName}
            className="object-contain"
            style={{
              width: size,
              height: size,
            }}
            aria-hidden="true"
          />
        )}
      </span>
      {/* Name half (expands left) */}
      {open && (
        <span
          className="flex font-medium items-center rounded-full bg-neutral-600 py-1 pl-2 "
          style={{
            height: size,
            marginRight: `-${size}px`,
            paddingRight: `${size + 4}px`,
            alignItems: 'center',
            transition: 'all 0.2s'
          }}
        >
          {typeName}
        </span>
      )}
    </span>
  );
}

export { TypeIcon };
