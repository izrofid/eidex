import { getItemName } from "./itemData";
import { getTypeName } from "./typeInfo";
import { getMoveName } from "./moveData";
import { getNameKey } from "./pokemonData";

const parseEvolutions: Record<number, (evo: number[]) => string> = {
  1: () => "on Level Up with Friendship",
  2: () => "on Level Up with Friendship (Day)",
  3: () => "on Level Up with Friendship (Night)",
  4: (evo) => `at Level ${evo[1]}`,
  7: (evo) => {
    const itemName = getItemName(evo[1]);
    return evo[1] !== 101
      ? `with a ${itemName}`
      : `with a ${itemName} (${evo[3] === 254 ? "Female" : "Male"})`;
  },
  8: (evo) => `at Level ${evo[1]} when Attack > Defense`,
  9: (evo) => `at Level ${evo[1]} when Attack = Defense`,
  10: (evo) => `at Level ${evo[1]} when Attack < Defense`,
  11: (evo) => `at Level ${evo[1]}, with a 50% chance`,
  12: (evo) => `at Level ${evo[1]}, with a 50% chance`,
  13: (evo) => `at Level ${evo[1]}`,
  14: () => `when evolving to Ninjask with Open Party Slot & Poke Ball`,
  16: (evo) => `at Level ${evo[1]} with Overworld Rain`,
  17: (evo) =>
    `on Level Up with Friendship and knowing a ${getTypeName(evo[1])} Type move`,
  18: (evo) => `at Level ${evo[1]} with ${getTypeName(evo[3])} Type in Party`,
  20: (evo) => `at Level ${evo[1]} (Male)`,
  21: (evo) => `at Level ${evo[1]} (Female)`,
  22: (evo) => `at Level ${evo[1]} (Night)`,
  23: (evo) => `at Level ${evo[1]} (Day)`,
  26: (evo) => `on Level Up with the move ${getMoveName(evo[1])}`,
  27: (evo) => `on Level Up with ${getNameKey(evo[1])} in Party`,
  28: (evo) => {
    const time = evo[3] === 1041 ? "Day" : evo[3] === 5144 ? "Night" : "Dusk";
    return `at Level ${evo[1]} (${time})`;
  },
  30: (evo) =>
    `at Level ${evo[1]} with Adamant, Brave, Docile, Hardy, Hasty, Impish, Jolly, Lax, Naive, Naughty, Rash, Quirky, or Sassy Nature`,
  31: (evo) =>
    `at Level ${evo[1]} with Bashful, Bold, Calm, Careful, Gentle, Lonely, Mild, Modest, Quiet, Relaxed, Serious, or Timid Nature`,
  254: (evo) =>
    evo[3] === 2
      ? `with the move ${getMoveName(evo[1])}`
      : `with the ${getItemName(evo[1])}`,
};

export { parseEvolutions };
