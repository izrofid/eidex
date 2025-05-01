import { getTypeColor, getTypeName, adjustColor } from '../../utils/typeInfo';

function TypeBadge({ typeId }: { typeId: number }) {
  // Type ID is passed as a prop
  const [typeColor, endColor] = getTypeColor(typeId);
  const typeName = getTypeName(typeId);

  // Set the background color and gradient
  const typeStyle = {
    backgroundColor: adjustColor(typeColor, -20),
    backgroundImage: `linear-gradient(0deg, ${typeColor}, ${endColor} 100%)`,
  };

  return (
    <div
      className="flex w-16 items-center justify-center whitespace-nowrap rounded-sm py-0.5"
      style={typeStyle}
    >
      {/*add type icons later */}
      <p
        title={typeName.toUpperCase()}
        className="font-pkmnem-short pkmn-types text-xs md:text-s leading-5"
      >
        {typeName.toUpperCase()}
      </p>
    </div>
  );
}

export { TypeBadge };
