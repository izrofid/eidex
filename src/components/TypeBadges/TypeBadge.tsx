import { getTypeName, getTypeSnapColor } from "../../utils/typeInfo";
import { typeIcons } from "../../utils/typeIcons";
import adjustTypeForDevice from "../../utils/adjustType";

const makeBackgroundStyle = (typeColor: string, screenWidth: string) =>
  `linear-gradient(120deg, ${typeColor} 0 ${screenWidth === "md" ? "36%" : "40%"}, var(--color-stone-700) 33% 100%)`;


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

  const spriteBackground = makeBackgroundStyle(color, screenWidth);

  return (
    <span
      className="w-[64px] relative inline-flex h-[22px] md:h-[24px] select-none items-center overflow-hidden rounded-full md:w-[86px]"
      style={{ background: spriteBackground }}
    >
      <span className="flex h-full w-full flex-row items-center">
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
