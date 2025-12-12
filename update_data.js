const fs = require('fs');
const path = require('path');

const csvPath = '/Users/dmitro/Desktop/Работа/SquaddApp/market-map/Grail Employee - Competitors v3.csv';

// Robust CSV Parser
function parseCSV(text) {
    const rows = [];
    let currentRow = [];
    let currentCell = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                // Escaped quote "" -> "
                currentCell += '"';
                i++; // Skip next quote
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            // End of cell
            currentRow.push(currentCell.trim());
            currentCell = '';
        } else if ((char === '\r' || char === '\n') && !inQuotes) {
            // End of row
            if (char === '\r' && nextChar === '\n') i++; // Handle CRLF

            if (currentRow.length > 0 || currentCell) {
                currentRow.push(currentCell.trim());
                rows.push(currentRow);
            }
            currentRow = [];
            currentCell = '';
        } else {
            currentCell += char;
        }
    }

    // Last row
    if (currentRow.length > 0 || currentCell) {
        currentRow.push(currentCell.trim());
        rows.push(currentRow);
    }

    return rows;
}

const csvContent = fs.readFileSync(csvPath, 'utf8');
const rows = parseCSV(csvContent);

console.log(`Parsed ${rows.length} rows from CSV.`);

// Row 0 is header
const header = rows[0];
const dataRows = rows.slice(1);

const newData = [];

// Helper to clean val (already trimmed/unquoted by parser really, but just in case)
const clean = (val) => val ? val.trim() : '';

dataRows.forEach(cols => {
    // Basic validation: Name must exist
    if (!cols[0]) return;

    const company = {};
    // 0: name, 1: website, 2: type, 3: business_model, 4: pricing, 5: offer_usp, 6: sales_points, 
    // 7: positioning, 8: client_profile, 9: geographical_focus, 10: social_media_links, 
    // 11: content_strategy, 12: social_results, 13: marketing_strategy, 
    // 14: technology_offering, 15: technology_functions, 16: integrations, 17: other_info, 
    // 18: Monthly traffic

    company.name = clean(cols[0]);
    company.website = clean(cols[1]);
    company.type = clean(cols[2]);
    company.business_model = clean(cols[3]);
    company.pricing = clean(cols[4]);
    company.offer_usp = clean(cols[5]);
    company.sales_points = clean(cols[6]);
    company.positioning = clean(cols[7]);
    company.client_profile = clean(cols[8]);
    company.geographical_focus = clean(cols[9]);
    company.social_media_links = clean(cols[10]);

    // Skip 11, 12, 13

    company.technology_offering = clean(cols[14]);
    company.technology_functions = clean(cols[15]);
    company.integrations = clean(cols[16]);
    company.other_info = clean(cols[17]);

    // Traffic
    const trafficStr = clean(cols[18]);
    // Remove "monthly visits" text if any, remove commas
    // Try to find first number sequence
    let traffic = 0;
    if (trafficStr) {
        traffic = parseInt(trafficStr.replace(/[^0-9]/g, ''), 10) || 0;
    }
    company.monthly_traffic = traffic;

    newData.push(company);
});

console.log(`Processed ${newData.length} valid companies.`);
fs.writeFileSync('updated_companies.json', JSON.stringify(newData, null, 2));
