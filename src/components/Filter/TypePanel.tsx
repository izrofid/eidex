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
    <div className="flex flex-wrap max-sm:justify-evenly gap-2 rounded-md border-2 border-zinc-500 p-3">
      {validTypes.map((type) => (
        <TypeBadgeSimple
          key={type}
          typeId={type}
          onClick={() => toggleType(type)}
        />
      ))}
    </div>
  );
};

export default TypePanel;
