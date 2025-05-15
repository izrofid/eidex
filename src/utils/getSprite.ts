import { openDB } from "idb";

const DB_NAME = "spriteCache";
const STORE_NAME = "sprites";

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME);
    }
  },
});

export async function storeSprite(id: string, blob: Blob) {
  const db = await dbPromise;
  await db.put(STORE_NAME, blob, id);
}

export async function getSpriteFromCache(
  id: string,
): Promise<Blob | undefined> {
  const db = await dbPromise;
  return db.get(STORE_NAME, id);
}

async function getSprite(
  index: number,
  isShiny: boolean = false,
): Promise<string> {
  const spriteKey = `${index}_${isShiny ? "shiny" : "normal"}`;
  let blob = await getSpriteFromCache(spriteKey);

  if (!blob) {
    const spritePath = isShiny
      ? `sprites/front_shiny/${index}.png`
      : `sprites/front/${index}.png`;
    const response = await fetch(spritePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch sprite: ${spritePath}`);
    }
    blob = await response.blob();
    await storeSprite(spriteKey, blob);
  }

  return URL.createObjectURL(blob);
}

export default getSprite;
