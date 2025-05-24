#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Check if file path is provided as argument
if (process.argv.length < 3) {
  console.error('Please provide the path to speciesData.json as an argument');
  process.exit(1);
}

const filePath = process.argv[2];

// Validate if the file exists
if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

try {
  // Read the JSON file
  const speciesData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Create a lookup table for speciesIDs based on dexId
  const baseFormsByDexId = {};
  
  // First pass: Find all base forms (formId: 0) for each dexId
  for (const speciesId in speciesData) {
    const pokemon = speciesData[speciesId];
    if (pokemon.formId === 0) {
      baseFormsByDexId[pokemon.dexId] = Number(speciesId);
    }
  }
  
  // Second pass: Add baseForm to each Pokemon that has siblings
  let addedBaseForm = 0;
  let totalPokemonWithSiblings = 0;
  
  for (const speciesId in speciesData) {
    const pokemon = speciesData[speciesId];
    const dexId = pokemon.dexId;
    const baseFormId = baseFormsByDexId[dexId];
    
    // Skip if baseForm not found for this dexId
    if (baseFormId === undefined) {
      continue;
    }
    
    // For regular forms (not the baseForm itself) or for the baseForm if it has siblings
    if (pokemon.siblings && pokemon.siblings.length > 0) {
      totalPokemonWithSiblings++;
      pokemon.baseForm = baseFormId;
      addedBaseForm++;
    } else if (Number(speciesId) !== baseFormId && pokemon.formId !== 0) {
      // Handle case where a non-base form might not have siblings but should still point to base form
      pokemon.baseForm = baseFormId;
      addedBaseForm++;
    }
  }
  
  // Write the updated JSON back to the file
  fs.writeFileSync(filePath, JSON.stringify(speciesData, null, 2));
  
  console.log(`Successfully processed ${filePath}`);
  console.log(`Found ${Object.keys(baseFormsByDexId).length} unique base forms`);
  console.log(`Added baseForm reference to ${addedBaseForm} Pokemon`);
  console.log(`Total Pokemon with siblings: ${totalPokemonWithSiblings}`);
  
} catch (error) {
  console.error(`Error processing file: ${error.message}`);
  process.exit(1);
}
