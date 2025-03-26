const video = document.getElementById("camera");
const capturarButton = document.getElementById("capturar");
const ligarCameraButton = document.getElementById("ligarCamera");
const desligarCameraButton = document.getElementById("desligarCamera");
const pretoBrancoButton = document.getElementById("pretoBranco");

const canva = [
    document.getElementById("foto1"),
    document.getElementById("foto2"),
    document.getElementById("foto3"),
    document.getElementById("foto4"),
    document.getElementById("foto5"),
    document.getElementById("foto6"),
    document.getElementById("foto7"),
    document.getElementById("foto8")
];

let stream;
let cameraActive = false;
let fotoIndex = 0;

async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        cameraActive = true;
    } catch (erro) {
        alert('Erro ao abrir a câmera');
    }
}

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
        stream = null;
        cameraActive = false;
    }
}

capturarButton.addEventListener("click", function () {
    if (fotoIndex < canva.length) {
        const canvas = canva[fotoIndex];
        const contexto = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        contexto.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.style.display = 'block';  // Exibe o canvas com a foto
        fotoIndex++;
    }
});

pretoBrancoButton.addEventListener("click", function () {
    if (fotoIndex < canva.length) {
        const canvas = canva[fotoIndex];
        const contexto = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        contexto.filter = 'grayscale(100%)';  // Aplica o filtro preto e branco
        contexto.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.style.display = 'block';  // Exibe o canvas com o filtro
        fotoIndex++;
    }
});

ligarCameraButton.addEventListener("click", function () {
    if (!cameraActive) {
        startCamera();
    }
});

desligarCameraButton.addEventListener("click", function () {
    if (cameraActive) {
        stopCamera();
    }
});

startCamera();  // Inicia a câmera assim que a página for carregada
