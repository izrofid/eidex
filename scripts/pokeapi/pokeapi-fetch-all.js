import Pokedex from 'pokedex-promise-v2';
import fs from 'fs';
import path from 'path';

const P = new Pokedex();

async function fetchAllPokemonNames() {
  try {
    const data = await P.resource(['/api/v2/pokemon?limit=100000&offset=0']);
    const pokemonList = data[0].results.map(p => p.name);

    // Get output directory from environment variable or use default
    const dir = process.env.OUTPUT_DIR || 'external_data';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(path.join(dir, 'pokeapi_names.json'), JSON.stringify(pokemonList, null, 2));
    console.log(`✅ Dumped ${pokemonList.length} Pokémon names to pokeapi_names.json`);
  } catch (err) {
    console.error('❌ Failed to fetch Pokémon list:', err);
  }
}

fetchAllPokemonNames();
