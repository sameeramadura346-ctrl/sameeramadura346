const pdfUpload = document.getElementById('pdf-upload');
const canvas = document.getElementById('pdf-canvas');
const ctx = canvas.getContext('2d');
const pageNumDisplay = document.getElementById('page-num');
const pageCountDisplay = document.getElementById('page-count');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const scanBar = document.getElementById('scan-bar');
const statusBox = document.getElementById('status-box');
const summaryBox = document.getElementById('summary-box');
const entitiesBox = document.getElementById('entities-box');
const analyzeBtn = document.getElementById('analyze-btn');

let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
const scale = 1.5;

// Initialize PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

const renderPage = (num) => {
    pageRendering = true;
    pdfDoc.getPage(num).then((page) => {
        const viewport = page.getViewport({ scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        const renderTask = page.render(renderContext);

        renderTask.promise.then(() => {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
            extractText(page);
        });
    });

    pageNumDisplay.textContent = num;
};

const queueRenderPage = (num) => {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
};

const extractText = async (page) => {
    const textContent = await page.getTextContent();
    const strings = textContent.items.map(item => item.str);
    const fullText = strings.join(' ').trim();

    if (fullText) {
        statusBox.textContent = "TEXT DETECTED | READY";
        statusBox.style.color = "#00FFB2";
    }
};

const startAnalysis = () => {
    if (!pdfDoc) return;

    scanBar.style.display = 'block';
    statusBox.textContent = "ANALYZING NEURAL PATHS...";
    statusBox.style.color = "#FF5E00";

    let top = 0;
    const interval = setInterval(() => {
        top += 5;
        scanBar.style.top = top + 'px';
        if (top > 600) {
            clearInterval(interval);
            scanBar.style.display = 'none';
            finishAnalysis();
        }
    }, 20);
};

const finishAnalysis = async () => {
    const page = await pdfDoc.getPage(pageNum);
    const textContent = await page.getTextContent();
    const text = textContent.items.map(item => item.str).join(' ');

    // Simulate smart extraction
    summaryBox.textContent = text.slice(0, 200) + "...";

    const words = text.match(/\b[A-Z][a-z]{3,}\b/g) || ["No common entities"];
    const uniqueEntities = [...new Set(words)].slice(0, 10);
    entitiesBox.textContent = uniqueEntities.join(', ');

    statusBox.textContent = "ANALYSIS COMPLETE";
    statusBox.style.color = "#00B2FF";
};

// Event Listeners
pdfUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
        const fileReader = new FileReader();
        fileReader.onload = function () {
            const typedArray = new Uint8Array(this.result);
            pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
                pdfDoc = pdf;
                pageCountDisplay.textContent = pdfDoc.numPages;
                renderPage(pageNum);
                startAnalysis();
            });
        };
        fileReader.readAsArrayBuffer(file);
    }
});

prevPageBtn.addEventListener('click', () => {
    if (pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum);
});

nextPageBtn.addEventListener('click', () => {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    queueRenderPage(pageNum);
});

analyzeBtn.addEventListener('click', startAnalysis);
