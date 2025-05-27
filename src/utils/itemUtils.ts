import itemData from "../data/itemData.json";

interface Item {
  itemId: number;
  Name: string;
}

type ItemLookup = {
  [key: string]: Item;
};

const itemMap = itemData as ItemLookup;

// itemData is assumed to be an object keyed by itemId as string
export function getItemData(itemId: number): Item | undefined {
  return itemMap[itemId];
}

// Function to return item name given id
export function getItemName(id: number): string {
  if (id === 0) {
    return "None";
  }
  const item = getItemData(id);
  return item ? item.Name : "Unknown Item";
}
