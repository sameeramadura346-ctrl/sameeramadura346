const logoPreview = document.getElementById('logo-preview');
const baseShapeSelect = document.getElementById('base-shape');
const innerIconSelect = document.getElementById('inner-icon');
const primaryColorInput = document.getElementById('primary-color');
const accentColorInput = document.getElementById('accent-color');
const logoTextInput = document.getElementById('logo-text');
const exportBtn = document.getElementById('export-btn');

const shapes = {
    hexagon: 'M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z',
    circle: 'M50 10 A40 40 0 1 1 50 90 A40 40 0 1 1 50 10',
    shield: 'M10 20 L50 5 L90 20 L90 60 C90 85 50 95 50 95 C50 95 10 85 10 60 Z',
    square: 'M50 5 L95 50 L50 95 L5 50 Z'
};

const icons = {
    bolt: 'M55 10 L25 55 L45 55 L35 90 L65 45 L45 45 Z',
    code: 'M35 35 L15 50 L35 65 M65 35 L85 50 L65 65 M45 30 L55 70',
    fire: 'M50 95 C65 95 80 85 80 65 C80 45 60 10 50 5 C40 10 20 45 20 65 C20 85 35 95 50 95',
    star: 'M50 5 L63 38 L95 38 L68 58 L78 91 L50 71 L22 91 L32 58 L5 38 L37 38 Z',
    heart: 'M50 90 C10 65 10 20 50 20 C90 20 90 65 50 90'
};

const renderLogo = () => {
    const shapePath = shapes[baseShapeSelect.value];
    const iconPath = icons[innerIconSelect.value];
    const primary = primaryColorInput.value;
    const accent = accentColorInput.value;
    const text = logoTextInput.value.toUpperCase();

    const svg = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${primary};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${accent};stop-opacity:1" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <!-- Background Shape -->
            <path d="${shapePath}" fill="none" stroke="url(#grad1)" stroke-width="3" filter="url(#glow)" />
            <path d="${shapePath}" fill="url(#grad1)" opacity="0.1" />
            
            <!-- Inner Icon -->
            <path d="${iconPath}" fill="url(#grad1)" transform="scale(0.5) translate(50, 50)" filter="url(#glow)" />
            
            <!-- Identity Text -->
            ${text ? `<text x="50" y="85" text-anchor="middle" fill="${accent}" font-family="Orbitron" font-size="8" font-weight="900" letter-spacing="1">${text}</text>` : ''}
        </svg>
    `;

    logoPreview.innerHTML = svg;
};

// Event Listeners
[baseShapeSelect, innerIconSelect, primaryColorInput, accentColorInput, logoTextInput].forEach(el => {
    el.addEventListener('input', renderLogo);
});

exportBtn.addEventListener('click', () => {
    const svgData = logoPreview.innerHTML;
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = `sameera-logo-${Date.now()}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
});

// Initial Render
renderLogo();
