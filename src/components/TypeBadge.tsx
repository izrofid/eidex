import { getTypeColor, getTypeName, adjustColor } from "../utils/typeData";

function TypeBadge({ typeId }: { typeId: number }) {
  // Type ID is passed as a prop
  const typeColor = getTypeColor(typeId);
  const typeName = getTypeName(typeId);

  // Set the background color and gradient
  const typeStyle = {
    backgroundColor: typeColor,
    backgroundImage: `linear-gradient(105deg, ${typeColor} 50%, ${adjustColor(typeColor, -20)} 50%)`,
  };

  return (
    <span
      className="flex w-16 flex-shrink-0 items-center whitespace-nowrap rounded-full px-1.5 py-0.5 text-xs font-semibold text-white shadow-sm"
      style={typeStyle}
    >
      {/*add type icons later */}
      <span className="ml-1">{typeName}</span>
    </span>
  );
}

export { TypeBadge };
