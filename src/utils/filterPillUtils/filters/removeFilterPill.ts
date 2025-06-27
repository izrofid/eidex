import { MoveValue } from "@/stores/filterStore/types";
import { FilterPill } from "../types/types";
import { useModularFilterStore } from "@/stores/filterStore/index";

export function removeFilterPill(
    pillToRemove: FilterPill,
): void {
    const store = useModularFilterStore.getState();

    switch (pillToRemove.type) {
        case "name":
            store.clearName()
            break;

        // case "type": {
        //     const typeId = pillToRemove.value as number;
        //     removeType(typeId);
        //     break;
        // }

        case "ability":
            store.setAbility(0);
            break;

        // case "stat":
        //     removeStat();
        //     break;

        case "item":
            store.setHeldItem(0);
            break;

        case "move": {
            const moveValue = pillToRemove.value as MoveValue;
            store.removeMoveValue(moveValue);
            break;
        }

        // case "sort":
        //     removeSort();
        //     break;

        default:
            break;
    }
}
