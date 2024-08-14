document.getElementById('mensaje').addEventListener('input', function() {
    const message = document.getElementById('mensaje').value.trim();

    // Habilitar o deshabilitar los botones en función de si hay texto en el textarea
    const buttonsEnabled = message.length > 0;
    document.getElementById('encryptButton').disabled = !buttonsEnabled;
    document.getElementById('decryptButton').disabled = !buttonsEnabled;

});

document.getElementById('encryptButton').addEventListener('click', function() {
    const message = document.getElementById('mensaje').value.trim();
    const isValid = /^[a-z\s]+$/.test(message);

    if (!isValid) {
        // Mostrar un mensaje de error si la validación falla
        document.getElementById('error-message').style.display = 'inline';
        return;
    } else {
        // Ocultar el mensaje de error si la validación es correcta
        document.getElementById('error-message').style.display = 'none';
    }

    // Encriptar el mensaje
    const encryptedMessage = encryptMessage(message);

    // Mostrar el mensaje encriptado
    document.getElementById('encryptedMessage').textContent = encryptedMessage;
});

document.getElementById('decryptButton').addEventListener('click', function() {
    const encryptedMessage = document.getElementById('encryptedMessage').textContent.trim();

    if (encryptedMessage) {
        // Desencriptar el mensaje
        const decryptedMessage = decryptMessage(encryptedMessage);

        // Mostrar el mensaje desencriptado
        document.getElementById('decryptedMessage').textContent = decryptedMessage;
    }
});

// Algoritmo de encriptación (Cifrado César con desplazamiento de 3 posiciones)
function encryptMessage(message) {
    const shift = 3;
    let encrypted = '';

    for (let i = 0; i < message.length; i++) {
        let char = message[i];

        if (char === ' ') {
            encrypted += ' ';
            continue;
        }

        let code = message.charCodeAt(i);

        // Encriptar solo caracteres en minúscula
        if (code >= 97 && code <= 122) { // Minúsculas
            char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }

        encrypted += char;
    }

    return encrypted;
}
// Algoritmo de desencriptación (Revertir el cifrado César)
function decryptMessage(message) {
    const shift = 3;
    let decrypted = '';

    for (let i = 0; i < message.length; i++) {
        let char = message[i];

        if (char === ' ') {
            decrypted += ' ';
            continue;
        }

        let code = message.charCodeAt(i);

        // Desencriptar solo caracteres en minúscula
        if (code >= 97 && code <= 122) { // Minúsculas
            char = String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
        }

        decrypted += char;
    }

    return decrypted;
}