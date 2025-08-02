import { validTypes } from "@/utils/typeInfo";
import TypeBadgeSimple from "../TypeBadges/TypeBadgeSimple";
import { useMoveDexStore } from "@/stores/moveDexStore";

const MoveTypePanel: React.FC = () => {
  const setMoveType = useMoveDexStore(state => state.setMoveType)
  const moveType = useMoveDexStore(state => state.moveFilters.moveType)

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
            isSelected={moveType ? moveType === typeId : false}
            onClick={() => setMoveType(typeId)}
          />
        ))}
      </div>
    </div>
  );
};

export default MoveTypePanel;
