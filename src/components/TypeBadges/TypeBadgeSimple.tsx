import { getTypeColor, getTypeName, adjustColor } from "../../utils/typeInfo";

function TypeBadgeSimple({
  typeId,
  onClick,
  isSelected,
}: {
  typeId: number;
  isSelected?: boolean;
  onClick: () => void;
}) {
  // Type ID is passed as a prop
  const typeColor = getTypeColor(typeId)[0];
  const typeName = getTypeName(typeId);

  // Set the background color with transparency (e.g., 0.7 alpha)
  const bgColor = adjustColor(typeColor, -20);

  // Set the background color and gradient
  const typeStyle = {
    backgroundColor: bgColor,
    borderColor: bgColor,
  };

  const deselectedTypeStyle = {
    backgroundColor: "transparent",
    borderColor: bgColor,
  };

  return (
    <div
      className={`w-17 flex cursor-pointer items-center justify-center select-none whitespace-nowrap rounded-full bg-transparent py-0.5 border-2`}
      style={isSelected ? typeStyle : deselectedTypeStyle}
      onClick={onClick}
    >
      <p title={typeName} className={`text-sm ${isSelected ? "font-bold" : ""} text-white`}>
        {typeName}
      </p>
    </div>
  );
}

export default TypeBadgeSimple;
