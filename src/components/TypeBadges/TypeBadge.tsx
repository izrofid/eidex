import { getTypeName, getTypeSnapColor } from "../../utils/typeInfo";
import { typeIcons } from "../../utils/typeIcons";
import adjustTypeForDevice from "../../utils/adjustType";

function TypeBadge({
  typeId,
  screenWidth,
}: {
  typeId: number;
  screenWidth: string;
}) {
  const name = adjustTypeForDevice(getTypeName(typeId), screenWidth);
  const color = getTypeSnapColor(typeId);
  const icon = typeIcons[typeId];

  // Determine clip path percentage based on screen width
  const clipPathPercentage = screenWidth === "md" ? "38%" : "42%";

  return (
    <span
      className="relative inline-flex h-[22px] w-[68px] select-none items-center overflow-hidden rounded-full shadow-sm transition-all duration-200 hover:shadow-md md:h-[24px] md:w-[86px]"
      style={{
        backgroundColor: "var(--color-stone-700)",
      }}
    >
      {/* Color section with clip path */}
      <span
        className="absolute inset-0"
        style={{
          backgroundColor: color,
          clipPath: `polygon(0 0, ${clipPathPercentage} 0, calc(${clipPathPercentage} - 8px) 100%, 0 100%)`,
        }}
      />

      <span className="relative z-10 flex h-full w-full flex-row items-center">
        {/* Icon container */}
        <span className="flex h-full w-[28px] items-center">
          {icon && (
            <img
              src={icon}
              alt={name}
              className="h-6 w-20 object-contain"
              aria-hidden="true"
            />
          )}
        </span>
        {/* Name container */}
        <span className="flex h-full flex-1 items-center justify-center">
          <span className="pr-1 text-xs font-bold leading-none text-white sm:font-medium">
            {name}
          </span>
        </span>
      </span>
    </span>
  );
}

export { TypeBadge };
