<script>
 document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector("#target");
  const video = document.querySelector("#videoAR");
  const mensaje = document.querySelector("#mensaje");

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.autoplay = true;

  target.addEventListener("targetFound", async () => {
    try {
      video.currentTime = 0;
      await video.play();

      mensaje.style.display = "none";
    } catch (error) {
      console.error("El navegador bloqueó el video:", error);
      mensaje.textContent = "Toca la pantalla para reproducir";
    }
  });

  target.addEventListener("targetLost", () => {
    video.pause();
    video.currentTime = 0;

    mensaje.style.display = "block";
    mensaje.textContent =
      "Apunta la cámara hacia la tarjeta de Alejandro";
  });
});
</script>
