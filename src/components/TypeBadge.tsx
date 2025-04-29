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
    <div
      className="flex w-16 flex-shrink-0 items-center justify-center whitespace-nowrap rounded-sm leading-tight"
      style={typeStyle}
    >
      {/*add type icons later */}
      <p
        className="flex pkmnem-face-short pkmn-types -mt-[1px] self-center text-lg leading-5 md:text-xl md:leading-6"
        style={{ verticalAlign: "middle" }}
      >
        {typeName.toUpperCase()}
      </p>
    </div>
  );
}

export { TypeBadge };
