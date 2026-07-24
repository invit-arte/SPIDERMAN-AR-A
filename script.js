<script>
  document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector("#target");
  const video = document.querySelector("#videoAR");
  const mensaje = document.querySelector("#mensaje");
  const botonInvisible = document.querySelector("#botonInvisible");

  let videoDesbloqueado = false;
  let targetDetectado = false;

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;

  async function desbloquearVideo() {
    try {
      await video.play();

      videoDesbloqueado = true;
      botonInvisible.style.display = "none";

      mensaje.textContent =
        "Apunta la cámara hacia la tarjeta de Alejandro";

      if (!targetDetectado) {
        video.pause();
        video.currentTime = 0;
      } else {
        mensaje.style.display = "none";
      }

      console.log("Video desbloqueado");
    } catch (error) {
      console.error("No se pudo desbloquear el video:", error);
    }
  }

  botonInvisible.addEventListener("click", desbloquearVideo);
  botonInvisible.addEventListener("touchend", desbloquearVideo);

  target.addEventListener("targetFound", async () => {
    targetDetectado = true;

    if (!videoDesbloqueado) {
      mensaje.textContent = "Toca una vez la pantalla";
      return;
    }

    try {
      video.currentTime = 0;
      await video.play();
      mensaje.style.display = "none";
    } catch (error) {
      console.error("No se pudo reproducir el video:", error);
    }
  });

  target.addEventListener("targetLost", () => {
    targetDetectado = false;

    video.pause();
    video.currentTime = 0;

    if (videoDesbloqueado) {
      mensaje.style.display = "block";
      mensaje.textContent =
        "Apunta la cámara hacia la tarjeta de Alejandro";
    }
  });
});
</script>
