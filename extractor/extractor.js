import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.1';

// Disable internal proxy and use local cache if possible (though in browser it's usually CDN)
env.allowLocalModels = false;

const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const previewImg = document.getElementById('preview-img');
const dropZoneText = document.getElementById('drop-zone-text');
const extractBtn = document.getElementById('extract-btn');
const copyBtn = document.getElementById('copy-btn');
const promptText = document.getElementById('prompt-text');
const loadingOverlay = document.getElementById('loading-overlay');
const scanningLine = document.getElementById('scanning-line');

let captioner = null;
let currentImage = null;

// Initialize the model
async function initModel() {
    try {
        if (!captioner) {
            captioner = await pipeline('image-to-text', 'Xenova/vit-gpt2-image-captioning');
        }
    } catch (error) {
        console.error("Model loading failed:", error);
        promptText.textContent = "Error: Failed to load vision model. Please check your internet connection.";
    }
}

// Drag & Drop Handlers
dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    handleFile(file);
});

fileInput.addEventListener('change', (e) => {
    handleFile(e.target.files[0]);
});

function handleFile(file) {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            currentImage = e.target.result;
            previewImg.src = currentImage;
            previewImg.style.display = 'block';
            dropZoneText.style.display = 'none';
            extractBtn.disabled = false;
            promptText.textContent = "Image loaded. Initializing AI for analysis...";
            initModel(); // Start loading model when image is added
        };
        reader.readAsDataURL(file);
    }
}

// Extraction Logic
extractBtn.addEventListener('click', async () => {
    if (!currentImage) return;

    // UI state
    extractBtn.disabled = true;
    loadingOverlay.style.display = 'flex';
    scanningLine.style.display = 'block';
    scanningLine.style.animation = 'scan 2.5s infinite linear';
    promptText.textContent = "";

    try {
        // Ensure model is loaded
        await initModel();

        // Perform inference
        const output = await captioner(currentImage);
        const caption = output[0].generated_text;

        // Enhance the prompt for art generation style
        const enhancedPrompt = `A professional ${caption}, high detail, 8k resolution, cinematic lighting, masterpiece style, vibrant colors.`;

        // UI state: Success
        scanningLine.style.display = 'none';
        loadingOverlay.style.display = 'none';

        // Typewriter effect for the prompt
        let i = 0;
        promptText.textContent = "";
        const typeWriter = () => {
            if (i < enhancedPrompt.length) {
                promptText.textContent += enhancedPrompt.charAt(i);
                i++;
                setTimeout(typeWriter, 15);
            } else {
                extractBtn.disabled = false;
                copyBtn.disabled = false;
            }
        };
        typeWriter();

    } catch (error) {
        console.error("Extraction failed:", error);
        loadingOverlay.style.display = 'none';
        scanningLine.style.display = 'none';
        promptText.textContent = "Error: Vision analysis failed. Try a different image.";
        extractBtn.disabled = false;
    }
});

// Copy to Clipboard
copyBtn.addEventListener('click', () => {
    const text = promptText.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "COPIED!";
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });
});
