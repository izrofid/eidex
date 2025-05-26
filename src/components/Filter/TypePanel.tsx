import { validTypes } from "@/utils/typeInfo";
import { useFilterStore } from "@/stores/filterStore";
import TypeBadgeSimple from "../TypeBadges/TypeBadgeSimple";

const TypePanel: React.FC = () => {
  const setTypeValue = useFilterStore((state) => state.setTypeValue);
  const typeValue = useFilterStore((state) => state.typeValue);

  return (
    <div className="w-full overflow-hidden rounded-md bg-card-backdrop p-3">
      <div 
        className="grid gap-2"
        style={{ 
          gridTemplateColumns: `repeat(auto-fit, minmax(80px, 1fr))`,
          width: '100%'
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
