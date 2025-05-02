import itemData from "../data/itemData.json";
import { ItemData } from "../types";

export function getItemData(id: number) {
  return (itemData as ItemData)[id.toString()];
}
