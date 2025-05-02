import { getTypeName, getTypeSnapColor } from "../../utils/typeInfo";
import { typeIcons } from "../../utils/typeIcons";

function TypeBadge({ typeId }: { typeId: number }) {
  const name = getTypeName(typeId);
  const color = getTypeSnapColor(typeId);
  const icon = typeIcons[typeId];

  // Adjust the 40% value to match the start of the dark area in your gradient
  const background = `linear-gradient(120deg, ${color} 0 33%, #464646 35% 100%)`;

  return (
    <span
      className="relative inline-flex items-center rounded-full overflow-hidden w-[86px] h-[24px] select-none"
      style={{ background }}
    >
      <span className="flex flex-row w-full h-full items-center">
        {/* Icon container */}
        <span className="flex items-center justify-center w-[28px] h-full">
          {icon && (
            <img
              src={icon}
              alt={name}
              className="w-[28px] h-[28px] object-contain"
              aria-hidden="true"
            />
          )}
        </span>
        {/* Name container */}
        <span className="flex-1 flex items-center justify-center h-full">
          <span className="font-medium text-white text-sm leading-none">
            {name}
          </span>
        </span>
      </span>
    </span>
  );
}

export { TypeBadge };