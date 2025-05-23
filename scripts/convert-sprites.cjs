const fs = require('fs').promises;
const path = require('path');

/**
 * Converts PNG files in a directory to a single JSON file with base64 encoded contents
 * @param {string} spritesDir - The directory containing PNG sprites
 * @param {string} outputPath - Path for the output JSON file
 */
async function convertSpritesToJson(spritesDir, outputPath) {
  try {
    // Check if directory exists
    await fs.access(spritesDir);
    
    console.log(`Processing sprites from: ${spritesDir}`);
    
    // Get all files in the directory
    const files = await fs.readdir(spritesDir);
    const pngFiles = files.filter(file => file.toLowerCase().endsWith('.png'));
    
    console.log(`Found ${pngFiles.length} PNG files`);
    
    const spriteData = {};
    
    // Process each PNG file
    for (const file of pngFiles) {
      const filePath = path.join(spritesDir, file);
      const fileData = await fs.readFile(filePath);
      
      // Convert to base64
      const base64Data = fileData.toString('base64');
      
      // Use filename without extension as the key
      const key = path.basename(file, '.png');
      spriteData[key] = `data:image/png;base64,${base64Data}`;
      
      process.stdout.write(`Converting: ${file}                    \r`);
    }
    
    // Write the JSON file
    await fs.writeFile(
      outputPath, 
      JSON.stringify(spriteData, null, 2)
    );
    
    console.log(`\nSuccessfully created ${outputPath} with ${Object.keys(spriteData).length} sprites`);
    
  } catch (error) {
    console.error('Error processing sprites:', error);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Usage: node convertSpritesToJson.js <sprites-directory> [output-path]');
  console.error('Example: node convertSpritesToJson.js ./public/sprites/front ./src/data/sprites.json');
  process.exit(1);
}

const spritesDir = args[0];
const outputPath = args[1] || './sprites.json';

// Run the conversion
convertSpritesToJson(spritesDir, outputPath);