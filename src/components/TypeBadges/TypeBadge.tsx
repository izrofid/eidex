import { getTypeName, getTypeSnapColor } from "../../utils/typeInfo";
import { typeIcons } from "../../utils/typeIcons";
const { innerWidth } = window;
const replacerReg = new RegExp("[aeiouAEIOU]", "g");
// Needs refactoring too
const makeBackgroundStyle = (color: string) =>
  `linear-gradient(120deg, ${color} 0 ${innerWidth > 768 ? "33%" : "43%"}, var(--color-stone-700) 35% 100%)`;
// This should be in some hook; this is just for testing/demo rn.
const adjustForDevice = (str: string) => {
  if (innerWidth > 768) return str;
  if (str.length === 4) return str;
  return str.replace(replacerReg, "").slice(0, 3).toUpperCase();
};

function TypeBadge({ typeId }: { typeId: number }) {
  const name = adjustForDevice(getTypeName(typeId));
  const color = getTypeSnapColor(typeId);
  const icon = typeIcons[typeId];

  // Adjust the 40% value to match the start of the dark area in your gradient
  const background = makeBackgroundStyle(color);

  return (
    <span
      className="w-15 items-left relative inline-flex h-5 select-none overflow-hidden rounded-full md:w-20"
      style={{ background }}
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
          <span className="pr-1 text-xs font-medium leading-none text-white sm:font-bold">
            {name}
          </span>
        </span>
      </span>
    </span>
  );
}

export { TypeBadge };
