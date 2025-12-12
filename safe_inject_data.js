const fs = require('fs');

// Read new data
const rawData = fs.readFileSync('/Users/dmitro/Desktop/Работа/SquaddApp/market-map/Grail_Employee_Competitors_v4.json', 'utf8');
const newData = JSON.parse(rawData.replace(/:\s*NaN/g, ': null'));

console.log(`Loaded ${newData.length} companies from v4 JSON`);

// Function to safely update companiesData in a file
function updateCompaniesData(filePath) {
    console.log(`\nProcessing ${filePath}...`);

    let content = fs.readFileSync(filePath, 'utf8');

    // Find the start of companiesData declaration
    const startPattern = 'const companiesData = [';
    const startIndex = content.indexOf(startPattern);

    if (startIndex === -1) {
        console.error(`ERROR: Could not find "const companiesData = [" in ${filePath}`);
        return false;
    }

    // Find the matching closing bracket
    let bracketCount = 0;
    let inArray = false;
    let endIndex = -1;

    for (let i = startIndex; i < content.length; i++) {
        const char = content[i];

        if (char === '[') {
            bracketCount++;
            inArray = true;
        } else if (char === ']') {
            bracketCount--;
            if (inArray && bracketCount === 0) {
                endIndex = i;
                break;
            }
        }
    }

    if (endIndex === -1) {
        console.error(`ERROR: Could not find closing bracket for companiesData in ${filePath}`);
        return false;
    }

    // Find the semicolon after the closing bracket
    let semicolonIndex = endIndex + 1;
    while (semicolonIndex < content.length && content[semicolonIndex] !== ';') {
        semicolonIndex++;
    }

    if (semicolonIndex >= content.length) {
        console.error(`ERROR: Could not find semicolon after companiesData in ${filePath}`);
        return false;
    }

    // Build the new content
    const beforeData = content.substring(0, startIndex);
    const afterData = content.substring(semicolonIndex + 1);

    // Format the new data nicely
    const formattedData = JSON.stringify(newData, null, 2);

    const newContent = beforeData + 'const companiesData = ' + formattedData + ';' + afterData;

    // Write the file
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✓ Successfully updated ${filePath}`);
    console.log(`  - Replaced ${endIndex - startIndex} characters with ${formattedData.length + 24} characters`);

    return true;
}

// Update both files
const files = [
    '/Users/dmitro/Desktop/Работа/SquaddApp/market-map/index.html',
    '/Users/dmitro/Desktop/Работа/SquaddApp/market-map/influencer-market-map.jsx'
];

let success = true;
for (const file of files) {
    if (!updateCompaniesData(file)) {
        success = false;
    }
}

if (success) {
    console.log('\n✓ All files updated successfully!');
} else {
    console.log('\n✗ Some files failed to update');
    process.exit(1);
}
