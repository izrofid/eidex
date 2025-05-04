import speciesData from "../data/speciesData.json";
import { SpeciesData } from "../types";



// Function to return nameKey given ID
function getNameKey(id: number) {
  const species = (speciesData as SpeciesData)[id.toString()];
  return species ? species.nameKey : "Unknown Species";
}


export { getNameKey };