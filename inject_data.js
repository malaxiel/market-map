const fs = require('fs');
const path = require('path');

const htmlPath = 'index.html';
const jsxPath = 'influencer-market-map.jsx';

const rawData = fs.readFileSync('/Users/dmitro/Desktop/Работа/SquaddApp/market-map/Grail_Employee_Competitors_v4.json', 'utf8');
const newData = JSON.parse(rawData.replace(/:\s*NaN/g, ': null'));

// Helper to replace data in file
function updateFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    const startMarker = 'const companiesData = [';
    const startIndex = content.indexOf(startMarker);

    if (startIndex === -1) {
        console.error(`Could not find start marker in ${filePath}`);
        return;
    }

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
        `const companiesData = ${JSON.stringify(newData, null, 2)}` +
        content.slice(endIndex + 1);

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
}

updateFile(htmlPath);
updateFile(jsxPath);
