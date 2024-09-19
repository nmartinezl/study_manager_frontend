document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evitar el envío del formulario

    // Obtener los valores de los campos del formulario
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Enviar los datos al backend usando fetch
    fetch('http://localhost:3000/register', {  // Asegúrate de que tu servidor esté corriendo en localhost:3000
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })  // Enviar datos como JSON
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('message').textContent = data;  // Mostrar mensaje del servidor
    })
    .catch(error => console.error('Error:', error));  // Manejar errores

    // Limpiar el formulario
    document.getElementById('registrationForm').reset();
});

// El botón "Mostrar usuarios registrados" no tiene sentido en este contexto,
// ya que los datos están almacenados en el servidor, no en localStorage.
// Puedes eliminar la función que muestra los usuarios si no es necesaria.
