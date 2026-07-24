<script>
  document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector("#target");
  const video = document.querySelector("#videoAR");
  const pantallaVideo = document.querySelector("#pantallaVideo");
  const mensaje = document.querySelector("#mensaje");
  const botonInvisible = document.querySelector("#botonInvisible");

  let videoIniciado = false;

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.loop = true;

  const iniciarVideo = async () => {
    try {
      /*
        Se inicia con el toque del usuario.
        No lo pausamos después.
      */
      await video.play();

      videoIniciado = true;

      botonInvisible.style.display = "none";

      mensaje.style.display = "block";
      mensaje.textContent =
        "Apunta la cámara hacia la tarjeta de Alejandro";

      console.log("Video habilitado correctamente");
    } catch (error) {
      console.error("No se pudo iniciar el video:", error);

      /*
        No ocultamos el botón para que pueda intentarlo nuevamente.
      */
      mensaje.style.display = "block";
      mensaje.textContent =
        "Toca nuevamente la pantalla para iniciar";
    }
  };

  /*
    pointerdown suele funcionar mejor que click en celulares.
    No usamos once:true, porque si falla puede intentarse otra vez.
  */
  botonInvisible.addEventListener("pointerdown", iniciarVideo);

  target.addEventListener("targetFound", () => {
    if (!videoIniciado) {
      mensaje.style.display = "block";
      mensaje.textContent =
        "Toca una vez la pantalla para iniciar";
      return;
    }

    pantallaVideo.setAttribute("visible", true);
    mensaje.style.display = "none";
  });

  target.addEventListener("targetLost", () => {
    pantallaVideo.setAttribute("visible", false);

    if (videoIniciado) {
      mensaje.style.display = "block";
      mensaje.textContent =
        "Apunta la cámara hacia la tarjeta de Alejandro";
    }
  });
});
</script>
