document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evitar el envío del formulario

    // Obtener los valores de los campos del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Enviar los datos al backend usando fetch
    fetch('https://backendstudymanager-production.up.railway.app/login', {  // Asegúrate de que tu servidor esté corriendo en localhost:3000
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })  // Enviar datos como JSON
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('message').textContent = data;  // Mostrar mensaje del servidor
        if (data === 'Inicio de sesión exitoso') {
            // Redirigir a la página principal
            window.location.href = "principal.html";  // Redirigir a la página principal
        }
    })
    .catch(error => console.error('Error:', error));  // Manejar errores

    // Limpiar el formulario
    document.getElementById('loginForm').reset();
});

