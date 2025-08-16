#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');

// Configuration
const SOURCE_DIR = './src/assets/images';
const OUTPUT_DIR = './src/assets/images/webp';
const QUALITY = 80;

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Find all SVG files
const svgFiles = glob.sync('**/*.svg', { cwd: SOURCE_DIR });

console.log(`Found ${svgFiles.length} SVG files to convert:`);
svgFiles.forEach(file => console.log(`- ${file}`));

// Convert each SVG to WebP
async function convertSVGs() {
    let successCount = 0;
    let errorCount = 0;

    for (const svgFile of svgFiles) {
        const inputPath = path.join(SOURCE_DIR, svgFile);
        const outputFileName = path.basename(svgFile, '.svg') + '.webp';
        const outputPath = path.join(OUTPUT_DIR, outputFileName);

        try {
            console.log(`Converting ${svgFile}...`);
            
            await sharp(inputPath)
                .webp({ quality: QUALITY })
                .toFile(outputPath);

            console.log(`✓ Converted: ${svgFile} -> ${path.relative(process.cwd(), outputPath)}`);
            successCount++;
        } catch (error) {
            console.error(`✗ Error converting ${svgFile}:`, error.message);
            errorCount++;
        }
    }

    console.log('\nConversion Summary:');
    console.log(`✓ Successfully converted: ${successCount} files`);
    console.log(`✗ Failed: ${errorCount} files`);
}

// Check if required dependencies are installed
function checkDependencies() {
    try {
        require.resolve('sharp');
        require.resolve('glob');
        return true;
    } catch (error) {
        console.error('Missing dependencies. Please install:');
        console.error('npm install sharp glob');
        return false;
    }
}

// Main execution
if (require.main === module) {
    if (!checkDependencies()) {
        process.exit(1);
    }

    convertSVGs()
        .then(() => {
            console.log('\nAll SVG files have been processed!');
        })
        .catch(error => {
            console.error('Conversion failed:', error);
            process.exit(1);
        });
}

module.exports = { convertSVGs };
