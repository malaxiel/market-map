const fs = require('fs');

const jsonPath = 'updated_companies.json';
const htmlPath = 'index.html';
const jsxPath = 'influencer-market-map.jsx';

const newData = fs.readFileSync(jsonPath, 'utf8');

// Helper to replace data in file
function updateFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Regex to match the companiesData const. 
    // It assumes: const companiesData = [ ... ];
    // We'll replace from `const companiesData = [` to the matching `];`

    // Simple regex might fail if there are nested brackets, but standard JSON dump usually doesn't have tricky JS syntax issues.
    // However, the existing file has comments or formatting.
    // Let's match `const companiesData = [` until `\n];` or similar.

    // A safer way: Find `const companiesData =` and find the FIRST `[` after it.
    // Then find the matching closing `]` for that array.
    // Just using a regex for the start and knowing the structure is `const companiesData = [...];`

    const startMarker = 'const companiesData = [';
    const startIndex = content.indexOf(startMarker);

    if (startIndex === -1) {
        console.error(`Could not find start marker in ${filePath}`);
        return;
    }

    // Find the end of the array. It's a valid JSON array so we can search for the closing `];` 
    // OR we can just visually Inspect that it ends with `];` in the file.
    // Let's assume standard formatting: starts at `const companiesData = [` and ends with `];` 
    // But there might be code AFTER it.

    // Let's use a bracket counter to be safe.
    let openBrackets = 0;
    let endIndex = -1;
    let foundStart = false;

    for (let i = startIndex; i < content.length; i++) {
        if (content[i] === '[') {
            openBrackets++;
            foundStart = true;
        } else if (content[i] === ']') {
            openBrackets--;
            if (foundStart && openBrackets === 0) {
                endIndex = i;
                break;
            }
        }
    }

    if (endIndex === -1) {
        console.error(`Could not find end of array in ${filePath}`);
        return;
    }

    const newContent = content.slice(0, startIndex) +
        `const companiesData = ${newData}` +
        content.slice(endIndex + 1);

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
}

updateFile(htmlPath);
updateFile(jsxPath);
