import itemData from "../data/itemData.json";

interface Item {
  itemId: number;
  Name: string;
}

const itemMap = new Map<number, Item>();
for (const item of itemData) {
  if (item) itemMap.set(item.itemId, item);
}

export function getItemData(itemId: number): Item | undefined {
  return itemMap.get(itemId);
}

// Function to return item name given id
export function getItemName(id: number): string {
  const item = getItemData(id);
  return item ? item.Name : "Unknown Item";
}
