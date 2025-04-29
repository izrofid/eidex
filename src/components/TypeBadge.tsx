import { getTypeColor, getTypeName, adjustColor } from "../utils/typeData";

function TypeBadge({ typeId }: { typeId: number }) {
  // Type ID is passed as a prop
  const [typeColor, endColor] = getTypeColor(typeId);
  const typeName = getTypeName(typeId);

    // Set the background color and gradient
    const typeStyle = {
      backgroundColor: adjustColor(typeColor, -20),
      backgroundImage: `linear-gradient(0deg, ${typeColor}, ${endColor} 75%)`,
    };

  return (
    <div
      className="flex w-14 flex-shrink-0 items-center justify-center whitespace-nowrap rounded-sm"
      style={typeStyle}
    >
      {/*add type icons later */}
      <p className="pkmnem-face-short pkmn-types text-lg leading-5 md:text-xl md:leading-6">
        {typeName.toUpperCase()}
      </p>
    </div>
  );
}

export { TypeBadge };
