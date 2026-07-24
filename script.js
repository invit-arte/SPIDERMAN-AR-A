<script>
  document.addEventListener("DOMContentLoaded", () => {
    const scene = document.querySelector("a-scene");
    const target = document.querySelector("#target");
    const video = document.querySelector("#videoAR");
    const mensaje = document.querySelector("#mensaje");

    video.muted = true;
    video.playsInline = true;

    scene.addEventListener("arReady", () => {
      mensaje.textContent =
        "Apunta la cámara hacia la tarjeta de Alejandro";
    });

    scene.addEventListener("arError", () => {
      mensaje.textContent =
        "No se pudo abrir la cámara. Revisa los permisos.";
    });

    target.addEventListener("targetFound", async () => {
      mensaje.style.display = "none";

      try {
        await video.play();
      } catch (error) {
        console.error("No se pudo reproducir el video:", error);
      }
    });

    target.addEventListener("targetLost", () => {
      video.pause();

      mensaje.style.display = "block";
      mensaje.textContent =
        "Apunta la cámara hacia la tarjeta de Alejandro";
    });
  });
</script>
