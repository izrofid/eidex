import { validTypes } from "@/utils/typeInfo";
import { useFilterStore } from "@/stores/filterStore";
import TypeBadgeSimple from "../TypeBadges/TypeBadgeSimple";

const TypePanel: React.FC = () => {
  const setTypeValue = useFilterStore((state) => state.setTypeValue);
  const typeValue = useFilterStore((state) => state.typeValue);

  return (
    <div className="w-full h-max rounded-md bg-card-backdrop">
      <div 
        className="grid gap-y-2 py-2 px-2 w-full justify-center items-center"
        style={{ 
          gridTemplateColumns: `repeat(auto-fit, minmax(80px, 1fr))`,
        }}
      >
        {validTypes.map((typeId) => (
          <TypeBadgeSimple
            key={typeId}
            typeId={typeId}
            isSelected={typeValue ? typeValue.includes(typeId) : false}
            onClick={() => setTypeValue(typeId)}
          />
        ))}
      </div>
    </div>
  );
};

export default TypePanel;
