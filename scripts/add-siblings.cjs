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
  
  // Create a lookup table for dexId to array of speciesIds
  const speciesByDex = {};
  
  // First pass: Build the lookup table
  for (const speciesId in speciesData) {
    const pokemon = speciesData[speciesId];
    const dexId = pokemon.dexId;
    
    if (!speciesByDex[dexId]) {
      speciesByDex[dexId] = [];
    }
    
    speciesByDex[dexId].push(Number(speciesId));
  }
  
  // Second pass: Add siblings property to each Pokemon
  for (const speciesId in speciesData) {
    const pokemon = speciesData[speciesId];
    const dexId = pokemon.dexId;
    
    // Get all siblings (including self)
    const allSpeciesIds = speciesByDex[dexId];
    
    // Filter out self to get just siblings
    const siblings = allSpeciesIds.filter(id => id !== Number(speciesId));
    
    // Only add the siblings property if there are siblings
    if (siblings.length > 0) {
      pokemon.siblings = siblings;
    }
  }
  
  // Write the updated JSON back to the file
  fs.writeFileSync(filePath, JSON.stringify(speciesData, null, 2));
  
  console.log(`Successfully added siblings to Pokemon in ${filePath}`);
  console.log(`Found ${Object.keys(speciesByDex).length} unique dexIds`);
  
  // Count how many Pokemon got siblings
  const pokemonWithSiblings = Object.values(speciesData).filter(p => p.siblings && p.siblings.length > 0).length;
  console.log(`Added siblings to ${pokemonWithSiblings} Pokemon`);
  
} catch (error) {
  console.error(`Error processing file: ${error.message}`);
  process.exit(1);
}
