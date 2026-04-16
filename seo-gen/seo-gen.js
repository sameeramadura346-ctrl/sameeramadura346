const sourceInput = document.getElementById('source-text');
const titleInput = document.getElementById('meta-title');
const descInput = document.getElementById('meta-desc');
const generateBtn = document.getElementById('generate-btn');

const titleCount = document.getElementById('title-count');
const descCount = document.getElementById('desc-count');
const previewTitle = document.getElementById('preview-title');
const previewDesc = document.getElementById('preview-desc');
const keywordContainer = document.getElementById('keyword-container');

// Real-time Update Logic
const updateCounters = () => {
    const tLen = titleInput.value.length;
    const dLen = descInput.value.length;

    titleCount.textContent = tLen;
    descCount.textContent = dLen;

    // Update Status Colors
    const titleStatus = document.getElementById('title-status');
    const descStatus = document.getElementById('desc-status');

    if (tLen >= 50 && tLen <= 60) titleStatus.className = 'good';
    else if (tLen > 60) titleStatus.className = 'warning';
    else titleStatus.className = '';

    if (dLen >= 150 && dLen <= 160) descStatus.className = 'good';
    else if (dLen > 160) descStatus.className = 'warning';
    else descStatus.className = '';

    // Update Google Preview
    previewTitle.textContent = titleInput.value || "Sameera Official | Advanced AI Resource Hub";
    previewDesc.textContent = descInput.value || "Explore the future of AI with Sameera Official. Discover powerful tools, curated prompt libraries, and extensive learning resources...";
};

titleInput.addEventListener('input', updateCounters);
descInput.addEventListener('input', updateCounters);

// Basic analytical logic for keyword extraction
function extractKeywords(text) {
    if (!text) return ["AI Tools", "Technology", "Future"];

    const stopWords = new Set(['the', 'and', 'for', 'with', 'that', 'this', 'from', 'best', 'tool', 'is', 'are', 'was']);
    const words = text.toLowerCase().match(/\b\w{4,}\b/g) || [];
    const freq = {};

    words.forEach(w => {
        if (!stopWords.has(w)) freq[w] = (freq[w] || 0) + 1;
    });

    return Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(pair => pair[0].charAt(0).toUpperCase() + pair[0].slice(1));
}

// "Generation" Logic
generateBtn.addEventListener('click', () => {
    const text = sourceInput.value.trim();
    if (!text) return alert("Please enter some text or a topic first!");

    generateBtn.textContent = "ANALYZING...";
    generateBtn.disabled = true;

    setTimeout(() => {
        const keywords = extractKeywords(text);

        // Construct optimized Title
        const primaryKW = keywords[0] || "AI Hub";
        const secondaryKW = keywords[1] || "Resources";
        titleInput.value = `${primaryKW} - ${secondaryKW} | Sameera Official AI`;

        // Construct optimized Description
        let desc = `Discover the latest insights on ${keywords.slice(0, 3).join(', ')}. `;
        desc += `Our AI-powered platform provides comprehensive tools and resources for professionals in ${keywords[3] || 'technology'}. Explore ${primaryKW} and more today at Sameera Official.`;
        descInput.value = desc.slice(0, 160);

        // Update Keywords UI
        keywordContainer.innerHTML = keywords.map(kw => `<span class="keyword-tag">${kw}</span>`).join('');

        updateCounters();
        generateBtn.textContent = "GENERATE OPTIMIZED TAGS";
        generateBtn.disabled = false;
    }, 1500);
});
