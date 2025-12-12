const fs = require('fs');

const v4 = JSON.parse(fs.readFileSync('Grail_Employee_Competitors_v4.json', 'utf8').replace(/:\s*NaN/g, ': null'));
const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/const companiesData = (\[[\s\S]*?\]);/);
const htmlData = JSON.parse(match[1]);

const v4Names = new Set(v4.map(c => c.name));
const htmlNames = new Set(htmlData.map(c => c.name));

console.log('=== DATA COMPARISON ===\n');
console.log(`V4 JSON: ${v4.length} companies`);
console.log(`HTML: ${htmlData.length} companies\n`);

const inHtmlNotV4 = htmlData.filter(c => !v4Names.has(c.name));
const inV4NotHtml = v4.filter(c => !htmlNames.has(c.name));

if (inHtmlNotV4.length > 0) {
    console.log(`Companies in HTML but NOT in V4 JSON (${inHtmlNotV4.length}):`);
    inHtmlNotV4.forEach(c => {
        console.log(`  - ${c.name}`);
    });
} else {
    console.log('✓ All HTML companies are in V4 JSON');
}

console.log('');

if (inV4NotHtml.length > 0) {
    console.log(`Companies in V4 JSON but NOT in HTML (${inV4NotHtml.length}):`);
    inV4NotHtml.forEach(c => {
        console.log(`  - ${c.name}`);
    });
} else {
    console.log('✓ All V4 companies are in HTML');
}
