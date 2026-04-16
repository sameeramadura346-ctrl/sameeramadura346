const canvasContainer = document.getElementById("canvas-container");
const qrDataInput = document.getElementById("qr-data");
const dotStyleSelect = document.getElementById("dot-style");
const eyeStyleSelect = document.getElementById("eye-style");
const qrColorInput = document.getElementById("qr-color");
const logoUploadInput = document.getElementById("logo-upload");
const downloadBtn = document.getElementById("download-btn");
const colorBtns = document.querySelectorAll(".color-btn");

let logoImage = null;

const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    type: "svg",
    data: qrDataInput.value,
    image: null,
    dotsOptions: {
        color: qrColorInput.value,
        type: dotStyleSelect.value
    },
    backgroundOptions: {
        color: "#ffffff",
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 10
    },
    cornersSquareOptions: {
        type: eyeStyleSelect.value,
        color: qrColorInput.value
    }
});

qrCode.append(canvasContainer);

const updateQR = () => {
    qrCode.update({
        data: qrDataInput.value,
        image: logoImage,
        dotsOptions: {
            color: qrColorInput.value,
            type: dotStyleSelect.value
        },
        cornersSquareOptions: {
            type: eyeStyleSelect.value,
            color: qrColorInput.value
        }
    });
};

// Event Listeners
qrDataInput.addEventListener("input", updateQR);
dotStyleSelect.addEventListener("change", updateQR);
eyeStyleSelect.addEventListener("change", updateQR);
qrColorInput.addEventListener("input", updateQR);

colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const color = btn.getAttribute("data-color");
        qrColorInput.value = color;
        updateQR();
    });
});

logoUploadInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            logoImage = event.target.result;
            updateQR();
        };
        reader.readAsDataURL(file);
    }
});

downloadBtn.addEventListener("click", () => {
    qrCode.download({ name: "sameera-official-qr", extension: "png" });
});

// Initial update
updateQR();
