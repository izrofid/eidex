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
      className="flex w-14 items-center justify-center whitespace-nowrap rounded-sm"
      style={typeStyle}
    >
      {/*add type icons later */}
      <p
        title={typeName.toUpperCase()}
        className="pkmnem-face-short pkmn-types text-xs md:text-s leading-5"
      >
        {typeName.toUpperCase()}
      </p>
    </div>
  );
}

export { TypeBadge };
