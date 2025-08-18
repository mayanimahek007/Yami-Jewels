#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const SRC_DIR = './src';
const WEBP_DIR = './src/assets/images/webp';

// Find all JavaScript/JSX files
const jsFiles = glob.sync('**/*.{js,jsx}', { cwd: SRC_DIR });

console.log(`Found ${jsFiles.length} JavaScript/JSX files to check for SVG references`);

// Common SVG files that were converted
const svgToWebpMap = {
    'aboutUs.svg': 'aboutUs.webp',
    'aboutUs1.svg': 'aboutUs1.webp',
    'banner.svg': 'banner.webp',
    'banner1.svg': 'banner1.webp',
    'blogDetails.svg': 'blogDetails.webp',
    'blogs.svg': 'blogs.webp',
    'contact.svg': 'contact.webp',
    'contact (1).svg': 'contact (1).webp',
    'Custom.svg': 'Custom.webp',
    'custome.svg': 'custome.webp',
    'diamond.svg': 'diamond.webp',
    'diamond (2).svg': 'diamond (2).webp',
    'diamond (3).svg': 'diamond (3).webp',
    'Fast-Delivery.svg': 'Fast-Delivery.webp',
    'headerlogo.svg': 'headerlogo.svg',
    'image.svg': 'image.webp',
    'img.svg': 'img.webp',
    'img1.svg': 'img1.webp',
    'img2.svg': 'img2.webp',
    'mahek (2).svg': 'mahek (2).webp',
    'Product.svg': 'Product.webp',
    'Product1.svg': 'Product1.webp',
    'Product2.svg': 'Product2.webp',
    'Product3.svg': 'Product3.webp',
    'Product5.svg': 'Product5.webp',
    'Product6.svg': 'Product6.webp',
    'Quality-Product.svg': 'Quality-Product.webp',
    'return.svg': 'return.webp',
    'subsri.svg': 'subsri.webp',
    'shape-baguette.svg': 'shape-baguette.webp',
    'shape-calf.svg': 'shape-calf.webp',
    'shape-cushion.svg': 'shape-cushion.webp',
    'shape-emerald.svg': 'shape-emerald.webp',
    'shape-emerald square.svg': 'shape-emerald square.webp',
    'shape-heart.svg': 'shape-heart.webp',
    'shape-marquise.svg': 'shape-marquise.webp',
    'shape-marquise (1).svg': 'shape-marquise (1).webp',
    'shape-octagon.svg': 'shape-octagon.webp',
    'shape-oval.svg': 'shape-oval.webp',
    'shape-pear.svg': 'shape-pear.webp',
    'shape-princess.svg': 'shape-princess.webp',
    'shape-radiant.svg': 'shape-radiant.webp',
    'shape-radiant square.svg': 'shape-radiant square.webp',
    'shape-round.svg': 'shape-round.webp',
    'shape-triangle.svg': 'shape-triangle.webp',
    'shape-trillion curved.svg': 'shape-trillion curved.webp'
};

// Function to update file references
function updateReferences() {
    let updatedFiles = 0;
    let totalChanges = 0;

    jsFiles.forEach(file => {
        const filePath = path.join(SRC_DIR, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let hasChanges = false;
        let changesInFile = 0;

        // Replace SVG references with WebP
        Object.entries(svgToWebpMap).forEach(([svgFile, webpFile]) => {
            const svgPattern = new RegExp(svgFile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            if (svgPattern.test(content)) {
                content = content.replace(svgPattern, `webp/${webpFile}`);
                hasChanges = true;
                changesInFile++;
                totalChanges++;
            }
        });

        if (hasChanges) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${file}: ${changesInFile} changes`);
            updatedFiles++;
        }
    });

    console.log(`\nSummary:`);
    console.log(`Files updated: ${updatedFiles}`);
    console.log(`Total changes: ${totalChanges}`);
}

// Main execution
if (require.main === module) {
    updateReferences();
}

module.exports = { updateReferences };
