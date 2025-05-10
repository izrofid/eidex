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
    const parent = speciesData.find(
      (p) =>
        Array.isArray(p.evolutions) &&
        p.evolutions.some((evo) => evo[1] === current),
    );

    if (!parent) break;
    current = parent.dexId;
  }

  return current;
}

export { findRootSpecies };

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

  function buildTree(
    id: number,
    stage: number,
    requirements?: string,
    details?: string,
  ): EvolutionNode {
    if (nodeMap[id]) return nodeMap[id];

    const node: EvolutionNode = { id, children: [] };
    nodeMap[id] = node;

    const pokemon = speciesData.find((p) => p.index === id);
    members.push({ id, name: pokemon!.nameKey, stage, requirements, details });

    const evolutions = pokemon!.evolutions ?? [];
    for (const evo of evolutions) {
      if (Array.isArray(evo) && evo.length >= 3 && typeof evo[1] === "number") {
        const targetId = evo[1];

        if (!nodeMap[targetId]) {
          const childNode = buildTree(
            targetId,
            stage + 1,
            parseShortEvolutions[evo[0]](evo),
            parseEvolutions[evo[0]](evo),
          );
          node.children.push(childNode);
        } else {
          node.children.push(nodeMap[targetId]); // reuse
        }
      }
    }

    console.log(
      `[buildTree] id=${id} name=${pokemon!.nameKey} stage=${stage}` +
        (requirements ? ` | req=${requirements}` : "") +
        (details ? ` | details=${details}` : ""),
    );

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
