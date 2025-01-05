async function sendMessage(scriptText, baseSpeed = 100, extraSpeedPerChar = 20) {
  // Divide el texto en líneas, limpia espacios innecesarios y elimina líneas vacías
  const lines = scriptText
    .split(/[\n\t]+/)
    .map((line) => line.trim())
    .filter((line) => line);

  const main = document.querySelector('#main');
  const textarea = main.querySelector('div[contenteditable="true"]');

  if (!textarea) {
    throw new Error('No hay una conversación abierta');
  }

  try {
    for (const line of lines) {
      textarea.focus();

      // Inserta el texto en el área de escritura
      document.execCommand('insertText', false, line);

      textarea.dispatchEvent(new Event('input', { bubbles: true }));

      // Calcula el tiempo de espera basado en la longitud del mensaje
      const timeSpeed = baseSpeed + line.length * extraSpeedPerChar;
      console.log(`Mensaje: "${line}" | Tiempo de espera: ${timeSpeed} ms`);

      // Espera antes de hacer clic en enviar
      await new Promise((resolve) => setTimeout(resolve, timeSpeed));

      const sendButton =
        main.querySelector('[data-testid="send"]') ||
        main.querySelector('[data-icon="send"]');

      if (sendButton) {
        sendButton.click();
      } else {
        throw new Error('No se encontró el botón de enviar');
      }

      // Espera antes de procesar la siguiente línea
      await new Promise((resolve) => setTimeout(resolve, timeSpeed));
    }

    return lines.length;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/*
  MESSAGES TO SEND.
  Edita el texto en la llamada a sendMessage().
*/

sendMessage(
  `A
B
C
D
E
F
G
H
I love you still
And you know I always will
'Til the end of time
I won't change my mind
Love you, I'll be here
I will never disappear
Said forever, I swear
So I will be there`,
  100, // Tiempo base en ms
  50 // Tiempo adicional por carácter en ms
)
  .then((e) => console.log(`Código finalizado, ${e} mensajes enviados`))
  .catch(console.error);
