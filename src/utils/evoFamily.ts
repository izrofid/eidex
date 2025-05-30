import speciesData from "../data/speciesData.json";
import { parseEvolutions, parseShortEvolutions } from "./parseEvo";

type EvolutionNode = {
  id: number;
  children: EvolutionNode[];
};

export type EvolutionFamily = {
  root: number;
  tree: EvolutionNode;
  members: {
    id: number;
    name: string;
    stage: number;
    requirements?: string;
    details?: string;
  }[];
  nodeMap: Record<number, EvolutionNode>;
};

function findRootSpecies(speciesId: number): number {
  let current = speciesId;

  while (true) {
    // speciesData is now a keyed object, so iterate over its values
    const parent = Object.values(speciesData).find(
      (p: any) =>
        Array.isArray(p.evolutions) &&
        p.evolutions.some((evo: any) => evo[1] === current),
    );

    if (!parent) break;
    // Use the correct property based on the new data structure
    current = parent.speciesId;
  }

  return current;
}

//Finds the evolutionary family for a given Pokémon species ID.

function getEvolutionaryFamily(speciesId: number): EvolutionFamily {
  const rootId = findRootSpecies(speciesId);

  // Step 2: Walk forward from the root and build the tree
  const nodeMap: Record<number, EvolutionNode> = {};
  const members: {
    id: number;
    name: string;
    stage: number;
    // Conditions to get this mon,[condition, level/condition] pass to `parseEvo`
    requirements?: string;
    details?: string;
  }[] = [];

  const dedupedMemberKeys = new Set<string>();

  function buildTree(
    id: number,
    stage: number,
    requirements?: string,
    details?: string,
  ): EvolutionNode {
    // Always reuse or create the node
    const existing = nodeMap[id];
    const node: EvolutionNode = existing ?? { id, children: [] };
    nodeMap[id] = node;

    // The speciesData is now keyed by ID, so we can access it directly
    // Convert id to string since JSON keys are strings
    const pokemonKey = id.toString();
    const pokemon = speciesData[pokemonKey as keyof typeof speciesData] || 
      Object.values(speciesData).find((p: any) => p.speciesId === id);
    if (!pokemon) {
      console.warn(`Missing Pokémon with index ${id}`);
      return node;
    }

    // For dedupe
    const memberKey = `${id}|${stage}|${requirements ?? ""}|${details ?? ""}`;
    if (!dedupedMemberKeys.has(memberKey)) {
      members.push({
        id,
        name: pokemon.nameKey,
        stage,
        requirements,
        details,
      });
      dedupedMemberKeys.add(memberKey);
    }

    const evolutions = pokemon.evolutions ?? [];
    for (const evo of evolutions) {
      if (Array.isArray(evo) && evo.length >= 3 && typeof evo[1] === "number") {
        const targetId = evo[1];
        const childNode = buildTree(
          targetId,
          stage + 1,
          parseShortEvolutions[evo[0]](evo),
          parseEvolutions[evo[0]](evo),
        );
        node.children.push(childNode);
      }
    }
    return node;
  }

  const tree = buildTree(rootId, 0);

  return {
    root: rootId,
    tree,
    members,
    nodeMap,
  };
}

export { findRootSpecies , getEvolutionaryFamily };
