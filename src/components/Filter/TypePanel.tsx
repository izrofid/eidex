import { validTypes } from "@/utils/typeInfo";
import { useFilterStore } from "@/stores/filterStore";
import TypeBadgeSimple from "../TypeBadges/TypeBadgeSimple";

const TypePanel: React.FC = () => {
  const setTypeValue = useFilterStore((state) => state.setTypeValue);
  const typeValue = useFilterStore((state) => state.typeValue);

  const toggleType = (type: number) => {
    if (type === typeValue) {
        setTypeValue(undefined)
    }
    else{
        setTypeValue(type)
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-md border-2 border-zinc-500 p-3">
      <div 
        className="grid gap-2"
        style={{ 
          gridTemplateColumns: `repeat(auto-fit, minmax(80px, 1fr))`,
          width: '100%'
        }}
      >
        {validTypes.map((type) => (
          <TypeBadgeSimple
            key={type}
            typeId={type}
            onClick={() => toggleType(type)}
          />
        ))}
      </div>
    </div>
  );
};

export default TypePanel;
