const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The block to extract
const originalBlock = `  <div class="booking-panel" id="pricingPanelOriginal">
    <div class="booking-label">Total price</div>
    <div id="modalPrice" class="booking-price"></div>
    <div id="modalIncluded" style="font-size:.78rem;color:#7a8599;margin-bottom:16px"></div>`;

const newBlock = `  <!-- Shared Price Display -->
  <div class="booking-panel" id="pricingPanelShared" style="border-bottom: none; border-bottom-left-radius: 0; border-bottom-right-radius: 0; padding-bottom: 0; margin-bottom: 0;">
    <div class="booking-label" id="priceLabel">Price per person</div>
    <div id="modalPrice" class="booking-price"></div>
    <div id="modalIncluded" style="font-size:.78rem;color:#7a8599;margin-bottom:16px"></div>
  </div>
  <div class="booking-panel" id="pricingPanelOriginal" style="border-top: none; border-top-left-radius: 0; border-top-right-radius: 0; padding-top: 10px;">`;

html = html.replace(originalBlock, newBlock);

// Replace both updateLivePrice functions to include the label logic
// First occurrence (around line 718):
const updateLogic1 = `
    const totalEur = currentTrip.priceEur * guestCount; // This uses your manual input

    const priceLabel = document.getElementById('priceLabel');
    if (priceLabel) {
        priceLabel.innerText = guestCount === 1 ? 'Price per person' : 'Total price (' + guestCount + ' people)';
    }

    // 3. Update the sidebar text
    const priceDisplay = document.getElementById('modalPrice');
`;
html = html.replace(/const totalEur = currentTrip\.priceEur \* guestCount; \/\/ This uses your manual input\s*\n\s*\/\/ 3\. Update the sidebar text\s*\n\s*const priceDisplay = document\.getElementById\('modalPrice'\);/, updateLogic1);

// Second occurrence (around line 1068):
const updateLogic2 = `
    const totalEur = currentTrip.priceEur * guestCount;

    const priceLabel = document.getElementById('priceLabel');
    if (priceLabel) {
        priceLabel.innerText = guestCount === 1 ? 'Price per person' : 'Total price (' + guestCount + ' people)';
    }

    const priceText = \`\${totalPln} <span style="font-size:1rem">PLN</span> <span style="font-size:.9rem;font-weight:700;color:#4a5568;margin-left:8px">(~\${totalEur} EUR)</span>\`;
`;
html = html.replace(/const totalEur = currentTrip\.priceEur \* guestCount;\s*\n\s*const priceText = `\$\{totalPln\} <span style="font-size:1rem">PLN<\/span> <span style="font-size:\.9rem;font-weight:700;color:#4a5568;margin-left:8px">\(~\$\{totalEur\} EUR\)<\/span>`;/, updateLogic2);


fs.writeFileSync('index.html', html);
