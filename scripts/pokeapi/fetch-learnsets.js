import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Pokedex from 'pokedex-promise-v2';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const P = new Pokedex();

const outputDir = path.resolve(__dirname, '../../external_data');
const VERSION_GROUP = process.env.VERSION_GROUP || 'scarlet-violet';
// Allow input file as argument, else default to sanitized_name_keys.json
const INPUT_FILE = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(outputDir, 'sanitized_name_keys.json');
const OUTPUT_FILE = path.join(outputDir, `vanilla_learnsets-${VERSION_GROUP}.json`);

const LEARN_METHOD_CATEGORIES = {
  "level-up": "level-up",
  "egg": "egg",
  "machine": "machine",
  "tutor": "tutor",
  "stadium-surfing-pikachu": "stadium-surfing-pikachu",
  "light-ball-egg": "light-ball-egg",
  "colosseum-purification": "colosseum-purification",
  "xd-shadow": "xd-shadow",
  "xd-purification": "xd-purification",
  "form-change": "form-change",
  "zygarde-cube": "zygarde-cube"
};

const moveCache = {};

// Limit concurrent API calls to avoid rate limiting
async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = [];
  const executing = [];
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);
    if (poolLimit <= array.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}

async function prefetchAllMoveNames(pokemonList) {
  // 1. Collect all unique move slugs
  const uniqueMoves = new Set();
  console.log(`Prefetching Pokémon data to collect all unique moves...`);
  for (let i = 0; i < pokemonList.length; i++) {
    const name = pokemonList[i];
    try {
      const data = await P.getPokemonByName(name);
      for (const moveEntry of data.moves) {
        uniqueMoves.add(moveEntry.move.name);
      }
      if ((i + 1) % 10 === 0 || i === pokemonList.length - 1) {
        console.log(`[${i + 1}/${pokemonList.length}] Pokémon scanned for moves`);
      }
    } catch (err) {
      console.warn(`Failed to fetch moves for ${name}:`, err.message);
    }
  }
  // 2. Fetch all move names in parallel (limit concurrency)
  const moveSlugs = Array.from(uniqueMoves);
  console.log(`Prefetching ${moveSlugs.length} unique move names...`);
  let movesFetched = 0;
  await asyncPool(10, moveSlugs, async (moveSlug, idx) => {
    if (!moveCache[moveSlug]) {
      try {
        const data = await P.getMoveByName(moveSlug);
        const english = data.names.find(n => n.language.name === 'en')?.name || moveSlug;
        moveCache[moveSlug] = english;
      } catch (err) {
        moveCache[moveSlug] = moveSlug;
        console.warn(`Failed to prefetch move '${moveSlug}':`, err.message);
      }
    }
    movesFetched++;
    if (movesFetched % 25 === 0 || movesFetched === moveSlugs.length) {
      console.log(`[${movesFetched}/${moveSlugs.length}] Moves prefetched`);
    }
  });
}

async function getMoveEnglishName(moveSlug) {
  // Always use the prefilled cache
  return moveCache[moveSlug] || moveSlug;
}

async function getLearnset(pokemonName) {
  try {
    const data = await P.getPokemonByName(pokemonName);
    const categorizedMoves = {
      "level-up": [],
      "egg": [],
      "machine": [],
      "tutor": [],
      "other": []
    };
    for (const moveEntry of data.moves) {
      for (const vgd of moveEntry.version_group_details) {
        if (vgd.version_group.name !== VERSION_GROUP) continue;
        const method = vgd.move_learn_method.name;
        const moveSlug = moveEntry.move.name;
        const displayName = await getMoveEnglishName(moveSlug);
        const moveData = { slug: moveSlug, name: displayName };
        if (method === "level-up") {
          moveData.level = vgd.level_learned_at;
          categorizedMoves["level-up"].push(moveData);
        } else if (method in LEARN_METHOD_CATEGORIES) {
          categorizedMoves[method].push(moveData);
        } else {
          moveData.method = method;
          categorizedMoves["other"].push(moveData);
        }
      }
    }
    categorizedMoves["level-up"].sort((a, b) => a.level - b.level);
    return { [pokemonName]: categorizedMoves };
  } catch (err) {
    console.error(`Failed for ${pokemonName}:`, err.message);
    return { [pokemonName]: {} };
  }
}

async function run() {
  const pokemonList = JSON.parse(fs.readFileSync(INPUT_FILE));
  await prefetchAllMoveNames(pokemonList);
  const allLearnsets = {};
  const total = pokemonList.length;
  for (let i = 0; i < total; i++) {
    const name = pokemonList[i];
    const learnset = await getLearnset(name);
    Object.assign(allLearnsets, learnset);
    console.log(`[${i + 1}/${total}] ✅ Processed ${name}`);
  }
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allLearnsets, null, 2));
  console.log(`\n🎉 Learnsets saved to ${OUTPUT_FILE}`);
}

run();