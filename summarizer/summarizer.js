const textInput = document.getElementById('text-input');
const outputConsole = document.getElementById('output-console');
const summarizeBtn = document.getElementById('summarize-btn');
const wordCountDisplay = document.getElementById('word-count');
const lengthSlider = document.getElementById('summary-length');
const lengthLabel = document.getElementById('length-label');
const statusText = document.getElementById('status-text');
const scanLine = document.getElementById('scan-line');

// Update word count
textInput.addEventListener('input', () => {
    const words = textInput.value.trim().split(/\s+/).filter(w => w.length > 0);
    wordCountDisplay.textContent = `${words.length} WORDS`;
});

// Update length label
lengthSlider.addEventListener('input', () => {
    const labels = ['', 'SHORT', 'MEDIUM', 'LONG'];
    lengthLabel.textContent = labels[lengthSlider.value];
    lengthLabel.style.color = lengthSlider.value == 1 ? '#FF5E00' : (lengthSlider.value == 2 ? '#00B2FF' : '#7000FF');
});

// Extractive Summarization Logic
function summarizeText(text, count) {
    if (!text || text.trim().length < 50) return "Please provide more text for analysis (at least 50 characters).";

    // 1. Split into sentences
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
    if (sentences.length <= count) return text;

    // 2. Calculate word frequency
    const words = text.toLowerCase().match(/\w+/g);
    const stopWords = new Set(['the', 'is', 'at', 'which', 'and', 'on', 'a', 'an', 'to', 'in', 'of', 'for', 'with', 'as', 'by', 'it', 'from', 'this', 'that', 'but', 'not']);
    const freqMap = {};
    words.forEach(word => {
        if (!stopWords.has(word)) {
            freqMap[word] = (freqMap[word] || 0) + 1;
        }
    });

    // 3. Score sentences based on word frequency
    const scores = sentences.map(s => {
        let score = 0;
        const sWords = s.toLowerCase().match(/\w+/g) || [];
        sWords.forEach(word => {
            if (freqMap[word]) score += freqMap[word];
        });
        return { sentence: s, score: score / (sWords.length + 1) }; // Normalize by length
    });

    // 4. Sort and pick top sentences
    scores.sort((a, b) => b.score - a.score);
    const topSentences = scores.slice(0, count).sort((a, b) => {
        return sentences.indexOf(a.sentence) - sentences.indexOf(b.sentence);
    });

    return topSentences.map(s => s.sentence.trim()).join(' ');
}

// Animation and Processing
async function processSummarization() {
    const text = textInput.value.trim();
    if (!text) return;

    // UI State: Startup
    summarizeBtn.disabled = true;
    statusText.innerHTML = '<span class="status-dot active"></span>SCANNING...';
    outputConsole.textContent = 'Initializing Neural Scanner...';
    
    // Scan Animation
    scanLine.style.display = 'block';
    const duration = 2000;
    const start = performance.now();
    
    await new Promise(resolve => {
        function animate(time) {
            const elapsed = time - start;
            const progress = elapsed / duration;
            scanLine.style.top = (progress * 100) + '%';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                scanLine.style.display = 'none';
                resolve();
            }
        }
        requestAnimationFrame(animate);
    });

    // UI State: Processing
    statusText.innerHTML = '<span class="status-dot active"></span>PROCESSING...';
    outputConsole.textContent = 'Analyzing Semantic Structure...';
    await new Promise(r => setTimeout(r, 1000));

    // Calculate count based on slider
    const totalSentences = (text.match(/[^\.!\?]+[\.!\?]+/g) || []).length;
    let count = 2;
    if (lengthSlider.value == 1) count = Math.max(1, Math.floor(totalSentences * 0.15));
    if (lengthSlider.value == 2) count = Math.max(2, Math.floor(totalSentences * 0.3));
    if (lengthSlider.value == 3) count = Math.max(3, Math.floor(totalSentences * 0.6));

    const result = summarizeText(text, count);

    // UI State: Final Typing
    statusText.innerHTML = '<span class="status-dot"></span>DONE';
    outputConsole.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < result.length) {
            outputConsole.textContent += result.charAt(i);
            i++;
            outputConsole.scrollTop = outputConsole.scrollHeight;
            setTimeout(typeWriter, 10);
        } else {
            summarizeBtn.disabled = false;
        }
    };
    typeWriter();
}

summarizeBtn.addEventListener('click', processSummarization);
