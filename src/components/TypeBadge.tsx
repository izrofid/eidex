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
      className="font-pixel border-1 shadow-md/50 flex w-18 flex-shrink-0 items-center justify-center whitespace-nowrap rounded-lg border-gray-300 px-2 font-bold text-gray-200"
      style={typeStyle}
    >
      {/*add type icons later here don't forget */}
      <span className="text-shadow-lg/35 text-center">{typeName}</span>
    </span>
  );
}

export { TypeBadge };
