const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration - properly reference the project root 
const projectRoot = path.join(__dirname, '../..');
const outputDir = path.join(projectRoot, 'external_data');

// Make sure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// We're already in the pokeapi directory
const scriptsDir = __dirname;

/**
 * Run the complete name analysis pipeline
 */
async function runNameAnalysisPipeline() {
  console.log('🔍 Starting Pokémon name mapping and analysis pipeline...\n');
  
  try {
    // Step 1: Fetch all Pokémon names from PokeAPI (this one seems to work fine)
    console.log('Step 1: Fetching all Pokémon names from PokeAPI...');
    execSync(`node ${path.join(scriptsDir, 'pokeapi-fetch-all.js')}`, { 
      stdio: 'inherit',
      env: { ...process.env, OUTPUT_DIR: outputDir }
    });
    
    // Check if you have speciesData.json available
    const speciesDataPath = path.join(projectRoot, 'src/data/speciesData.json');
    if (!fs.existsSync(speciesDataPath)) {
      console.error(`\nError: Species data file not found at ${speciesDataPath}`);
      console.log('Creating a sample species data file for demonstration...');
      
      // Create a simple sample if it doesn't exist - REMOVE THIS IN PRODUCTION
      const sampleData = {
        "bulbasaur": { "nameKey": "Bulbasaur" },
        "ivysaur": { "nameKey": "Ivysaur" },
        "venusaur": { "nameKey": "Venusaur" },
        "venusaur-mega": { "nameKey": "Venusaur-Mega" },
        "charmander": { "nameKey": "Charmander" },
        "flabébé": { "nameKey": "Flabébé" },
        "sirfetch'd": { "nameKey": "Sirfetch'd" }
      };
      
      // Ensure directory exists
      const speciesDir = path.dirname(speciesDataPath);
      if (!fs.existsSync(speciesDir)) {
        fs.mkdirSync(speciesDir, { recursive: true });
      }
      
      fs.writeFileSync(speciesDataPath, JSON.stringify(sampleData, null, 2));
      console.log(`Created sample species data at ${speciesDataPath}`);
    }
    
    // Step 2: Extract name keys from our data - pass the correct paths
    console.log('\nStep 2: Extracting and sanitizing name keys from our data...');
    execSync(`node ${path.join(scriptsDir, 'list-name-keys.cjs')}`, { 
      stdio: 'inherit',
      env: { 
        ...process.env, 
        SPECIES_DATA_PATH: speciesDataPath,
        OUTPUT_DIR: outputDir
      }
    });
    
    // Step 3: Generate the ignore config
    console.log('\nStep 3: Generating name mapping configurations...');
    execSync(`node ${path.join(scriptsDir, 'ignore-pokemon.cjs')}`, { 
      stdio: 'inherit',
      env: { ...process.env, OUTPUT_DIR: outputDir }
    });
    
    // Step 4: Apply the mapping and analyze results
    console.log('\nStep 4: Applying name mappings and generating initial results...');
    execSync(`node ${path.join(scriptsDir, 'apply_name_mappings.cjs')}`, { 
      stdio: 'inherit',
      env: { ...process.env, OUTPUT_DIR: outputDir }
    });
    
    // Step 5: Compare names for detailed analysis
    console.log('\nStep 5: Comparing names for detailed analysis...');
    execSync(`node ${path.join(scriptsDir, 'compare-names.cjs')}`, { 
      stdio: 'inherit',
      env: { ...process.env, OUTPUT_DIR: outputDir }
    });
    
    // Step 6: Generate comprehensive report
    console.log('\nStep 6: Generating comprehensive mapping report...');
    generateComprehensiveReport();
    
    console.log('\n✅ Name analysis pipeline completed successfully!');
    console.log(`📊 Find all results in the ${outputDir} directory`);
    console.log('   - mapping_report.md: Human-readable report of all mappings');
    console.log('   - name_mapping_results.json: Detailed mapping data');
    console.log('   - name_comparison_report.md: Detailed comparison results');
  } catch (error) {
    console.error('\n❌ Error in name analysis pipeline:', error.message);
    process.exit(1);
  }
}

/**
 * Generate the unmapped section of the report
 */
function generateUnmappedSection(unmappedIssues) {
  const sections = [];
  
  // Add each category if it has items
  if (unmappedIssues.formVariants.length > 0) {
    sections.push(`### Form Variants (${unmappedIssues.formVariants.length})
${unmappedIssues.formVariants.slice(0, 10).map(name => `- \`${name}\``).join('\n')}
${unmappedIssues.formVariants.length > 10 ? `\n...and ${unmappedIssues.formVariants.length - 10} more` : ''}`);
  }
  
  if (unmappedIssues.regionalForms.length > 0) {
    sections.push(`### Regional Forms (${unmappedIssues.regionalForms.length})
${unmappedIssues.regionalForms.slice(0, 10).map(name => `- \`${name}\``).join('\n')}
${unmappedIssues.regionalForms.length > 10 ? `\n...and ${unmappedIssues.regionalForms.length - 10} more` : ''}`);
  }
  
  if (unmappedIssues.genderForms.length > 0) {
    sections.push(`### Gender Forms (${unmappedIssues.genderForms.length})
${unmappedIssues.genderForms.slice(0, 10).map(name => `- \`${name}\``).join('\n')}
${unmappedIssues.genderForms.length > 10 ? `\n...and ${unmappedIssues.genderForms.length - 10} more` : ''}`);
  }
  
  if (unmappedIssues.hyphenationIssues.length > 0) {
    sections.push(`### Hyphenation Issues (${unmappedIssues.hyphenationIssues.length})
${unmappedIssues.hyphenationIssues.slice(0, 10).map(name => `- \`${name}\``).join('\n')}
${unmappedIssues.hyphenationIssues.length > 10 ? `\n...and ${unmappedIssues.hyphenationIssues.length - 10} more` : ''}`);
  }
  
  if (unmappedIssues.specialCharacters.length > 0) {
    sections.push(`### Special Character Issues (${unmappedIssues.specialCharacters.length})
${unmappedIssues.specialCharacters.slice(0, 10).map(name => `- \`${name}\``).join('\n')}
${unmappedIssues.specialCharacters.length > 10 ? `\n...and ${unmappedIssues.specialCharacters.length - 10} more` : ''}`);
  }
  
  if (unmappedIssues.unknownPatterns.length > 0) {
    sections.push(`### Other Issues (${unmappedIssues.unknownPatterns.length})
${unmappedIssues.unknownPatterns.slice(0, 10).map(name => `- \`${name}\``).join('\n')}
${unmappedIssues.unknownPatterns.length > 10 ? `\n...and ${unmappedIssues.unknownPatterns.length - 10} more` : ''}`);
  }
  
  return sections.length > 0 ? sections.join('\n\n') : '_No unmapped names found_';
}

/**
 * Categorize unmapped names by likely issue type
 */
function categorizeUnmappedNames(unmappedNames) {
  const categories = {
    formVariants: [],
    regionalForms: [],
    genderForms: [],
    specialCharacters: [],
    hyphenationIssues: [],
    unknownPatterns: []
  };
  
  unmappedNames.forEach(name => {
    if (name.includes('-') && name.split('-').length > 2) {
      // Complex form with multiple hyphens
      if (name.includes('-alola') || name.includes('-galar') || name.includes('-hisui') || 
          name.includes('-paldea')) {
        categories.regionalForms.push(name);
      } 
      else if (name.includes('-male') || name.includes('-female') || 
               name.includes('-m') || name.includes('-f')) {
        categories.genderForms.push(name);
      }
      else {
        categories.formVariants.push(name);
      }
    }
    else if (name.includes('--')) {
      // Hyphenation issues
      categories.hyphenationIssues.push(name);
    }
    else if (/[^\w\d-]/.test(name)) {
      // Special characters
      categories.specialCharacters.push(name);
    }
    else {
      // Unknown patterns
      categories.unknownPatterns.push(name);
    }
  });
  
  return categories;
}

/**
 * Generate examples of mappings for the report
 */
function generateMappingExamples(mappedNames, categoryMap, limit) {
  const examples = [];
  const categoryEntries = Object.entries(categoryMap || {});
  
  if (categoryEntries.length === 0) {
    return '_No mappings in this category_';
  }
  
  // Get examples of successfully mapped names in this category
  let count = 0;
  for (const [from, to] of categoryEntries) {
    if (mappedNames[from] === to) {
      examples.push(`- \`${from}\` → \`${to}\``);
      count++;
      
      if (count >= limit) break;
    }
  }
  
  if (examples.length === 0) {
    return '_No examples found in successfully mapped names_';
  }
  
  return examples.join('\n');
}

/**
 * Generate recommendations for fixing unmapped names
 */
function generateFixRecommendations(unmappedIssues) {
  const recommendations = [];
  
  // Regional forms
  if (unmappedIssues.regionalForms.length > 0) {
    recommendations.push(`#### Regional Forms (${unmappedIssues.regionalForms.length})
- Add mappings for regional variants like: ${unmappedIssues.regionalForms.slice(0, 3).map(n => `\`${n}\``).join(', ')}${unmappedIssues.regionalForms.length > 3 ? ', ...' : ''}
- Check for naming pattern differences (e.g., "-alola" vs "-alolan")`);
  }
  
  // Form variants
  if (unmappedIssues.formVariants.length > 0) {
    recommendations.push(`#### Form Variants (${unmappedIssues.formVariants.length})
- Add mappings for form variants like: ${unmappedIssues.formVariants.slice(0, 3).map(n => `\`${n}\``).join(', ')}${unmappedIssues.formVariants.length > 3 ? ', ...' : ''}
- Consider grouping similar form types together in the configuration`);
  }
  
  // Gender forms
  if (unmappedIssues.genderForms.length > 0) {
    recommendations.push(`#### Gender Forms (${unmappedIssues.genderForms.length})
- Add mappings for gender-specific forms: ${unmappedIssues.genderForms.slice(0, 3).map(n => `\`${n}\``).join(', ')}${unmappedIssues.genderForms.length > 3 ? ', ...' : ''}
- Check for abbreviation inconsistencies (e.g., "-f" vs "-female")`);
  }
  
  // Hyphenation issues
  if (unmappedIssues.hyphenationIssues.length > 0) {
    recommendations.push(`#### Hyphenation Issues (${unmappedIssues.hyphenationIssues.length})
- Fix double hyphens or incorrect hyphenation: ${unmappedIssues.hyphenationIssues.slice(0, 3).map(n => `\`${n}\``).join(', ')}${unmappedIssues.hyphenationIssues.length > 3 ? ', ...' : ''}
- Consider updating the sanitization process in list-name-keys.cjs`);
  }
  
  // Special characters
  if (unmappedIssues.specialCharacters.length > 0) {
    recommendations.push(`#### Special Character Issues (${unmappedIssues.specialCharacters.length})
- Add special handling for names with unusual characters: ${unmappedIssues.specialCharacters.slice(0, 3).map(n => `\`${n}\``).join(', ')}${unmappedIssues.specialCharacters.length > 3 ? ', ...' : ''}
- Update the sanitization logic for these edge cases`);
  }
  
  // Unknown patterns
  if (unmappedIssues.unknownPatterns.length > 0) {
    recommendations.push(`#### Other Issues (${unmappedIssues.unknownPatterns.length})
- Investigate these names with unknown patterns: ${unmappedIssues.unknownPatterns.slice(0, 3).map(n => `\`${n}\``).join(', ')}${unmappedIssues.unknownPatterns.length > 3 ? ', ...' : ''}
- May require manual mapping or checking for typos`);
  }
  
  return recommendations.join('\n\n');
}

/**
 * Generate a comprehensive report combining all the data
 */
function generateComprehensiveReport() {
  try {
    // Load all the necessary data
    const mappingResults = require(path.join(outputDir, 'name_mapping_results.json'));
    const comparisonResults = fs.existsSync(path.join(outputDir, 'name_comparison_results.json')) ? 
      require(path.join(outputDir, 'name_comparison_results.json')) : {};
    const nameMapping = require(path.join(outputDir, 'name_mapping.json'));
    const ignoreConfig = require(path.join(outputDir, 'pokemon_name_ignore_config.cjs'));
    
    // Group the unmapped names by potential issue type
    const unmappedIssues = categorizeUnmappedNames(mappingResults.unmappedNames || []);
    
    // Build the report
    const report = `# Pokémon Name Mapping Report

## 📊 Summary

Total Pokémon names processed: **${mappingResults.summary?.totalNames || 0}**

| Category | Count | Percentage |
|----------|-------|------------|
| ✅ Successfully mapped | ${mappingResults.summary?.successfullyMapped || 0} | ${((mappingResults.summary?.successfullyMapped || 0) / (mappingResults.summary?.totalNames || 1) * 100).toFixed(1)}% |
| ⚠️ Ignored | ${mappingResults.summary?.ignored || 0} | ${((mappingResults.summary?.ignored || 0) / (mappingResults.summary?.totalNames || 1) * 100).toFixed(1)}% |
| ❌ Still unmapped | ${mappingResults.summary?.unmapped || 0} | ${((mappingResults.summary?.unmapped || 0) / (mappingResults.summary?.totalNames || 1) * 100).toFixed(1)}% |

## 🔄 Mapping Categories

| Category | Count |
|----------|-------|
| Base Forms | ${mappingResults.mappingStats?.baseForms || 0} |
| Non-canonical Mega Evolutions | ${mappingResults.mappingStats?.nonCanonicalMega || 0} |
| Non-canonical Primal Forms | ${mappingResults.mappingStats?.nonCanonicalPrimal || 0} |
| Totem Forms | ${mappingResults.mappingStats?.totemForms || 0} |
| Special Entries | ${mappingResults.mappingStats?.specialEntries || 0} |
| Gender-specific Forms | ${mappingResults.mappingStats?.genderForms || 0} |
| Regional Forms | ${mappingResults.mappingStats?.regionalForms || 0} |
| Mask Forms | ${mappingResults.mappingStats?.maskForms || 0} |
| Pikachu Cap Variants | ${mappingResults.mappingStats?.pikachuCaps || 0} |
| Plumage Variants | ${mappingResults.mappingStats?.plumageVariants || 0} |
| Necrozma Fusions | ${mappingResults.mappingStats?.necrozmaFusions || 0} |
| Vivillon Patterns | ${mappingResults.mappingStats?.vivillonPatterns || 0} |
| Minior Variants | ${mappingResults.mappingStats?.miniorVariants || 0} |
| Alcremie Variants | ${mappingResults.mappingStats?.alcremieVariants || 0} |
| Ogerpon Tera Forms | ${mappingResults.mappingStats?.ogerponTeraForms || 0} |
| Zygarde Forms | ${mappingResults.mappingStats?.zygardeForms || 0} |
| Completely Ignored | ${mappingResults.mappingStats?.completelyIgnored || 0} |

## ❌ Unmapped Names (${mappingResults.unmappedNames?.length || 0})

${generateUnmappedSection(unmappedIssues)}

## 🖇️ Name Mapping Examples

### Base Form Mappings
${generateMappingExamples(mappingResults.mappedNames || {}, ignoreConfig?.MapToBaseForm, 10)}

### Gender Form Mappings
${generateMappingExamples(mappingResults.mappedNames || {}, ignoreConfig?.GenderFormMapping, 5)}

### Regional Form Mappings
${generateMappingExamples(mappingResults.mappedNames || {}, ignoreConfig?.RegionalFormMapping, 5)}

## 🔧 Recommended Fixes

Based on the analysis, here are the recommended fixes:

### Common Patterns to Fix

1. **Hyphenation Issues**: Names with inconsistent hyphens between our data and PokeAPI
   - Example: \`name-with-hyphen\` vs \`namewithhyphen\`

2. **Form Naming Conventions**: Differences in how forms are named
   - Example: \`pokemon-form\` vs \`pokemon-form-type\`

3. **Special Characters**: Names with special characters that need standardized handling
   - Example: Flabébé, Sirfetch'd

### Top Priority Fixes (Non-Matched Names)

${generateFixRecommendations(unmappedIssues)}

## 📝 Next Steps

1. Update the mapping configuration in \`pokemon_name_ignore_config.cjs\` with new mappings for the unmapped names
2. Re-run this analysis to verify fixes
3. Consider updating the name sanitization logic in \`list-name-keys.cjs\` for systematic issues

---
Generated on ${new Date().toLocaleString()}
`;

    // Save the report
    fs.writeFileSync(path.join(outputDir, 'mapping_report.md'), report);
    
    console.log(`Generated comprehensive mapping report at: ${path.join(outputDir, 'mapping_report.md')}`);
  } catch (error) {
    console.error('Error generating comprehensive report:', error.message);
  }
}

// Run the pipeline
runNameAnalysisPipeline();