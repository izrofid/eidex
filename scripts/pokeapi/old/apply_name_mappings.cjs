// filepath: /home/kildemal/webdev/eidex/scripts/apply_name_mappings.cjs
const fs = require('fs');
const path = require('path');

// Load the ignore config with correct .cjs extension
const ignoreConfig = require('../../external_data/pokemon_name_ignore_config.cjs');

/**
 * Applies name mappings and filtering rules to Pokémon names
 * @param {Array} sanitizedNames - Your sanitized name keys
 * @param {Array} pokeapiNames - Names from PokeAPI
 * @returns {Object} Results of the mapping process
 */
function applyNameMappings(sanitizedNames, pokeapiNames) {
  const results = {
    mappedNames: {},
    ignoredNames: [],
    unmappedNames: []
  };
  
  // Create a set of PokeAPI names for faster lookups
  const pokeapiSet = new Set(pokeapiNames);
  
  sanitizedNames.forEach(name => {
    // Check if name should be completely ignored
    if (ignoreConfig.CompletelyIgnore.includes(name)) {
      results.ignoredNames.push({ name, reason: 'CompletelyIgnore' });
      return;
    }
    
    // Check non-canonical mega evolutions
    if (ignoreConfig.IgnoreIfNonCanonicalMega.includes(name)) {
      results.ignoredNames.push({ name, reason: 'NonCanonicalMega' });
      return;
    }
    
    // Check non-canonical primal forms
    if (ignoreConfig.IgnoreIfNonCanonicalPrimal.includes(name)) {
      results.ignoredNames.push({ name, reason: 'NonCanonicalPrimal' });
      return;
    }
    
    // Check totem forms
    if (ignoreConfig.IgnoreIfTotemForm.includes(name)) {
      results.ignoredNames.push({ name, reason: 'TotemForm' });
      return;
    }
    
    // Check special entries
    if (ignoreConfig.IgnoreIfSpecialEntry.includes(name)) {
      results.ignoredNames.push({ name, reason: 'SpecialEntry' });
      return;
    }
    
    // Apply mappings in order
    let mappedName = name;
    
    // Try base form mapping (largest category)
    if (ignoreConfig.MapToBaseForm[name]) {
      mappedName = ignoreConfig.MapToBaseForm[name];
    }
    // Try gender form mapping
    else if (ignoreConfig.GenderFormMapping[name]) {
      mappedName = ignoreConfig.GenderFormMapping[name];
    }
    // Try regional form mapping
    else if (ignoreConfig.RegionalFormMapping[name]) {
      mappedName = ignoreConfig.RegionalFormMapping[name];
    }
    // Try mask form mapping
    else if (ignoreConfig.MaskFormMapping[name]) {
      mappedName = ignoreConfig.MaskFormMapping[name];
    }
    // Try Pikachu cap mapping
    else if (ignoreConfig.PikachuCapMapping[name]) {
      mappedName = ignoreConfig.PikachuCapMapping[name];
    }
    // Try plumage form mapping
    else if (ignoreConfig.PlumageFormMapping[name]) {
      mappedName = ignoreConfig.PlumageFormMapping[name];
    }
    // Try Necrozma form mapping
    else if (ignoreConfig.NecrozmaFormMapping[name]) {
      mappedName = ignoreConfig.NecrozmaFormMapping[name];
    }
    // Try Vivillon form mapping
    else if (ignoreConfig.VivillonFormMapping && ignoreConfig.VivillonFormMapping[name]) {
      mappedName = ignoreConfig.VivillonFormMapping[name];
    }
    // Try Minior form mapping
    else if (ignoreConfig.MiniorMapping && ignoreConfig.MiniorMapping[name]) {
      mappedName = ignoreConfig.MiniorMapping[name];
    }
    // Try Alcremie form mapping
    else if (ignoreConfig.AlcremieMapping && ignoreConfig.AlcremieMapping[name]) {
      mappedName = ignoreConfig.AlcremieMapping[name];
    }
    // Try Ogerpon Tera form mapping
    else if (ignoreConfig.OgerponTeraMapping && ignoreConfig.OgerponTeraMapping[name]) {
      mappedName = ignoreConfig.OgerponTeraMapping[name];
    }
    // Try Zygarde form mapping
    else if (ignoreConfig.ZygardeFormMapping && ignoreConfig.ZygardeFormMapping[name]) {
      mappedName = ignoreConfig.ZygardeFormMapping[name];
    }
    
    // Check if mapped name exists in PokeAPI
    if (pokeapiSet.has(mappedName)) {
      results.mappedNames[name] = mappedName;
    } else {
      results.unmappedNames.push(name);
    }
  });
  
  return results;
}

// When running as a script
if (require.main === module) {
  try {
    const sanitizedNames = require('../external_data/sanitized_name_keys.json');
    const pokeapiNames = require('../external_data/pokeapi_names.json');
    
    const results = applyNameMappings(sanitizedNames, pokeapiNames);
    
    // Generate statistics by mapping category
    const mappingStats = {
      nonCanonicalMega: ignoreConfig.IgnoreIfNonCanonicalMega.length,
      nonCanonicalPrimal: ignoreConfig.IgnoreIfNonCanonicalPrimal.length,
      totemForms: ignoreConfig.IgnoreIfTotemForm.length,
      specialEntries: ignoreConfig.IgnoreIfSpecialEntry.length,
      baseForms: Object.keys(ignoreConfig.MapToBaseForm).length,
      genderForms: Object.keys(ignoreConfig.GenderFormMapping).length,
      regionalForms: Object.keys(ignoreConfig.RegionalFormMapping).length,
      maskForms: Object.keys(ignoreConfig.MaskFormMapping).length,
      pikachuCaps: Object.keys(ignoreConfig.PikachuCapMapping).length,
      plumageVariants: Object.keys(ignoreConfig.PlumageFormMapping).length,
      necrozmaFusions: Object.keys(ignoreConfig.NecrozmaFormMapping).length,
      vivillonPatterns: ignoreConfig.VivillonFormMapping ? Object.keys(ignoreConfig.VivillonFormMapping).length : 0,
      miniorVariants: ignoreConfig.MiniorMapping ? Object.keys(ignoreConfig.MiniorMapping).length : 0,
      alcremieVariants: ignoreConfig.AlcremieMapping ? Object.keys(ignoreConfig.AlcremieMapping).length : 0,
      ogerponTeraForms: ignoreConfig.OgerponTeraMapping ? Object.keys(ignoreConfig.OgerponTeraMapping).length : 0,
      zygardeForms: ignoreConfig.ZygardeFormMapping ? Object.keys(ignoreConfig.ZygardeFormMapping).length : 0,
      completelyIgnored: ignoreConfig.CompletelyIgnore.length
    };
    
    fs.writeFileSync(
      path.join(__dirname, '../external_data/name_mapping_results.json'),
      JSON.stringify({
        mappingStats,
        mappedNames: results.mappedNames,
        ignoredNames: results.ignoredNames,
        unmappedNames: results.unmappedNames,
        summary: {
          totalNames: sanitizedNames.length,
          successfullyMapped: Object.keys(results.mappedNames).length,
          ignored: results.ignoredNames.length,
          unmapped: results.unmappedNames.length
        }
      }, null, 2)
    );
    
    console.log(`Applied name mappings with results:
- Successfully mapped: ${Object.keys(results.mappedNames).length} names
- Ignored: ${results.ignoredNames.length} names
- Still unmapped: ${results.unmappedNames.length} names
    
Results saved to external_data/name_mapping_results.json`);
    
  } catch (error) {
    console.error('Error applying name mappings:', error.message);
  }
}

module.exports = applyNameMappings;
