import itemData from "../data/itemData.json";
import { ItemData } from "../types";

export function getItemData(id: number) {
  return (itemData as ItemData)[id.toString()];
}

// Function to return item name given id
export function getItemName(id: number) {
  const item = getItemData(id);
  return item ? item.name : "Unknown Item";
}
