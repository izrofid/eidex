//  Maps each Pokemon type to its three-letter abbreviation

const typeAbbreviations: Record<string, string> = {
  NORMAL: "NRM",
  FIRE: "FIR",
  WATER: "WTR",
  ELECTRIC: "ELE",
  GRASS: "GRS",
  ICE: "ICE",
  FIGHTING: "FGT",
  POISON: "PSN",
  GROUND: "GRD",
  FLYING: "FLY",
  PSYCHIC: "PSY",
  BUG: "BUG",
  ROCK: "RCK",
  GHOST: "GHT",
  DRAGON: "DRG",
  DARK: "DRK",
  STEEL: "STL",
  FAIRY: "FAI",
};

const adjustTypeForDevice = (str: string, screenWidth: string) => {
  if (screenWidth === "md") return str;

  const upperStr = str.toUpperCase();
  return typeAbbreviations[upperStr] || upperStr.slice(0, 3);
};

export default adjustTypeForDevice;
