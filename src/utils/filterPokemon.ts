type FilterOptions = {
  name?: string;
  typeId?: number;
  minBST?: number;
};

export function filterPokemon(
  pokemons: any[],
  filters: FilterOptions = {},
): any[] {
  return pokemons.filter((pokemon) => {
    const matchesName = filters.name
      ? pokemon.name.toLowerCase().includes(filters.name.toLowerCase())
      : true;

    const matchesType =
      filters.typeId !== undefined
        ? pokemon.types.includes(filters.typeId)
        : true;

    const matchesBST =
      filters.minBST !== undefined
        ? pokemon.stats.reduce((a: number, b: number) => a + b, 0) >=
          filters.minBST
        : true;
    return matchesName && matchesType && matchesBST;
  });
}
