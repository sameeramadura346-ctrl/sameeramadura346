const fileInput = document.getElementById('file-input');
const dropZone = document.getElementById('drop-zone');
const imageDisplay = document.getElementById('image-display');
const placeholderText = document.getElementById('placeholder-text');
const presetCards = document.querySelectorAll('.preset-card');
const downloadBtn = document.getElementById('download-btn');
const exportCanvas = document.getElementById('export-canvas');
const ctx = exportCanvas.getContext('2d');

let originalImage = null;

const presets = {
    none: 'none',
    cyberpunk: 'hue-rotate(-30deg) contrast(150%) saturate(200%) brightness(110%) drop-shadow(0 0 10px magenta)',
    vaporwave: 'hue-rotate(240deg) saturate(150%) brightness(130%) contrast(80%) sepia(30%)',
    emerald: 'grayscale(100%) brightness(100%) contrast(150%) sepia(100%) hue-rotate(80deg) saturate(500%)',
    noir: 'grayscale(100%) contrast(200%) brightness(80%)',
    infrared: 'invert(100%) hue-rotate(180deg) saturate(300%) contrast(120%)',
    glitch: 'contrast(150%) saturate(150%) blur(0.5px) opacity(0.9) drop-shadow(3px 0px 0px cyan) drop-shadow(-3px 0px 0px red)'
};

// Handle File Selection
const handleImage = (file) => {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            originalImage = new Image();
            originalImage.onload = () => {
                imageDisplay.src = e.target.result;
                imageDisplay.style.display = 'block';
                placeholderText.style.display = 'none';
                downloadBtn.disabled = false;
            };
            originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

dropZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => handleImage(e.target.files[0]));

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "#00B2FF";
    dropZone.style.background = "rgba(0, 178, 255, 0.05)";
});

dropZone.addEventListener('dragleave', () => {
    dropZone.style.borderColor = "";
    dropZone.style.background = "";
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "";
    dropZone.style.background = "";
    handleImage(e.dataTransfer.files[0]);
});

// Apply Presets
presetCards.forEach(card => {
    card.addEventListener('click', () => {
        presetCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const filterType = card.dataset.filter;
        imageDisplay.style.filter = presets[filterType];
    });
});

// Download System (Canvas Rendering)
downloadBtn.addEventListener('click', () => {
    if (!originalImage) return;

    exportCanvas.width = originalImage.width;
    exportCanvas.height = originalImage.height;

    // Get current filter from display image
    const currentFilter = getComputedStyle(imageDisplay).filter;
    ctx.filter = currentFilter;

    // Draw and export
    ctx.drawImage(originalImage, 0, 0);

    const link = document.createElement('a');
    link.download = `sameera-artistic-${Date.now()}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
});
