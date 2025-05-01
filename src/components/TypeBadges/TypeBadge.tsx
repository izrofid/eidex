import { getTypeName, getTypeSnapColor } from "../../utils/typeInfo";
import { typeIcons } from "../../utils/typeIcons";

function TypeBadge({ typeId }: { typeId: number }) {
  const name = getTypeName(typeId);
  const color = getTypeSnapColor(typeId);
  const icon = typeIcons[typeId];

  // Adjust the 40% value to match the start of the dark area in your gradient
  const background = `linear-gradient(120deg, ${color} 0 33%, #5a5a5a 35% 100%)`;

  return (
    <span
      className="relative inline-flex items-center rounded-full overflow-hidden w-[5.7rem] h-6.5 select-none"
      style={{ background }}
    >
      {icon && (
        <img
          src={icon}
          alt={name}
          className="w-7 h-7 object-contain"
          aria-hidden="true"
        />
      )}
      {/* Centered name in the dark area */}
      <span
        className="h-full flex items-center justify-center font-medium text-white text-xs"
        style={{
          width: "80%",
        }}
      >
        {name}
      </span>
    </span>
  );
}

export { TypeBadge };