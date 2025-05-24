const fs = require('fs');
const path = require('path');

/**
 * Transforms an array of objects into a keyed object using specified field as keys
 * @param {string} inputFilename - The input JSON file (relative to src/data)
 * @param {string} keyField - Field to use as the key in the resulting object
 */
function transformToKeyedObject(inputFilename, keyField) {
  try {
    // Define paths
    const inputPath = path.resolve(__dirname, '../src/data', inputFilename);
    const backupDir = path.resolve(__dirname, '../src/data/old');
    const backupPath = path.resolve(backupDir, `${inputFilename}.old`);
    const outputPath = path.resolve(__dirname, '../src/data', inputFilename);
    
    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      throw new Error(`Input file not found: ${inputPath}`);
    }
    
    // Read and parse the input JSON file
    const data = require(inputPath);
    
    // Ensure it's an array
    if (!Array.isArray(data)) {
      throw new Error(`Input file must contain a JSON array, got ${typeof data}`);
    }
    
    // Check if all objects have the required key field
    if (!data.every(item => keyField in item)) {
      throw new Error(`Some items don't have the specified key field: '${keyField}'`);
    }
    
    // Transform into a key-value object
    const transformedData = {};
    
    data.forEach(item => {
      const key = item[keyField];
      transformedData[key] = item;
    });
    
    // Create backup directory if it doesn't exist
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
      console.log(`Created backup directory: ${backupDir}`);
    }
    
    // Backup the original file
    fs.copyFileSync(inputPath, backupPath);
    console.log(`Backed up original file to: ${backupPath}`);
    
    // Write the transformed data
    fs.writeFileSync(
      outputPath,
      JSON.stringify(transformedData, null, 2)
    );
    
    console.log(`Transformation complete! Saved to: ${outputPath}`);
    console.log(`Original array had ${data.length} items, transformed object has ${Object.keys(transformedData).length} keys`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
}

// Check for command-line arguments
if (process.argv.length < 4) {
  console.error('Usage: node transform-to-keyed-object.cjs <filename> <keyField>');
  console.error('Example: node transform-to-keyed-object.cjs itemData.json itemId');
  process.exit(1);
}

// Get the filename and key field from command-line arguments
const filename = process.argv[2];
const keyField = process.argv[3];

// Run the transformation
transformToKeyedObject(filename, keyField);