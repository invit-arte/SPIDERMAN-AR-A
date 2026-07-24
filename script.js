<script>
  document.addEventListener("DOMContentLoaded", () => {
    const scene = document.querySelector("a-scene");
    const target = document.querySelector("#target");
    const video = document.querySelector("#videoAR");
    const mensaje = document.querySelector("#mensaje");
    const startButton = document.querySelector("#startButton");

    let experienciaIniciada = false;
    let targetDetectado = false;

    // Necesario para reproducción automática en celulares
    video.muted = true;
    video.playsInline = true;

    startButton.addEventListener("click", async () => {
      try {
        /*
          El video se reproduce una vez durante el toque del usuario.
          Esto desbloquea la reproducción en el navegador.
        */
        await video.play();

        video.pause();
        video.currentTime = 0;

        experienciaIniciada = true;

        startButton.style.display = "none";
        mensaje.textContent =
          "Apunta la cámara hacia la tarjeta de Alejandro";

        // Si la tarjeta ya estaba detectada, reproducimos el video
        if (targetDetectado) {
          await video.play();
          mensaje.style.display = "none";
        }
      } catch (error) {
        console.error("Error al habilitar el video:", error);

        mensaje.textContent =
          "No se pudo iniciar. Presiona nuevamente el botón.";
      }
    });

    scene.addEventListener("arReady", () => {
      if (!experienciaIniciada) {
        mensaje.textContent =
          "Presiona “Iniciar experiencia” para comenzar";
      }
    });

    target.addEventListener("targetFound", async () => {
      targetDetectado = true;

      if (!experienciaIniciada) {
        mensaje.textContent =
          "Presiona “Iniciar experiencia” para ver el video";
        return;
      }

      try {
        await video.play();
        mensaje.style.display = "none";
      } catch (error) {
        console.error("Error al reproducir:", error);

        mensaje.style.display = "block";
        mensaje.textContent =
          "Toca nuevamente “Iniciar experiencia”";
      }
    });

    target.addEventListener("targetLost", () => {
      targetDetectado = false;

      video.pause();

      if (experienciaIniciada) {
        mensaje.style.display = "block";
        mensaje.textContent =
          "Apunta la cámara hacia la tarjeta de Alejandro";
      }
    });
  });
</script>
