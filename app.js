
// Validación del mensaje de entada
function validarMensaje(message) {
    const isValid = /^[a-z\s]+$/.test(message);
    if (!isValid) {
        document.getElementById('error-message').style.display = 'inline';
        return false;
    } else {
        document.getElementById('error-message').style.display = 'none';
        return true;
    }
}

document.getElementById('encryptButton').addEventListener('click', function() {
    const message = document.getElementById('mensaje').value.trim();
    
    if (!validarMensaje(message)) {
        return;
    }

    // Encriptar el mensaje
    const encryptedMessage = encryptMessage(message);

    // Ocultar la imagen
    const mensajeInformativo = document.getElementById('mensajeInformativo');
    mensajeInformativo.classList.add('hidden');

    // Mostrar el mensaje encriptado
    const mensajeResultado = document.getElementById('mensajeResultado');
    mensajeResultado.classList.remove('hidden');
    document.getElementById('encryptedMessage').textContent = encryptedMessage;

    // Mostrar el botón de copiado
    const boton = document.getElementById('copyButton');
    boton.classList.remove('hidden');
});

document.getElementById('decryptButton').addEventListener('click', function() {
    const message = document.getElementById('mensaje').value.trim();
    
    if (!validarMensaje(message)) {
        return;
    }

    // Desencriptar el mensaje
    const decryptedMessage = decryptMessage(message);

    // Ocultar la imagen
    const mensajeInformativo = document.getElementById('mensajeInformativo');
    mensajeInformativo.classList.add('hidden');

    // Mostrar el mensaje desencriptado
    const mensajeResultado = document.getElementById('mensajeResultado');
    mensajeResultado.classList.remove('hidden');
    document.getElementById('encryptedMessage').textContent = decryptedMessage;

    // Mostrar el botón de copiado
    const boton = document.getElementById('copyButton');
    boton.classList.remove('hidden');
});

document.getElementById('copyButton').addEventListener('click', function() {
    // Obtener el mensaje encriptado o desencriptado visible
    const mensajeEncriptado = document.getElementById('encryptedMessage').textContent;
    const mensajeDesencriptado = document.getElementById('decryptedMessage')?.textContent || '';
    
    // Determinar cuál de los mensajes es el visible
    const mensajeParaCopiar = mensajeEncriptado || mensajeDesencriptado;
    
    if (mensajeParaCopiar) {
        // Usar el Clipboard API para copiar el texto
        navigator.clipboard.writeText(mensajeParaCopiar)
            .then(() => {
                // Mostrar notificación de "Texto copiado"
                const notification = document.getElementById('notification');
                notification.classList.remove('hidden');
                notification.classList.add('show');

                // Ocultar la notificación después de 2 segundos
                setTimeout(() => {
                    notification.classList.remove('show');
                    notification.classList.add('hidden');
                }, 2000);
            })
            .catch(err => {
                console.error('Error al copiar el texto: ', err);
            });
    } else {
        console.error('No hay ningún mensaje para copiar');
    }
});




// Algoritmo de encriptación
function encryptMessage(message) {
    let encrypted = '';

    for (let i = 0; i < message.length; i++) {
        let char = message[i];

        // Aplicar las reglas de encriptación
        if (char === 'e') {
            encrypted += 'enter';
        } else if (char === 'i') {
            encrypted += 'imes';
        } else if (char === 'a') {
            encrypted += 'ai';
        } else if (char === 'o') {
            encrypted += 'ober';
        } else if (char === 'u') {
            encrypted += 'ufat';
        } else {
            encrypted += char;
        }
    }

    return encrypted;
}
// Algoritmo de desencriptación
function decryptMessage(message) {
    let decrypted = message;

    // Aplicar las reglas de desencriptación en orden inverso
    decrypted = decrypted.replace(/enter/g, 'e');
    decrypted = decrypted.replace(/imes/g, 'i');
    decrypted = decrypted.replace(/ai/g, 'a');
    decrypted = decrypted.replace(/ober/g, 'o');
    decrypted = decrypted.replace(/ufat/g, 'u');

    return decrypted;
}
