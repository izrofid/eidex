import speciesData from "../data/speciesData.json";
import { Pokemon } from "../types";

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
  }[];
  nodeMap: Record<number, EvolutionNode>;
};

//Finds the evolutionary family for a given Pokémon species ID.

function getEvolutionaryFamily(speciesId: number): EvolutionFamily {
  // Step 1: Find the root ancestor by walking backward
  let current = speciesId;
  while (true) {
    const parent = Object.values(speciesData).find(
      (p) =>
        Array.isArray((p as Pokemon).evolutions) &&
        ((p as Pokemon).evolutions ?? []).some(
          (evo: number[]) => evo[2] === current,
        ),
    );
    if (!parent) break;
    current = (parent as Pokemon).ID;
  }
  const rootId = current;

  // Step 2: Walk forward from the root and build the tree
  const nodeMap: Record<number, EvolutionNode> = {};
  const members: { id: number; name: string; stage: number }[] = [];

  function buildTree(id: number, stage: number): EvolutionNode {
    const node: EvolutionNode = { id, children: [] };
    nodeMap[id] = node;
    const pokemon = speciesData[id.toString() as keyof typeof speciesData];
    members.push({ id, name: pokemon.name, stage });

    const evolutions = (pokemon as Pokemon).evolutions ?? [];
    for (const evo of evolutions) {
      if (Array.isArray(evo) && evo.length >= 3 && typeof evo[2] === "number") {
        const targetId = evo[2];
        const childNode = buildTree(targetId, stage + 1);
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

export { getEvolutionaryFamily };
