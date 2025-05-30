const fs = require('fs');
const path = require('path');

// Get paths from environment variables or use defaults
const speciesDataPath = process.env.SPECIES_DATA_PATH
  ? path.resolve(process.env.SPECIES_DATA_PATH)
  : path.resolve(__dirname, '../../src/data/speciesData.json');
const outputDir = path.resolve(__dirname, '../../external_data');

// Load ignore/mapping config
const ignoreConfig = require(path.resolve(__dirname, './pokemon_name_ignore_config.cjs'));

// Read the species data JSON file
try {
  const speciesData = require(speciesDataPath);
  
  // Extract just the name keys
  const nameKeys = Object.values(speciesData).map(s => s.nameKey);
  
  // Create sanitized versions of name keys
  const sanitizedNameKeys = nameKeys.map(name => {
    // Convert to lowercase
    let sanitized = name.toLowerCase();
    
    // Handle special cases
    if (sanitized === "nidoran♂") return "nidoran-m";
    if (sanitized === "nidoran♀") return "nidoran-f";
    // If the name starts with 'flabébé', replace with 'flabebe' (preserve suffix)
    if (sanitized.startsWith("flabébé")) return sanitized.replace(/^flabébé/, "flabebe");
    // Handle Sirfetch'd special case (should be sirfetchd without hyphen)
    if (sanitized === "sirfetch'd") return "sirfetchd";
    
    // For mr. mime and mime jr. cases
    if (sanitized === "mr. mime") return "mr-mime";
    if (sanitized === "mime jr.") return "mime-jr";
    
    // Replace apostrophes and special characters with appropriate handling
    sanitized = sanitized.replace(/'d/g, 'd');
    
    // Replace spaces and other special characters with hyphens
    sanitized = sanitized.replace(/[^\w\d]/g, '-');
    
    // Replace multiple consecutive hyphens with a single hyphen
    sanitized = sanitized.replace(/-+/g, '-');
    
    // Remove leading and trailing hyphens
    sanitized = sanitized.replace(/^-|-$/g, '');
    
    // Apply ignore/mapping config (MapToBaseForm and others)
    if (ignoreConfig.MapToBaseForm && ignoreConfig.MapToBaseForm[sanitized]) {
      sanitized = ignoreConfig.MapToBaseForm[sanitized];
    }
    if (ignoreConfig.GenderFormMapping && ignoreConfig.GenderFormMapping[sanitized]) {
      sanitized = ignoreConfig.GenderFormMapping[sanitized];
    }
    if (ignoreConfig.RegionalFormMapping && ignoreConfig.RegionalFormMapping[sanitized]) {
      sanitized = ignoreConfig.RegionalFormMapping[sanitized];
    }
    if (ignoreConfig.MaskFormMapping && ignoreConfig.MaskFormMapping[sanitized]) {
      sanitized = ignoreConfig.MaskFormMapping[sanitized];
    }
    if (ignoreConfig.PikachuCapMapping && ignoreConfig.PikachuCapMapping[sanitized]) {
      sanitized = ignoreConfig.PikachuCapMapping[sanitized];
    }
    if (ignoreConfig.PlumageFormMapping && ignoreConfig.PlumageFormMapping[sanitized]) {
      sanitized = ignoreConfig.PlumageFormMapping[sanitized];
    }
    if (ignoreConfig.NecrozmaFormMapping && ignoreConfig.NecrozmaFormMapping[sanitized]) {
      sanitized = ignoreConfig.NecrozmaFormMapping[sanitized];
    }
    if (ignoreConfig.VivillonFormMapping && ignoreConfig.VivillonFormMapping[sanitized]) {
      sanitized = ignoreConfig.VivillonFormMapping[sanitized];
    }
    if (ignoreConfig.MiniorMapping && ignoreConfig.MiniorMapping[sanitized]) {
      sanitized = ignoreConfig.MiniorMapping[sanitized];
    }
    if (ignoreConfig.AlcremieMapping && ignoreConfig.AlcremieMapping[sanitized]) {
      sanitized = ignoreConfig.AlcremieMapping[sanitized];
    }
    if (ignoreConfig.OgerponTeraMapping && ignoreConfig.OgerponTeraMapping[sanitized]) {
      sanitized = ignoreConfig.OgerponTeraMapping[sanitized];
    }
    if (ignoreConfig.ZygardeFormMapping && ignoreConfig.ZygardeFormMapping[sanitized]) {
      sanitized = ignoreConfig.ZygardeFormMapping[sanitized];
    }
    
    return sanitized;
  });
  
  // Create an object that maps original names to sanitized names for reference
  const nameMapping = {};
  nameKeys.forEach((name, index) => {
    nameMapping[name] = sanitizedNameKeys[index];
  });
  
  // Make sure the output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write the name keys to files
  fs.writeFileSync(
    path.join(outputDir, 'name_keys.json'), 
    JSON.stringify(nameKeys, null, 2)
  );
  
  fs.writeFileSync(
    path.join(outputDir, 'sanitized_name_keys.json'), 
    JSON.stringify(sanitizedNameKeys, null, 2)
  );
  
  fs.writeFileSync(
    path.join(outputDir, 'name_mapping.json'), 
    JSON.stringify(nameMapping, null, 2)
  );
  
  // Log any potential issues with specific Pokémon names
  const problemNames = [
    { original: "Flabébé", sanitized: sanitizedNameKeys.find(n => n.includes("flabebe")) || "not found" },
    { original: "Sirfetch'd", sanitized: sanitizedNameKeys.find(n => n.includes("sirfetch")) || "not found" },
    { original: "Farfetch'd", sanitized: sanitizedNameKeys.find(n => n.includes("farfetch")) || "not found" }
  ];
  
  console.log("Special name handling results:");
  problemNames.forEach(item => console.log(`  ${item.original} → ${item.sanitized}`));
  
  console.log(`Successfully extracted ${nameKeys.length} Pokémon names`);
  console.log(`Original names saved to name_keys.json`);
  console.log(`Sanitized names saved to sanitized_name_keys.json`);
  console.log(`Name mapping saved to name_mapping.json`);
} catch (error) {
  console.error('Error processing species data:', error.message);
}