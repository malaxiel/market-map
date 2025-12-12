const fs = require('fs');

const filePath = 'Grail_Employee_Competitors_v4.json';
const rawData = fs.readFileSync(filePath, 'utf8');
// Fix potential parser issues with NaN just in case, though we are writing back
const data = JSON.parse(rawData.replace(/:\s*NaN/g, ': null'));

const initialLength = data.length;
const filteredData = data.filter(c => c.name !== 'MOMENTiQ');
const finalLength = filteredData.length;

if (initialLength === finalLength) {
    console.log('Warning: MOMENTiQ not found in the file.');
} else {
    console.log(`Removed MOMENTiQ. count: ${initialLength} -> ${finalLength}`);
    fs.writeFileSync(filePath, JSON.stringify(filteredData, null, 2), 'utf8');
}
