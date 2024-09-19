document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const dni = document.getElementById('dni').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Enviar los datos al backend usando fetch
    fetch('https://backendstudymanager-production.up.railway.app/register', {  // Asegúrate de que tu servidor esté corriendo en localhost:3000
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, apellido, dni, email, password })  // Enviar datos como JSON
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('message').textContent = data;  // Mostrar mensaje del servidor
    })
    .catch(error => console.error('Error:', error));  // Manejar errores

    // Limpiar el formulario
    document.getElementById('registrationForm').reset();
});


