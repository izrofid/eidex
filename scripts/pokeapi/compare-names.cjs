const fs = require('fs');
const path = require('path');

// Get output directory from environment variable or use default
const outputDir = path.resolve(__dirname, '../../external_data');

// Make sure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Load ignore/mapping config
const ignoreConfig = require(path.resolve(__dirname, './pokemon_name_ignore_config.cjs'));

function applyIgnoreAndMapping(names) {
  // Remove ignored names
  let filtered = names.filter(name =>
    !ignoreConfig.IgnoreIfNonCanonicalMega.includes(name) &&
    !ignoreConfig.IgnoreIfNonCanonicalPrimal.includes(name) &&
    !ignoreConfig.IgnoreIfTotemForm.includes(name) &&
    !ignoreConfig.IgnoreIfSpecialEntry.includes(name) &&
    !(ignoreConfig.IgnoreIfTera && ignoreConfig.IgnoreIfTera.includes(name))
  );
  // Map names to base forms and other mappings
  filtered = filtered.map(name => {
    if (ignoreConfig.MapToBaseForm[name]) return ignoreConfig.MapToBaseForm[name];
    if (ignoreConfig.GenderFormMapping && ignoreConfig.GenderFormMapping[name]) return ignoreConfig.GenderFormMapping[name];
    if (ignoreConfig.RegionalFormMapping && ignoreConfig.RegionalFormMapping[name]) return ignoreConfig.RegionalFormMapping[name];
    if (ignoreConfig.MaskFormMapping && ignoreConfig.MaskFormMapping[name]) return ignoreConfig.MaskFormMapping[name];
    if (ignoreConfig.PikachuCapMapping && ignoreConfig.PikachuCapMapping[name]) return ignoreConfig.PikachuCapMapping[name];
    if (ignoreConfig.PlumageFormMapping && ignoreConfig.PlumageFormMapping[name]) return ignoreConfig.PlumageFormMapping[name];
    if (ignoreConfig.NecrozmaFormMapping && ignoreConfig.NecrozmaFormMapping[name]) return ignoreConfig.NecrozmaFormMapping[name];
    if (ignoreConfig.VivillonFormMapping && ignoreConfig.VivillonFormMapping[name]) return ignoreConfig.VivillonFormMapping[name];
    if (ignoreConfig.MiniorMapping && ignoreConfig.MiniorMapping[name]) return ignoreConfig.MiniorMapping[name];
    if (ignoreConfig.AlcremieMapping && ignoreConfig.AlcremieMapping[name]) return ignoreConfig.AlcremieMapping[name];
    if (ignoreConfig.OgerponTeraMapping && ignoreConfig.OgerponTeraMapping[name]) return ignoreConfig.OgerponTeraMapping[name];
    if (ignoreConfig.ZygardeFormMapping && ignoreConfig.ZygardeFormMapping[name]) return ignoreConfig.ZygardeFormMapping[name];
    return name;
  });
  return Array.from(new Set(filtered)); // Remove duplicates after mapping
}

try {
  // Load both name lists
  const pokeapiNames = require(path.resolve(__dirname, '../../external_data/pokeapi_names.json'));
  const sanitizedNames = require(path.resolve(__dirname, '../../external_data/sanitized_name_keys.json'));

  // Apply ignore and mapping rules
  const mappedSanitizedNames = applyIgnoreAndMapping(sanitizedNames);

  // Create sets for faster lookups
  const pokeapiSet = new Set(pokeapiNames);
  const sanitizedSet = new Set(mappedSanitizedNames);

  // Find names in sanitized list that don't exist in pokeapi
  const notInPokeApi = mappedSanitizedNames.filter(name => !pokeapiSet.has(name));
  
  // Find names in pokeapi that don't exist in sanitized list
  const notInSanitized = pokeapiNames.filter(name => !sanitizedSet.has(name));

  // Attempt to find likely matches for names not in pokeapi
  const potentialMatches = {};
  
  notInPokeApi.forEach(sanitizedName => {
    // Find potential matches in pokeapi names
    const possibleMatches = pokeapiNames.filter(pokeapiName => {
      // Check if names are similar (contains parts of each other)
      return pokeapiName.includes(sanitizedName) || sanitizedName.includes(pokeapiName);
    });
    
    if (possibleMatches.length > 0) {
      potentialMatches[sanitizedName] = possibleMatches;
    }
  });

  // Group results by prefix patterns to make them more readable
  const groupedMismatches = {};
  
  notInPokeApi.forEach(name => {
    // Extract prefix - everything before first hyphen or the whole name if no hyphen
    const prefix = name.includes('-') ? name.split('-')[0] : name;
    
    if (!groupedMismatches[prefix]) {
      groupedMismatches[prefix] = [];
    }
    groupedMismatches[prefix].push(name);
  });

  // Write results to files
  fs.writeFileSync(
    path.join(outputDir, 'name_comparison_results.json'),
    JSON.stringify({
      summary: {
        totalSanitizedNames: sanitizedNames.length,
        totalPokeapiNames: pokeapiNames.length,
        namesOnlyInSanitized: notInPokeApi.length,
        namesOnlyInPokeapi: notInSanitized.length
      },
      namesOnlyInSanitized: notInPokeApi,
      namesOnlyInPokeapi: notInSanitized,
      potentialMatches: potentialMatches,
      groupedMismatches: groupedMismatches
    }, null, 2)
  );
  
  // Generate a human-readable report
  const report = `# Pokémon Name Key Comparison Report

## Summary
- Total sanitized names: ${sanitizedNames.length}
- Total PokeAPI names: ${pokeapiNames.length}
- Names only in sanitized list: ${notInPokeApi.length}
- Names only in PokeAPI list: ${notInSanitized.length}

## Names needing manual adjustment

${Object.entries(groupedMismatches)
  .map(([prefix, names]) => `### ${prefix.charAt(0).toUpperCase() + prefix.slice(1)} group (${names.length} mismatches)
${names.map(name => `- \`${name}\``).join('\n')}

Potential matches in PokeAPI:
${names.map(name => {
  const matches = potentialMatches[name] || [];
  if (matches.length === 0) return `- \`${name}\`: No potential matches found`;
  return `- \`${name}\`: ${matches.map(m => `\`${m}\``).join(', ')}`;
}).join('\n')}
`).join('\n')}

## Notes for manual adjustments
- Check for hyphenation differences
- Check for variant naming patterns (e.g., "form" vs "mode")
- Check for regional form naming conventions
- Special characters may need attention
`;

  fs.writeFileSync(
    path.join(outputDir, 'name_comparison_report.md'),
    report
  );

  console.log('Comparison completed successfully.');
  console.log(`Summary report saved to ${path.resolve(outputDir, 'name_comparison_report.md')}`);
  console.log(`Detailed results saved to ${path.resolve(outputDir, 'name_comparison_results.json')}`);
  
} catch (error) {
  console.error('Error comparing name keys:', error.message);
}