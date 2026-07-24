<script>
  document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector("#target");
  const video = document.querySelector("#videoAR");
  const mensaje = document.querySelector("#mensaje");
  const botonInvisible = document.querySelector("#botonInvisible");

  let videoDesbloqueado = false;
  let targetVisible = false;

  video.muted = true;
  video.playsInline = true;

  botonInvisible.addEventListener(
    "click",
    async () => {
      try {
        await video.play();

        video.pause();
        video.currentTime = 0;

        videoDesbloqueado = true;
        botonInvisible.style.display = "none";

        mensaje.textContent =
          "Apunta la cámara hacia la tarjeta de Alejandro";

        if (targetVisible) {
          await video.play();
          mensaje.style.display = "none";
        }
      } catch (error) {
        console.error("No se pudo desbloquear el video:", error);
      }
    },
    { once: true }
  );

  target.addEventListener("targetFound", async () => {
    targetVisible = true;

    if (!videoDesbloqueado) return;

    try {
      video.currentTime = 0;
      await video.play();
      mensaje.style.display = "none";
    } catch (error) {
      console.error("No se pudo reproducir el video:", error);
    }
  });

  target.addEventListener("targetLost", () => {
    targetVisible = false;
    video.pause();

    if (videoDesbloqueado) {
      mensaje.style.display = "block";
      mensaje.textContent =
        "Apunta la cámara hacia la tarjeta de Alejandro";
    }
  });
});
</script>
