import { getTypeColor, getTypeName, adjustColor } from "../utils/typeData";

function TypeBadge({ typeId }: { typeId: number }) {
  // Type ID is passed as a prop
  const typeColor = getTypeColor(typeId);
  const typeName = getTypeName(typeId);

  // Set the background color and gradient
  const typeStyle = {
    backgroundColor: adjustColor(typeColor, -20),
    // backgroundImage: `linear-gradient(105deg, ${typeColor} 50%, ${adjustColor(typeColor, -10)} 50%)`,
  };

  return (
    <span
      className="flex w-16 flex-shrink-0 items-center justify-center whitespace-nowrap rounded px-2 py-0.5 text-sm font-bold border-1 border-gray-300 text-white shadow-md/50"
      style={typeStyle}
    >
      {/*add type icons later */}
      <span className="text-center text-shadow-md/40">{typeName}</span>
    </span>
  );
}

export { TypeBadge };
