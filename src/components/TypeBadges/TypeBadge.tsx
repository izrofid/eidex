import { getTypeName, getTypeSnapColor } from "../../utils/typeInfo";
import { typeIcons } from "../../utils/typeIcons";
const replacerReg = new RegExp("[aeiouAEIOU]", "g");
const makeBackgroundStyle = (typeColor: string, screenWidth: string) =>
  `linear-gradient(120deg, ${typeColor} 0 ${screenWidth === "md" ? "36%" : "40%"}, var(--color-stone-700) 33% 100%)`;

const adjustTypeForDevice = (str: string, screenWidth: string) => {
  if (screenWidth === "md") return str;
  if (str.length === 4) return str;
  return str.replace(replacerReg, "").slice(0, 3).toUpperCase();
};

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

  // Adjust the 40% value to match the start of the dark area in your gradient
  const spriteBackground = makeBackgroundStyle(color, screenWidth);

  return (
    <span
      className="w-18 relative inline-flex h-[22px] md:h-[24px] select-none items-center overflow-hidden rounded-full md:w-[86px]"
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
