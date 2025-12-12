const fs = require('fs');

const filePath = 'Grail_Employee_Competitors_v4.json';
const rawData = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(rawData.replace(/:\s*NaN/g, ': null'));

const grailIndex = data.findIndex(c => c.name === 'GRAIL Talent');

if (grailIndex !== -1) {
    const grail = data[grailIndex];

    // update Type to reflect 97% reality
    grail.type = "Talent Management";
    grail['Unified Type'] = "Talent Management";

    // Update pricing with specific commission info
    grail.pricing = "20% commission on influencer integrations. +5% fee for 48-hour early payout (standard payout is ~30 days). Avg deal size ~$4,500.";

    // Update Business Model with revenue info
    grail.business_model = "97% Talent Management (Commission-based). Monthly GMV ~$1M, Revenue ~$200-250k. GrailX platform is a negligible part of business.";

    // Update Technology to reflect reality
    grail.technology_offering = "Claims GrailX platform, but technology is minimal and reportedly ineffective.";
    grail.technology_functions = "Basic platform functionality, widely considered non-functional for core business operations.";

    // Add specific stats to sales/other info
    grail.other_info = "Deal Value Distribution: >$20k (0.75%), >$10k (4.21%), >$5k (22.83%). Client base is primarily small businesses.";

    console.log('Updated GRAIL Talent data.');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
} else {
    console.log('Error: GRAIL Talent not found.');
}
