export type Ability = {
  id: number;
  names: string[];
  description: string;
};

export const abilities: Record<number, Ability> = {
  1: { id: 1, names: ["Stench"], description: "Helps repel wild Pokemon." },
  2: { id: 2, names: ["Drizzle"], description: "Summons Rain for 5 turns." },
  3: { id: 3, names: ["Speed Boost"], description: "Gradually boosts Speed." },
  4: {
    id: 4,
    names: ["Battle Armor", "Shell Armor"],
    description: "Blocks critical hits.",
  },
  5: { id: 5, names: ["Sturdy"], description: "Negates 1-hit KO attacks." },
  6: { id: 6, names: ["Damp"], description: "Prevents self-destruction." },
  7: { id: 7, names: ["Limber"], description: "Prevents paralysis." },
  8: {
    id: 8,
    names: ["Sand Veil"],
    description: "Ups evasion in a sandstorm.",
  },
  9: { id: 9, names: ["Static"], description: "Paralyzes on contact." },
  10: {
    id: 10,
    names: ["Volt Absorb"],
    description: "Turns electricity into HP.",
  },
  11: {
    id: 11,
    names: ["Water Absorb"],
    description: "Changes water into HP.",
  },
  12: {
    id: 12,
    names: ["Oblivious"],
    description: "Prevents attraction and Intimidate.",
  },
  13: {
    id: 13,
    names: ["Cloud Nine", "Air Lock"],
    description: "Negates weather effects.",
  },
  14: {
    id: 14,
    names: ["Compound Eyes"],
    description: "Raises accuracy by 30%.",
  },
  15: {
    id: 15,
    names: ["Insomnia", "Vital Spirit"],
    description: "Prevents sleep.",
  },
  16: {
    id: 16,
    names: ["Wind Rider"],
    description: "Immune to Wind moves and gets +1 Attack instead.",
  },
  17: { id: 17, names: ["Immunity"], description: "Prevents poisoning." },
  18: {
    id: 18,
    names: ["Flash Fire"],
    description: "Powers up if hit by fire.",
  },
  19: {
    id: 19,
    names: ["Shield Dust", "Frozen Mist"],
    description: "Stops added effects and entry hazard damage.",
  },
  20: {
    id: 20,
    names: ["Own Tempo"],
    description: "Prevents confusion and Intimidate.",
  },
  21: {
    id: 21,
    names: ["Suction Cups"],
    description: "Firmly anchors the body.",
  },
  22: {
    id: 22,
    names: ["Intimidate"],
    description: "Lowers the foe's Attack.",
  },
  23: {
    id: 23,
    names: ["Shadow Tag"],
    description: "Prevents the foe's escape.",
  },
  24: {
    id: 24,
    names: ["Quick Draw"],
    description: "Has a 30% chance to move first.",
  },
  25: {
    id: 25,
    names: ["Wonder Guard"],
    description: '"Super effective" hits.',
  },
  26: {
    id: 26,
    names: ["Levitate"],
    description: "Not hit by Ground attacks.",
  },
  27: {
    id: 27,
    names: ["Effect Spore"],
    description: "Leaves spores on contact.",
  },
  28: {
    id: 28,
    names: ["Synchronize"],
    description: "Passes on status problems.",
  },
  29: {
    id: 29,
    names: ["Clear Body", "White Smoke", "Full Metal Body"],
    description: "Prevents ability reduction.",
  },
  30: {
    id: 30,
    names: ["Natural Cure"],
    description: "Heals upon switching out.",
  },
  31: {
    id: 31,
    names: ["Lightning Rod"],
    description: "Draws electrical moves.",
  },
  32: {
    id: 32,
    names: ["Serene Grace"],
    description: "Promotes added effects.",
  },
  33: { id: 33, names: ["Swift Swim"], description: "Doubles Speed in Rain." },
  34: { id: 34, names: ["Chlorophyll"], description: "Doubles Speed in Sun." },
  35: {
    id: 35,
    names: ["Gulp Missile"],
    description: "Spits prey if damaged after a swim.",
  },
  36: { id: 36, names: ["Trace"], description: "Copies special ability." },
  37: {
    id: 37,
    names: ["Huge Power", "Pure Power"],
    description: "Raises Attack.",
  },
  38: {
    id: 38,
    names: ["Dragon's Maw"],
    description: "Powers up Dragon-type moves by 50%.",
  },
  39: {
    id: 39,
    names: ["Inner Focus"],
    description: "Prevents flinching and Intimidate.",
  },
  40: { id: 40, names: ["Magma Armor"], description: "Prevents frostbite." },
  41: { id: 41, names: ["Water Veil"], description: "Prevents burns." },
  42: {
    id: 42,
    names: ["Magnet Pull"],
    description: "Traps Steel-type Pokemon.",
  },
  43: {
    id: 43,
    names: ["Soundproof"],
    description: "Avoids sound-based moves.",
  },
  44: {
    id: 44,
    names: ["Rain Dish"],
    description: "Slight HP recovery in rain.",
  },
  45: {
    id: 45,
    names: ["Sand Stream"],
    description: "Summons Sand for 5 turns.",
  },
  46: { id: 46, names: ["Pressure"], description: "Raises foe's PP usage." },
  47: {
    id: 47,
    names: ["Thick Fat"],
    description: "Ups resistance to Fire and Ice moves by 50%.",
  },
  48: {
    id: 48,
    names: ["Early Bird"],
    description: "Awakens quickly from sleep.",
  },
  49: {
    id: 49,
    names: ["Flame Body"],
    description: "Burns the foe on contact.",
  },
  50: { id: 50, names: ["Run Away"], description: "Makes escaping easier." },
  51: {
    id: 51,
    names: ["Bad Company"],
    description: "Stops self-lowering stats and prevents recoil.",
  },
  52: {
    id: 52,
    names: ["Hyper Cutter"],
    description: "Prevents Attack reduction.",
  },
  53: {
    id: 53,
    names: ["Pickup"],
    description: "10% chance to pickup items after battle.",
  },
  54: { id: 54, names: ["Truant"], description: "Moves only every two turns." },
  55: {
    id: 55,
    names: ["Hustle"],
    description: "Reduces accuracy by 20% but boosts Atk by 50%.",
  },
  56: {
    id: 56,
    names: ["Cute Charm"],
    description: "Has a 30% chance to infatuate on contact.",
  },
  57: {
    id: 57,
    names: ["Plus"],
    description: "Boosts Sp. Atk by 50% with Minus.",
  },
  58: {
    id: 58,
    names: ["Minus"],
    description: "Boosts Sp. Atk by 50% with Plus.",
  },
  59: { id: 59, names: ["Forecast"], description: "Changes with the weather." },
  60: { id: 60, names: ["Sticky Hold"], description: "Prevents item theft." },
  61: {
    id: 61,
    names: ["Shed Skin"],
    description: "Has a 30% chance to heal its own status problem.",
  },
  62: {
    id: 62,
    names: ["Guts"],
    description: "Boosts Atk by 50% if statused.",
  },
  63: {
    id: 63,
    names: ["Marvel Scale"],
    description: "Boosts Defense by 50% if statused.",
  },
  64: {
    id: 64,
    names: ["Liquid Ooze"],
    description: "Draining causes injury.",
  },
  65: {
    id: 65,
    names: ["Overgrow"],
    description: "Boosts Grass moves by 50% at 1/3 or less HP.",
  },
  66: {
    id: 66,
    names: ["Blaze"],
    description: "Boosts Fire moves by 50% at 1/3 or less HP.",
  },
  67: {
    id: 67,
    names: ["Torrent"],
    description: "Boosts Water moves by 50% at 1/3 or less HP.",
  },
  68: {
    id: 68,
    names: ["Swarm"],
    description: "Boosts Bug moves by 50% at 1/3 or less HP.",
  },
  69: { id: 69, names: ["Rock Head"], description: "Prevents recoil damage." },
  70: { id: 70, names: ["Drought"], description: "Summons Sun for 5 turns." },
  71: { id: 71, names: ["Arena Trap"], description: "Prevents fleeing." },
  72: {
    id: 72,
    names: ["Purifying Salt"],
    description: "Resists Ghost and immune to status.",
  },
  73: {
    id: 73,
    names: ["As One"],
    description: "Both Unnerve and Grim Neigh.",
  },
  74: {
    id: 74,
    names: ["Neutralize Gas"],
    description: "All Abilities are nullified.",
  },
  75: {
    id: 75,
    names: ["Fatal Precision"],
    description: "Super effective moves can't miss & boosted by 20%",
  },
  76: {
    id: 76,
    names: ["Hunger Switch"],
    description: "Changes form each turn.",
  },
  77: { id: 77, names: ["As One"], description: "Both Unnerve and Moxie." },
  78: {
    id: 78,
    names: ["Sweet Veil"],
    description: "Keeps user and allies awake.",
  },
  79: {
    id: 79,
    names: ["Skill Link"],
    description: "Multi-hit moves hit five times.",
  },
  80: {
    id: 80,
    names: ["Motor Drive"],
    description: "Raises Speed if hit by an Electric-type move.",
  },
  81: {
    id: 81,
    names: ["Multiscale", "Blubber Defense", "Shadow Shield", "Tera Shell"],
    description: "Reduces damage at full HP.",
  },
  82: {
    id: 82,
    names: ["Technician"],
    description: "Boosts moves with less than 60 BP by 1.5x.",
  },
  83: {
    id: 83,
    names: ["Scrappy"],
    description: "Can hit Ghost-types and prevents Intimidate.",
  },
  84: {
    id: 84,
    names: ["Super Luck"],
    description: "Critical hits land more often.",
  },
  85: {
    id: 85,
    names: ["Sniper"],
    description: "Critical hits deal 2.25x instead of 1.5x.",
  },
  86: {
    id: 86,
    names: ["Regenerator"],
    description: "Heals 1/3 of HP when switching out.",
  },
  87: {
    id: 87,
    names: ["Prankster"],
    description: "Gives +1 priority to status moves.",
  },
  88: {
    id: 88,
    names: ["Adaptability"],
    description: "Boosts same type attacks by 2x instead of 1.5x.",
  },
  89: { id: 89, names: ["Illuminate"], description: "Raises accuracy by 20%." },
  90: {
    id: 90,
    names: ["Magic Bounce"],
    description: "Reflects status moves.",
  },
  91: {
    id: 91,
    names: ["Reckless"],
    description: "Boosts moves with recoil by 20%.",
  },
  92: {
    id: 92,
    names: ["Sheer Force"],
    description: "Removes added effects to boost damage by 30%.",
  },
  93: {
    id: 93,
    names: ["Iron Fist"],
    description: "Boosts punching moves by 30%.",
  },
  94: {
    id: 94,
    names: ["Rivalry"],
    description: "Boosts moves by 1.25x if foe is of same gender.",
  },
  95: {
    id: 95,
    names: ["Sand Force"],
    description: "Boosts Rock, Ground, and Steel moves in sand.",
  },
  96: {
    id: 96,
    names: ["Solar Power"],
    description: "Boosts Sp. Atk by 50% in Sun.",
  },
  97: {
    id: 97,
    names: ["Heatproof"],
    description: "Weakens the power of Fire-type moves.",
  },
  98: {
    id: 98,
    names: ["Dry Skin"],
    description: "Reduces HP if it is hot. Water restores HP.",
  },
  99: {
    id: 99,
    names: ["Tinted Lens"],
    description: "Doubles the damage of not very effective moves.",
  },
  100: {
    id: 100,
    names: ["Solid Rock", "Filter", "Prism Armor"],
    description: "Weakens super effective moves by 25%.",
  },
  101: {
    id: 101,
    names: ["Stalwart", "Propeller Tail"],
    description: "Moves ignore redirection.",
  },
  102: {
    id: 102,
    names: ["Infiltrator"],
    description: "Passes through the foe's barriers.",
  },
  103: {
    id: 103,
    names: ["Download"],
    description: "Adjusts power based on the foe's stats.",
  },
  104: {
    id: 104,
    names: ["Poison Heal"],
    description: "Restores 1/8 of maximum HP if poisoned.",
  },
  105: {
    id: 105,
    names: ["Ice Body"],
    description: "HP heals in hail, can freeze on hit.",
  },
  106: {
    id: 106,
    names: ["Bull Rush", "Quill Rush"],
    description: "Boosts power by 20% & Speed by 50% in first turn.",
  },
  107: {
    id: 107,
    names: ["Hydration"],
    description: "Heals status problems in rain.",
  },
  108: {
    id: 108,
    names: ["SupremeOverlord"],
    description: "Boosts power depending on fainted allies.",
  },
  109: {
    id: 109,
    names: ["Anger Shell"],
    description: "+Atk/SpA/Spe, -Def/SpD if hit lowers HP below 50%",
  },
  110: {
    id: 110,
    names: ["Good as Gold"],
    description: "Full immunity to status moves.",
  },
  111: {
    id: 111,
    names: ["Snow Warning"],
    description: "Summons Snow for 5 turns.",
  },
  112: {
    id: 112,
    names: ["Quick Feet"],
    description: "Doubles Speed if it has a status condition.",
  },
  113: {
    id: 113,
    names: ["Sap Sipper"],
    description: "Boosts Attack if hit by a Grass -type move.",
  },
  114: {
    id: 114,
    names: ["Overcoat"],
    description: "Immune to weather and powder.",
  },
  115: {
    id: 115,
    names: ["Magic Guard"],
    description: "Only damaged by attacks.",
  },
  116: {
    id: 116,
    names: ["Bulletproof"],
    description: "Immune to some ball and bomb moves.",
  },
  117: {
    id: 117,
    names: ["Gale Wings"],
    description: "Gives +1 priority to Flying moves at full HP.",
  },
  118: {
    id: 118,
    names: ["Moxie", "Chilling Neigh"],
    description: "Boosts Attack after knocking out a Pokemon.",
  },
  119: {
    id: 119,
    names: ["Aftermath"],
    description: "Fainting damages the foe by 1/4 its max HP.",
  },
  120: {
    id: 120,
    names: ["Cursed Body"],
    description: "30% chance to disable a foe's move when hit.",
  },
  121: {
    id: 121,
    names: ["Gooey", "Tangling Hair"],
    description: "Lowers the foe's Speed if hit by a contact move.",
  },
  122: {
    id: 122,
    names: ["Mummy", "Lingering Aroma"],
    description: "Contact with this Pokemon spreads this Ability.",
  },
  123: {
    id: 123,
    names: ["Iron Barbs", "Rough Skin"],
    description: "Inflicts damage (1/8 HP) to a foe on contact.",
  },
  124: { id: 124, names: ["Sand Rush"], description: "Doubles Speed in Sand." },
  125: {
    id: 125,
    names: ["Analytic"],
    description: "Moving last boosts power by 30%.",
  },
  126: {
    id: 126,
    names: ["No Guard"],
    description: "Ensures that all moves land.",
  },
  127: {
    id: 127,
    names: ["Mega Launcher"],
    description: "Boosts aura and pulse moves by 50%.",
  },
  128: {
    id: 128,
    names: ["Tough Claws"],
    description: "Boosts moves that make contact by 30%.",
  },
  129: {
    id: 129,
    names: ["Strong Jaw"],
    description: "Boosts biting moves by 50%.",
  },
  130: {
    id: 130,
    names: ["Victory Star"],
    description: "Raises own and ally's accuracy by 10%.",
  },
  131: {
    id: 131,
    names: ["Storm Drain"],
    description: "Immune to & draws in Water moves to boost Sp. Atk",
  },
  132: {
    id: 132,
    names: ["Dark Aura"],
    description: "Powers up all Dark-type moves by 33%.",
  },
  133: {
    id: 133,
    names: ["Fairy Aura"],
    description: "Powers up all Fairy-type moves by 33%.",
  },
  134: {
    id: 134,
    names: ["Seed Sower"],
    description: "Summons Grassy Terrain for 5 turns when hit.",
  },
  135: {
    id: 135,
    names: ["Refrigerate"],
    description: "Normal moves become Ice & boosted by 20%.",
  },
  136: {
    id: 136,
    names: ["Pixilate"],
    description: "Normal moves become Fairy & boosted by 20%.",
  },
  137: {
    id: 137,
    names: ["Aerilate"],
    description: "Normal moves become Flying & boosted by 20%.",
  },
  138: {
    id: 138,
    names: ["Feline Prowess"],
    description: "Doubles Special Attack stat.",
  },
  139: {
    id: 139,
    names: ["Unburden"],
    description: "Doubles Speed if item is lost.",
  },
  140: { id: 140, names: ["Simple"], description: "Doubles stat changes." },
  141: {
    id: 141,
    names: ["Unaware"],
    description: "Ignores foe's stat changes.",
  },
  142: {
    id: 142,
    names: ["Defiant"],
    description: "Attack rises when its stats are lowered.",
  },
  143: {
    id: 143,
    names: ["Competitive"],
    description: "Raises Sp. Atk when its stats are lowered.",
  },
  144: {
    id: 144,
    names: ["Defeatist"],
    description: "Halves Atk/Sp.Atk when its HP is at 1/3 or less.",
  },
  145: {
    id: 145,
    names: ["Slow Start"],
    description: "Takes a while to get going.",
  },
  146: {
    id: 146,
    names: ["Toxic Boost"],
    description: "Boosts Attack by 50% when poisoned.",
  },
  147: {
    id: 147,
    names: ["Flare Boost"],
    description: "Boosts Sp. Atk by 50% when burned.",
  },
  148: { id: 148, names: ["Fur Coat"], description: "Halves physical damage." },
  149: {
    id: 149,
    names: ["Wonder Skin"],
    description: "Ups status move evasion.",
  },
  150: {
    id: 150,
    names: ["Protean", "Libero"],
    description: "Changes type to match move.",
  },
  151: {
    id: 151,
    names: ["Parental Bond"],
    description: "Moves hit a second time for 25% damage.",
  },
  152: {
    id: 152,
    names: ["Mold Breaker", "Turboblaze", "Teravolt"],
    description: "Moves can be used regardless of abilities.",
  },
  153: {
    id: 153,
    names: ["Hadron Engine"],
    description: "Set E.Terrain for 5 turns Up Sp.Atk by 30% in it",
  },
  154: {
    id: 154,
    names: ["OrichalcumPulse"],
    description: "Sets Sun for 5 turns. Boosts Atk by 30% in Sun.",
  },
  155: {
    id: 155,
    names: ["Zen Mode"],
    description: "Transforms into Zen Mode.",
  },
  156: {
    id: 156,
    names: ["Battle Bond"],
    description: "Transforms into Ash Greninja after it KOs a foe.",
  },
  157: {
    id: 157,
    names: ["Beast Boost"],
    description: "KOing a foe boosts its highest stat.",
  },
  158: {
    id: 158,
    names: ["Corrosion"],
    description: "Poison can hit Steel types.",
  },
  159: {
    id: 159,
    names: ["Disguise"],
    description: "Takes one hit with no damage.",
  },
  160: {
    id: 160,
    names: ["Emergency Exit", "Wimp Out"],
    description: "Switches out below half HP.",
  },
  161: {
    id: 161,
    names: ["Fluffy"],
    description: "Halves contact hits. Takes 2x to Fire moves.",
  },
  162: {
    id: 162,
    names: ["Steely Spirit"],
    description: "Boosts own and ally Steel moves by 50%.",
  },
  163: {
    id: 163,
    names: ["Perish Body"],
    description: "Gives a perish count when hit by a contact move.",
  },
  164: {
    id: 164,
    names: ["Wandering Soul"],
    description: "Trades Abilities on contact.",
  },
  165: {
    id: 165,
    names: ["Power Construct"],
    description: "Transforms to Complete form when below half HP.",
  },
  166: {
    id: 166,
    names: ["Tablets of Ruin"],
    description: "Lowers the Attack of all other Pokemon by 25%.",
  },
  167: {
    id: 167,
    names: ["ORAORAORAORA!"],
    description: "Punch moves hit a second time for 50% dmg.",
  },
  168: {
    id: 168,
    names: ["Schooling"],
    description: "Schools up when above 25% HP.",
  },
  169: {
    id: 169,
    names: ["Beads of Ruin"],
    description: "Lowers the Sp.Def of all other Pokemon by 25%.",
  },
  170: {
    id: 170,
    names: ["Shields Down"],
    description: "Lowers shields below half HP.",
  },
  171: {
    id: 171,
    names: ["Slush Rush"],
    description: "Doubles Speed in Hail.",
  },
  172: {
    id: 172,
    names: ["Soul-Heart"],
    description: "Boosts Sp. Atk every time a Pokemon faints.",
  },
  173: {
    id: 173,
    names: ["Stamina"],
    description: "Boosts Defense when hit by an attack.",
  },
  174: {
    id: 174,
    names: ["Zero To Hero"],
    description: "Changes form upon switching.",
  },
  175: {
    id: 175,
    names: ["ThermalExchange"],
    description: "Fire-type hits raise Attack. Immune to burn.",
  },
  176: {
    id: 176,
    names: ["Triage"],
    description: "Gives +3 priority to healing moves.",
  },
  177: {
    id: 177,
    names: ["Water Bubble", "Cash Splash"],
    description: "Doubles Water moves. Takes half from Fire moves.",
  },
  178: {
    id: 178,
    names: ["WaterCompaction"],
    description: "Halves Water damage & raises Defense.",
  },
  179: {
    id: 179,
    names: ["Parasitic Waste"],
    description: "Attacks that poison also drain. ",
  },
  180: {
    id: 180,
    names: ["Multitype"],
    description: "Changes type to match held Plate.",
  },
  181: {
    id: 181,
    names: ["Electric Surge"],
    description: "Sets Electric Terrain for 5 turns.",
  },
  182: {
    id: 182,
    names: ["Grassy Surge"],
    description: "Creates Grassy Terrain for 5 turns.",
  },
  183: {
    id: 183,
    names: ["Misty Surge"],
    description: "Creates Misty Terrain for 5 turns.",
  },
  184: {
    id: 184,
    names: ["Psychic Surge"],
    description: "Creates a Psychic Terrain for 5 turns.",
  },
  185: {
    id: 185,
    names: ["Surge Surfer"],
    description: "Doubles Speed in Electric Terrain.",
  },
  186: {
    id: 186,
    names: ["Grass Pelt"],
    description: "Ups Defense by 50% in Grassy Terrain.",
  },
  187: {
    id: 187,
    names: ["Anger Point"],
    description: "Maxes Attack after a critical hit.",
  },
  188: {
    id: 188,
    names: ["Earth Eater"],
    description: "Absorbs Ground moves.",
  },
  189: {
    id: 189,
    names: ["Toxic Chain"],
    description: "Moves have a 30% chance of badly poisoning.",
  },
  190: {
    id: 190,
    names: ["Frisk"],
    description: "Reveals the foe's held item.",
  },
  191: { id: 191, names: ["Contrary"], description: "Reverses stat changes." },
  192: {
    id: 192,
    names: ["Unnerve"],
    description: "Stops the foe from eating Berries.",
  },
  193: {
    id: 193,
    names: ["Weak Armor"],
    description: "Hits by physical moves drop Def but raises Speed.",
  },
  194: { id: 194, names: ["Heavy Metal"], description: "Doubles weight." },
  195: {
    id: 195,
    names: ["Quark Drive"],
    description: "Boosts highest stat in Electric Terrain.",
  },
  196: {
    id: 196,
    names: ["Steadfast"],
    description: "Being flinched raises Speed.",
  },
  197: {
    id: 197,
    names: ["Imposter"],
    description: "Transforms into foe upon entering battle.",
  },
  198: {
    id: 198,
    names: ["Justified"],
    description: "Dark-type hits raise Attack.",
  },
  199: {
    id: 199,
    names: ["Unseen Fist"],
    description: "Contact moves bypass Protect.",
  },
  200: {
    id: 200,
    names: ["Merciless"],
    description: "Guarantees critical-hits on poisoned foes.",
  },
  201: {
    id: 201,
    names: ["Aroma Veil"],
    description: "Protects against mental problems.",
  },
  202: {
    id: 202,
    names: ["Toxic Debris"],
    description: "Sets Toxic Spikes when hit by a physical move.",
  },
  203: {
    id: 203,
    names: ["Leaf Guard"],
    description: "Protects from status in Sun.",
  },
  204: {
    id: 204,
    names: ["Electromrphosis"],
    description: "Gains Charge when hit by an attack.",
  },
  205: {
    id: 205,
    names: ["Flower Gift"],
    description: "Boosts Atk and Speed by 50% in Sun.",
  },
  206: {
    id: 206,
    names: ["Bad Dreams"],
    description: "Bypass Sleep Clause & damage sleeping foes.",
  },
  207: {
    id: 207,
    names: ["Grim Neigh"],
    description: "Boosts Sp. Atk after knocking out a Pokemon.",
  },
  208: {
    id: 208,
    names: ["Transistor"],
    description: "Powers up Electric-type moves by 50%.",
  },
  209: {
    id: 209,
    names: ["Poison Touch"],
    description: "30% chance to poison foe on contact.",
  },
  210: {
    id: 210,
    names: ["Magician"],
    description: "Can steal foe's item after attack.",
  },
  211: {
    id: 211,
    names: ["Stance Change"],
    description: "Switches form when attacking.",
  },
  212: {
    id: 212,
    names: ["Primordial Sea"],
    description: "Summons Heavy Rain that nullifies Fire moves.",
  },
  213: {
    id: 213,
    names: ["Desolate Land"],
    description: "Summons Harsh Sun that nullifies Water moves.",
  },
  214: {
    id: 214,
    names: ["Delta Stream"],
    description: "Changes weather to remove Flying-type weaknesses.",
  },
  215: {
    id: 215,
    names: ["Gorilla Tactics"],
    description: "Ups  Atk by 50% but only uses 1st picked move.",
  },
  216: {
    id: 216,
    names: ["Berserk"],
    description: "Raises Sp. Atk if hit sends it below half HP.",
  },
  217: {
    id: 217,
    names: ["Primal Armor"],
    description: "Decreases super effective moves by 50%.",
  },
  218: {
    id: 218,
    names: ["Liquid Voice"],
    description: "Sound moves become Water-type & boosted by 20%.",
  },
  219: {
    id: 219,
    names: ["Phoenix Down"],
    description: "Revives to half health on first faint.",
  },
  220: {
    id: 220,
    names: ["Innards Out"],
    description: "Fainting damages the foe equal to its last HP.",
  },
  221: {
    id: 221,
    names: ["Dazzling", "Queenly Majesty", "Armor Tail"],
    description: "Blocks priority moves.",
  },
  222: {
    id: 222,
    names: ["Gluttony"],
    description: "Eats Berries at 50% HP instead of 25%.",
  },
  223: {
    id: 223,
    names: ["Mountaineer"],
    description: "Immune to Rock attacks and Stealth Rocks.",
  },
  224: {
    id: 224,
    names: ["Friend Guard"],
    description: "Reduces damage done to allies.",
  },
  225: {
    id: 225,
    names: ["Harvest"],
    description: "50% chance to restore berry.",
  },
  226: {
    id: 226,
    names: ["Telepathy"],
    description: "Protects from allies' moves.",
  },
  227: {
    id: 227,
    names: ["Illusion"],
    description: "Enters disguised and deals 30% more damage.",
  },
  228: {
    id: 228,
    names: ["Cheek Pouch"],
    description: "Eating Berries restores HP by 1/3.",
  },
  229: {
    id: 229,
    names: ["Protosynthesis"],
    description: "Boosts highest stat in Sun.",
  },
  230: {
    id: 230,
    names: ["Stakeout"],
    description: "Doubles damage if foe switches out.",
  },
  231: { id: 231, names: ["Comatose"], description: "Acts as if asleep." },
  232: { id: 232, names: ["Dancer"], description: "Copies dance moves." },
  233: {
    id: 233,
    names: ["Bone Zone "],
    description: "Bone moves ignore immunity and resistances.",
  },
  234: {
    id: 234,
    names: ["Receiver", "Alchemic Power"],
    description: "Takes over a KOed ally's Ability.",
  },
  235: {
    id: 235,
    names: ["Self Sufficient"],
    description: "Recover 1/16 HP at end of turn.",
  },
  236: {
    id: 236,
    names: ["Neuroforce"],
    description: "Powers up super effective hits by 25%.",
  },
  237: {
    id: 237,
    names: ["Galvanize"],
    description: "Normal moves become Electric & boosted by 20%.",
  },
  238: {
    id: 238,
    names: ["Intrepid Sword"],
    description: "Raises Attack on entry.",
  },
  239: {
    id: 239,
    names: ["Valiant Shield"],
    description: "Raises Defense on entry.",
  },
  240: {
    id: 240,
    names: ["Striker"],
    description: "Boosts kicking moves by 30%.",
  },
  241: {
    id: 241,
    names: ["Cotton Down"],
    description: "Lowers everyone's Speed when hit.",
  },
  242: {
    id: 242,
    names: ["Sword Of Ruin"],
    description: "Lowers the Defense of all other Pokemon by 25%.",
  },
  243: {
    id: 243,
    names: ["Sharpness"],
    description: "Boosts slashing moves by 50%.",
  },
  244: {
    id: 244,
    names: ["Vessel Of Ruin"],
    description: "Lowers the Sp.Atk of all other Pokemon by 25%.",
  },
  245: {
    id: 245,
    names: ["Steam Engine"],
    description: "Being hit by Fire/Water moves maxes Speed.",
  },
  246: {
    id: 246,
    names: ["Punk Rock"],
    description: "Boosts sound moves by 30% & resists them by 50%.",
  },
  247: {
    id: 247,
    names: ["Sand Spit"],
    description: "Summons Sand for 5 turns when hit.",
  },
  248: {
    id: 248,
    names: ["Ice Scales"],
    description: "Halves Special damage received.",
  },
  249: { id: 249, names: ["Ripen"], description: "Doubles Berry effects." },
  250: {
    id: 250,
    names: ["Ice Face"],
    description: "Takes one free physical hit and changes form.",
  },
  251: {
    id: 251,
    names: ["Rocky Payload"],
    description: "Boosts power of Rock moves by 50%.",
  },
  252: {
    id: 252,
    names: ["Blazing Soul"],
    description: "Gives +1 priority to Fire moves at full HP.",
  },
  253: {
    id: 253,
    names: ["Screen Cleaner"],
    description: "Screens are removed on entry.",
  },
  254: {
    id: 254,
    names: ["Well-Baked Body"],
    description: "Immune to Fire moves and gets +2 Defense instead.",
  },
  255: {
    id: 255,
    names: ["Sage Power"],
    description: "Ups SpAtk by 50% but only uses 1st picked move.",
  },
};

export function getAbilityName([abilityId, abilityIndex]: [number, number]): string {
  const ability = abilities[abilityId];
  if (!ability) return "None";
  return ability.names[abilityIndex] || "None";
}