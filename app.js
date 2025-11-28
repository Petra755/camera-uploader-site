const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');

// 1. Solicita acesso à câmera
async function startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
}
startCamera();

// 2. Captura a foto e envia para a API da Vercel
captureButton.onclick = () => {
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    // Converte o conteúdo do Canvas em arquivo Blob
    canvas.toBlob(async (blob) => {

        // Envia direto para a função serverless
        const response = await fetch("https://camera-uploader-api.vercel.app/api/upload", {
            method: "POST",
            body: blob
        });

        const json = await response.json();
        console.log(json);

        alert("Foto enviada com sucesso!");
    }, "image/png");
};
