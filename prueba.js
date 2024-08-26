// Validación del mensaje de entrada
function validarMensaje(message) {
    const isValid = /^[a-z\s]+$/.test(message);
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = isValid ? 'none' : 'inline';
    return isValid;
}

// Función para mostrar u ocultar elementos
function toggleVisibility(element, show) {
    element.classList.toggle('hidden', !show);
}

// Función para manejar encriptación/desencriptación
function processMessage(action) {
    const message = document.getElementById('mensaje').value.trim();

    if (!validarMensaje(message)) {
        return;
    }

    const processedMessage = action === 'encrypt' ? encryptMessage(message) : decryptMessage(message);
    
    // Actualizar el h2 si se desencripta
    if (action === 'decrypt') {
        document.querySelector('h2').textContent = 'Mensaje desencriptado';
    }

    // Ocultar la imagen y mostrar el mensaje procesado
    toggleVisibility(document.getElementById('mensajeInformativo'), false);
    toggleVisibility(document.getElementById('mensajeResultado'), true);
    document.getElementById('encryptedMessage').textContent = processedMessage;

    // Mostrar el botón de copiado
    toggleVisibility(document.getElementById('copyButton'), true);
}

document.getElementById('encryptButton').addEventListener('click', function() {
    processMessage('encrypt');
});

document.getElementById('decryptButton').addEventListener('click', function() {
    processMessage('decrypt');
});

document.getElementById('copyButton').addEventListener('click', function() {
    const mensajeParaCopiar = document.getElementById('encryptedMessage').textContent;

    if (mensajeParaCopiar) {
        navigator.clipboard.writeText(mensajeParaCopiar)
            .then(() => {
                const notification = document.getElementById('notification');
                toggleVisibility(notification, true);
                notification.classList.add('show');

                // Ocultar la notificación después de 2 segundos
                setTimeout(() => {
                    notification.classList.remove('show');
                    toggleVisibility(notification, false);
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
    const map = { 'e': 'enter', 'i': 'imes', 'a': 'ai', 'o': 'ober', 'u': 'ufat' };
    return message.split('').map(char => map[char] || char).join('');
}

// Algoritmo de desencriptación
function decryptMessage(message) {
    const map = { 'enter': 'e', 'imes': 'i', 'ai': 'a', 'ober': 'o', 'ufat': 'u' };
    return Object.keys(map).reduce((acc, key) => acc.replaceAll(key, map[key]), message);
}
